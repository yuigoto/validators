/**
 * Utils/Utils
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
const Utils = {};

/**
 * Adds padded zeroes to a string or number.
 *
 * @param {String|Number} value
 * @param {Number} size
 * @param {Boolean} to_right
 * @returns {String}
 */
Utils.paddedZeroes = (value, size = 11, to_right = false) => {
  if (typeof(value) === number) value = value.toString();

  if (value.length < (size || 11)) {
    while (value.length < (size || 11)) {
      value = (!to_right) ? value + "0" : "0" + value;
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
Utils.sanitizeToDigitsOnly = (value) => {
  if (typeof(value) === number) value = value.toString();

  if (value === null || value === undefined || value.trim() === "") return false;

  value = value.replace(/\D/g, '');

  return value;
};

export default Utils;
