import { 
  SanitizeToDigitsWithAssertion, 
  PadWithZeroes, 
  CheckNumberRepetition 
} from "../utils/Utils";
import { 
  Pis as PisRegex,
  PisMask
} from "../core/Expressions";

/**
 * validators/Pis
 * ----------------------------------------------------------------------
 * Provides validation and formatting for the Brazilian Social Integration 
 * Program number (PIS).
 *
 * @since     0.5.0
 */
export class Pis {
  /**
   * Provides some basic input masking.
   * 
   * @param value 
   *     Value to filter 
   */
  public static filter (value: any): string {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return "";

    if (value.length > 11) value = value.substring(0, 11);

    let slices: string[] = PisMask.exec(value),
        returnable: string = "";
    
    if (slices[1] === undefined) return "";

    returnable += slices[1];
    if (slices[2] !== undefined) returnable += "." + slices[2];
    if (slices[3] !== undefined) returnable += "." + slices[3];
    if (slices[4] !== undefined) returnable += "-" + slices[4];

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
      PisRegex,
      "$1.$2.$3-$4"
    );
  }

  /**
   * Validates the value using the standard validation algorithm provided.
   * 
   * @param value 
   *     Value to test 
   */
  public static validate (value: any): boolean {
    value = SanitizeToDigitsWithAssertion(value);
    if (value === false) return false;

    if (value.length > 11) value = value.substring(0, 11);
    if (value.length < 11) value = PadWithZeroes(value, 11);

    if (CheckNumberRepetition(value, 11)) return false;

    let sum: number, 
        val: number, 
        multiplier: number;
  
    multiplier = 3;
    sum = 0;
  
    for (let l: number = 0; l < 10; l++) {
      sum += multiplier * value[l];
  
      multiplier -= 1;
      if (multiplier === 1) multiplier = 9;
    }
  
    val = 11 - (sum % 11);
    val = (val === 10 || val === 11) ? 0 : val;
  
    if (value[10] !== val.toString()) {
      return false;
    }
  
    return true;
  }
}
