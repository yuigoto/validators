import { 
  SanitizeToDigitsWithAssertion, 
  PadWithZeroes 
} from "../utils/Utils";
import {
  Phone as PhoneRegex, 
  PhoneMask, 
  PhoneMaskCell
} from "../core/Expressions";

/**
 * validators/Phone
 * ----------------------------------------------------------------------
 * Simple brazilian phone number validation class.
 *
 * @since     0.5.0
 */
export class Phone {
  /**
   * Provides some basic input masking.
   * 
   * @param value 
   *     Value to filter 
   */
  public static filter (value: any): string {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return "";

    if (value.length > 12) value = value.substring(0, 12);

    let slices: string[],
        returnable: string;

    if (value.length === 10) {
      slices = PhoneMask.exec(value);
    } else {
      slices = PhoneMaskCell.exec(value);
    }

    returnable = "";
    
    if (slices[1] === undefined) return "";

    returnable += "(" + slices[1];
    if (slices[2] !== undefined) returnable += ") " + slices[2];
    if (slices[3] !== undefined) returnable += "-" + slices[3];

    return returnable;
  }

  /**
   * Formats the value against the matching RegExp. If it doesn't match, returns 
   * boolean `false`.
   * 
   * @param value 
   *     Value to format 
   */
  public static format (value: any): string|boolean {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return false;

    if (value.length > 11) value = value.substring(0, 11);
    if (value.length < 11) value = PadWithZeroes(value, 11);

    return value.replace(
      PhoneRegex,
      "($1) $2-$3"
    );
  }

  /**
   * Validates the value using basic value checking.
   * 
   * @param input 
   *     Value to test 
   */
  public static validate (value: any): boolean {
    value = SanitizeToDigitsWithAssertion(value);
    if (value === false) return false;

    return PhoneRegex.test(value);
  }
}
