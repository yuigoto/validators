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
 * Documents/Cnpj
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
var Cnpj = {};
/**
 * Formats the CNPJ document number.
 *
 * @param {String|Number} cnpj
 * @return {String|Boolean}
 */

Cnpj.format = function (cnpj) {
  cnpj = _Utils.default.sanitizeToDigitsOnly(cnpj);
  if (!cnpj) return false; // Check length

  if (cnpj.length > 14) return false;
  if (cnpj.length < 14) cnpj = _Utils.default.paddedZeroes(cnpj, 14);
  return cnpj.replace(/([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/g, "$1.$2.$3/$4-$5");
};
/**
 * Validates the CNPJ document number.
 *
 * @param {String|Number} cnpj
 * @return {Boolean}
 */


Cnpj.validate = function (cnpj) {
  cnpj = _Utils.default.sanitizeToDigitsOnly(cnpj);
  if (!cnpj) return false; // Check length

  if (cnpj.length > 14) return false;
  if (cnpj.length < 14) cnpj = _Utils.default.paddedZeroes(cnpj, 14); // Check repetition

  if (!_Utils.default.checkNumberRepetition(cnpj, 11)) return false;
  var sum, val; // Digit 1

  sum = 0;
  val = 5;

  for (var l = 0; l < 12; l++) {
    sum += parseInt(cnpj[l]) * val;
    val = val - 1 === 1 ? 9 : val - 1;
  }

  val = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (cnpj[12] !== val.toString()) return false; // Digit 2

  sum = 0;
  val = 6;

  for (var l = 0; l < 13; l++) {
    sum += parseInt(cnpj[l]) * val;
    val = val - 1 === 1 ? 9 : val - 1;
  }

  val = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (cnpj[13] !== val.toString()) return false;
  return true;
};

var _default = Cnpj;
exports.default = _default;