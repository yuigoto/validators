/**
 * Utils/Utils
 * ----------------------------------------------------------------------
 * Provides general utility functions.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class Utils {
  /**
   * Asserts input is a valid string, returns false if input is not accepted.
   * 
   * Will accept numbers and then convert them to string.
   * 
   * Validating empty values is optional.
   * 
   * @param {*} input 
   *     Input to validate
   * @param {Boolean} notEmpty 
   *     If set to `true` won't let empty strings to pass the assertion
   * @returns {String|Boolean}
   */
  static assertInputIsString (input, notEmpty = false) {
    if (typeof input !== "number" && typeof input !== "string") return false;
    if (typeof input === "number") input = input.toString();
    
    input = input.trim();

    if (notEmpty === true && input === "") return false;
    return input;
  }

  /**
   * Tests if `value` is a number or string.
   * 
   * @param {*} value 
   *     Input to validate
   * @returns {Boolean}
   */
  static numberOrStringCheck (value) {
    return (typeof value === "number" || typeof value === "string");
  }

  /**
   * Tests sequences of repeated numbers, returns `true` when a number is 
   * a sequence.
   * 
   * @param {String|Number} value 
   *     Input to check
   * @param {Number} length 
   *     Desired/ideal length to test 
   * @returns {Boolean}
   */
  static checkNumberRepetition (value, length = 11) {
    if (!Utils.numberOrStringCheck(value)) return false;
    if (typeof value === "number") value = value.toString();

    for (let i = 0; i < 10; i++) {
      let _rgx = new RegExp(`^${i}{${length}}$`, "g");

      if (_rgx.test(value)) return true;
    }

    return false;
  }
  
  /**
   * Pads a string or number with zeroes to the left or right.
   * 
   * Returns `false` when value is not a number or string.
   * 
   * @param {String|Number} value 
   *     Value to be padded
   * @param {Number} length 
   *     Desired length for the final string
   * @param {Boolean} toRight 
   *     If true, adds padded zeroes to the right of the input
   * @returns {String|Boolean}
   */
  static paddingWithZeroes (value, length = 11, toRight = false) {
    if (!Utils.numberOrStringCheck(value)) return false;
    if (typeof value === "number") value = value.toString();

    if (value.length < (length || 11)) {
      while (value.length < (length || 11)) {
        value = (toRight) ? value + "0" : "0" + value;
      }
    }

    return value;
  }

  /**
   * Sanitizes a string/number value to contain only digits.
   * 
   * IMPORTANT:
   * Might break float values!
   * 
   * @param {String|Number} value 
   *     Value to be sanitized
   * @returns {String} 
   */
  static sanitizeToDigits (value) {
    if (!Utils.numberOrStringCheck(value)) return false;
    if (typeof value === "number") value = value.toString();

    if (value === undefined || value === null || value === "") return false;

    return value.replace(/[^\d]/g, "");
  };
}
