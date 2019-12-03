import { Utils } from "../../utils/Utils";
import {
  RegularDate as DateRegex,
  RegularDateMask
} from "../../utils/Expressions";

/**
 * Validators/General/DateString
 * ----------------------------------------------------------------------
 * Provides basic validation and checking for the DD/MM/YYYY date format.
 *
 * @since 0.5.0
 */
export class DateString {
  /**
   * Formats the value against the matching RegExp. If it doesn't match, returns 
   * boolean `false`.
   * 
   * @param input 
   *     Value to format 
   */
  static format (input: any): string|boolean {
    input = DateString.sanitize(input);
    if (!input) return false;

    if (input.length > 8) input = input.substring(0, 8);

    return input.replace(
      DateRegex,
      "$1/$2/$3"
    );
  }

  /**
   * Provides some basic input masking.
   * 
   * @param input 
   *     Value to filter 
   */
  static filter (input: any): string {
    input = DateString.sanitize(input);
    if (!input) return "";

    if (input.length > 8) input = input.substring(0, 8);

    let slices = DateRegex.exec(input),
        returnable = "";
    
    if (slices[1] === undefined) return "";

    returnable += slices[1];
    if (slices[2] !== undefined) returnable += "/" + slices[2];
    if (slices[3] !== undefined) returnable += "/" + slices[3];

    return returnable;
  }

  /**
   * Validates the value using basic value checking.
   * 
   * @param input 
   *     Value to format 
   */
  static validate (input: any): boolean {
    input = DateString.sanitize(input);
    if (!input) return false;

    if (input.length > 8) input = input.substring(0, 8);

    let slices = DateRegex.exec(input),
        day = parseInt(slices[1]),
        month = parseInt(slices[2]),
        year = parseInt(slices[3]);

    console.log("YA");
    
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
      return false;
    }

    let dateToCompare = new Date(year, month - 1, day);

    console.log(dateToCompare.toLocaleDateString("pt-BR"));

    if (
      DateString.filter(input) !== dateToCompare.toLocaleDateString("pt-BR")
    ) {
      return false;
    }

    return true;
  }

  /**
   * Sanitizes value, making sure it's always a proper string.
   * 
   * @param input 
   *     Value to sanitize
   */
  static sanitize (input: any): string|boolean {
    input = Utils.assertIsString(input, true);
    if (input === false) return false;
    
    input = Utils.sanitizeToDigits(input);
    if (!input) return false;

    return input;
  }
}
