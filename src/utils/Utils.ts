/**
 * Utils/Utils
 * ----------------------------------------------------------------------
 * Provides general utility functions.
 * 
 * @since 0.5.0
 */
export class Utils {
  /**
   * Asserts that `input` is a valid string, returns `false` if the input isn't 
   * accepted as one.
   * 
   * Accepts numbers and strings as input values, numbers are converted.
   * 
   * Validating empty values is optional.
   * 
   * @param input 
   *     Input to assert 
   * @param notEmpty 
   *     When set to `true`, won't validate if the string is empty 
   */
  static assertIsString (
    input: any, 
    notEmpty: boolean = false
  ): string|boolean {
    if (typeof input !== "number" && typeof input !== "string") return false;
    if (typeof input === "number") input = input.toString();
    input = input.trim();
    if (notEmpty === true && input === "") return false;
    return input;
  }

  /**
   * Tests for sequences of repeated numbers in `value`, returning `true` if 
   * a sequence is found.
   * 
   * @param value 
   *     String or numeric value to check
   * @param length 
   *     Length to check for repetitions
   */
  static checkNumberRepetition (value: string|number, length: number = 11): boolean {
    if (!Utils.isNumberOrString(value)) return false;
    if (typeof value === "number") value = value.toString();

    for (let i = 0; i < 10; i++) {
      let _rgx: RegExp = new RegExp(`^${i}{${length}}$`, "g");
      if (_rgx.test(value)) return true;
    }

    return false;
  }

  /**
   * Tests if `value` is a string or a number.
   * 
   * @param value 
   *     Value to test
   */
  static isNumberOrString (value: any): boolean {
    return (typeof value === "number" || typeof value === "string");
  }

  /**
   * Pads a string or number with zeroes, to the left or right.
   * 
   * If `value` is not a number or string, returns `false`.
   * 
   * @param value 
   *     Number or string to pad with zeroes 
   * @param length 
   *     Maximum length allowed for padding 
   * @param toRight 
   *     When `true`, tells the method to pad zeroes to the right 
   */
  static padWithZeroes (
    value: string|number, 
    length: number = 11, 
    toRight: boolean = false
  ): string|boolean {
    if (!Utils.isNumberOrString(value)) return false;
    if (typeof value === "number") value = value.toString();

    if (value.length < (length || 11)) {
      while (value.length < (length || 11)) {
        value = (toRight) ? value + "0" : "0" + value;
      }
    }

    return value;
  }

  /**
   * Sanitizes a string/number so it contains only digits.
   * 
   * IMPORTANT:
   * Use with care, as it breaks float values!
   * 
   * @param value 
   *     Value to sanitize 
   */
  static sanitizeToDigits (value: string|number): string|boolean {
    if (!Utils.isNumberOrString(value)) return false;
    if (typeof value === "number") value = value.toString();
    if (value === undefined || value === null || value === "") return false;
    return value.replace(/[^\d]/g, "");
  }
}
