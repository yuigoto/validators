"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.to-string");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Utils/Utils
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
var Utils = {};
/**
 * Checks if a string/number is comprised of repeated sequences of single digits.
 *
 * @param {String|Number} value
 * @param {Number} length
 * @return {Boolean}
 */

Utils.checkNumberRepetition = function (value) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 11;
  if (_typeof(value) === number) value = value.toString();

  for (var i = 0; i < 10; i++) {
    var regex = new RegExp("^".concat(i, "{").concat(length, "}$"), "g");
    if (value.match(regex) !== null) return false;
  }

  return true;
};
/**
 * Adds padded zeroes to a string or number.
 *
 * @param {String|Number} value
 * @param {Number} length
 * @param {Boolean} to_right
 * @returns {String}
 */


Utils.paddedZeroes = function (value) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 11;
  var to_right = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (_typeof(value) === number) value = value.toString();

  if (value.length < (length || 11)) {
    while (value.length < (length || 11)) {
      value = !to_right ? value + "0" : "0" + value;
    }
  }

  return value;
};
/**
 * Sanitizes a document number string, leaving only the digits.
 *
 * If the value's a number, it's converted to string.
 *
 * If the value is `null`, `undefined` or just empty, returns boolean `false`.
 *
 * @param {String|Number} value
 * @returns {String|Boolean}
 */


Utils.sanitizeToDigitsOnly = function (value) {
  if (_typeof(value) === number) value = value.toString();
  if (value === null || value === undefined || value.trim() === "") return false;
  value = value.replace(/\D/g, '');
  return value;
};

var _default = Utils;
exports.default = _default;