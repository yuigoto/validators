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
 * Documents/Cpf
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
var Cpf = {};
/**
 * Formats the CPF document number.
 *
 * @param {String|Number} cpf
 * @return {String|Boolean}
 */

Cpf.format = function (cpf) {
  cpf = _Utils.default.sanitizeToDigitsOnly(cpf);
  if (!cpf) return false; // Check length

  if (cpf.length > 11) return false;
  if (cpf.length < 11) cpf = _Utils.default.paddedZeroes(cpf, 11);
  return cpf.replace(/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/g, "$1.$2.$3-$4");
};
/**
 * Validates the CPF document number.
 *
 * @param {String|Number} cpf
 * @return {Boolean}
 */


Cpf.validate = function (cpf) {
  cpf = _Utils.default.sanitizeToDigitsOnly(cpf);
  if (!cpf) return false; // Check length

  if (cpf.length > 11) return false;
  if (cpf.length < 11) cpf = _Utils.default.paddedZeroes(cpf, 11); // Check repetition

  if (!_Utils.default.checkNumberRepetition(cpf, 11)) return false;
  var sum, val; // Digit 1

  sum = 0;

  for (var l = 0; l < 9; l++) {
    sum += parseInt(cpf[l]) * (10 - l);
  }

  val = 11 - sum % 11;
  if (val === 10 || val === 11) val = 0;
  if (cpf[9] !== val.toString()) return false; // Digit 2

  sum = 0;

  for (var l = 0; l < 10; l++) {
    sum += parseInt(cpf[l]) * (11 - l);
  }

  val = 11 - sum % 11;
  if (val === 10 || val === 11) val = 0;
  if (cpf[10] !== val.toString()) return false;
  return true;
};

var _default = Cpf;
exports.default = _default;