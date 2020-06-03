import { 
  SanitizeToDigitsWithAssertion, 
  PadWithZeroes 
} from "../utils/Utils";
import { 
  RegularDate, 
  RegularDateMask 
} from "../core/Expressions";

/**
 * validators/DateString
 * ----------------------------------------------------------------------
 * Provides basic validation and checking for the DD/MM/YYYY date format.
 *
 * @since     0.5.0
 */
export class DateString {
  /**
   * Provides some basic input masking.
   * 
   * @param value 
   *     Value to filter 
   */
  public static filter (value: any): string {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return "";

    if (value.length > 8) value = value.substring(0, 8);

    let slices = RegularDateMask.exec(value),
        returnable = "";
    
    if (slices[1] === undefined) return "";

    returnable += slices[1];
    if (slices[2] !== undefined) returnable += "/" + slices[2];
    if (slices[3] !== undefined) returnable += "/" + slices[3];

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

    if (value.length > 8) value = value.substring(0, 8);

    return value.replace(
      RegularDate,
      "$1/$2/$3"
    );
  }

  /**
   * Validates the value using basic value checking.
   * 
   * @param value 
   *     Value to test 
   */
  public static validate (value: any): boolean {
    value = SanitizeToDigitsWithAssertion(value);
    if (value === false) return false;

    let slices: string[] = RegularDate.exec(value),
        day: number,
        month: number,
        year: number;

    if (!slices) return false;
    
    day = parseInt(slices[1]),
    month = parseInt(slices[2]),
    year = parseInt(slices[3]);
    
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
      return false;
    }

    // Workaround, since some Node installs don't have ful ICU support
    let dateToCompare: Date = new Date(year, month - 1, day),
        dateTime: string = PadWithZeroes(dateToCompare.getDate(), 2) 
          + "/" + PadWithZeroes((dateToCompare.getMonth() + 1), 2) 
          + "/" + dateToCompare.getFullYear();
    
    if (
      DateString.filter(value) !== dateTime
    ) {
      return false;
    }

    return true;
  }
}
