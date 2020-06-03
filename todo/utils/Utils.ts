/**
 * utils/Utils
 * ----------------------------------------------------------------------
 * Provides general utility functions.
 * 
 * @since     0.5.0
 */

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
export const AssertIsString = (
  input: any,
  notEmpty: boolean = false
): string|boolean => {
  if (typeof input !== "number" && typeof input !== "string") return false;
  if (typeof input === "number") input = input.toString();
  input = input.trim();
  if (notEmpty === true && input === "") return false;
  return input;
};

/**
 * Tests for sequences of repeated numbers in `value`, returning `true` if
 * a sequence is found.
 *
 * @param value
 *     String or numeric value to check
 * @param length
 *     Length to check for repetitions
 */
export const CheckNumberRepetition = (
  value: string|number,
  length: number = 11
): boolean => {
  if (typeof value === "number") value = value.toString();

  for (let i = 0; i < 10; i++) {
    let _rgx: RegExp = new RegExp(`^${i}{${length}}$`, "g");
    if (_rgx.test(value)) return true;
  }

  return false;
};

/**
 * Tests if `value` is a string or a number.
 *
 * @param value
 *     Value to test
 */
export const IsNumberOrString = (value: any): boolean => {
  return (typeof value === "number" || typeof value === "string");
};

/**
 * Pads a string or number with zeroes, to the left or right.
 *
 * If `value` is not a number or string, returns `false`.
 *
 * @param input
 *     Number or string to pad with zeroes
 * @param length
 *     Maximum length allowed for padding
 * @param toRight
 *     When `true`, tells the method to pad zeroes to the right
 */
export const PadWithZeroes = (
  input: string|number,
  length: number,
  toRight: boolean = false
): string => {
  if (typeof input === "number") input = input.toString();

  if (input.length < length) {
    while (input.length < length) {
      input = (toRight === true) ? input + "0" : "0" + input;
    }
  }

  return input;
};

/**
 * Sanitizes a string/number so it contains only digits.
 *
 * IMPORTANT:
 * Use with care, as it breaks float values!
 *
 * @param value
 *     Value to sanitize
 */
export const SanitizeToDigits = (input: string|number): string => {
  if (typeof input === "number") input = input.toString();
  input = input.replace(/[^\d]+/g, '');
  return input;
};

/**
 * Sanitizes and makes sure the input is a string, if not returns boolean 
 * `false`.
 * 
 * @param value 
 *    Value to be sanitized 
 */
export const SanitizeToDigitsWithAssertion = (value: any): string|boolean => {
  value = AssertIsString(value, true);
  if (value === false) return false;

  value = SanitizeToDigits(value);
  if (!value) return false;

  return value;
};
