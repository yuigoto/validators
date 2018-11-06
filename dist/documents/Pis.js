"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.regexp.replace");

var _Utils = _interopRequireDefault(require("../utils/Utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Documents/Pis
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
var Pis = {};
/**
 * Formats the PIS/PASEP document number.
 *
 * @param {String|Number} pis
 * @return {String|Boolean}
 */

Pis.format = function (pis) {
  pis = _Utils.default.sanitizeToDigitsOnly(pis);
  if (!pis) return false; // Check length

  if (pis.length > 11) return false;
  if (pis.length < 11) pis = _Utils.default.paddedZeroes(pis, 11);
  return pis.replace(/([0-9]{3})([0-9]{5})([0-9]{2})([0-9]{1})/g, "$1.$2.$3-$4");
};
/**
 * Validates the PIS/PASEP document number.
 *
 * @param {String|Number} pis
 * @return {Boolean}
 */


Pis.validate = function (pis) {
  pis = _Utils.default.sanitizeToDigitsOnly(pis);
  if (!pis) return false; // Check length

  if (pis.length > 11) return false;
  if (pis.length < 11) pis = _Utils.default.paddedZeroes(pis, 11); // Check repetition

  if (!_Utils.default.checkNumberRepetition(pis, 11)) return false;
  var sum, val, multiplier;
  multiplier = 3;
  sum = 0;

  for (var l = 0; l < 10; l++) {
    sum += multiplier * pis[l];
    multiplier -= 1;
    if (multiplier === 1) multiplier = 9;
  }

  val = 11 - sum % 11;
  val = val === 10 || val === 11 ? 0 : val;

  if (pis[10] !== val.toString()) {
    return false;
  }

  return true;
};

var _default = Pis;
exports.default = _default;