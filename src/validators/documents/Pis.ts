import { Utils } from "../../utils/Utils";
import { 
  Pis as PisRegex,
  PisMask
} from "../../utils/Expressions";

/**
 * Validators/Documents/Pis
 * ----------------------------------------------------------------------
 * Provides validation and formatting for the Brazilian Social Integration 
 * Program number (PIS).
 *
 * @since 0.5.0
 */
export class Pis {
  /**
   * Formats the value against the matching RegExp. If it doesn't match, returns 
   * boolean `false`.
   * 
   * @param input 
   *     Value to format 
   */
  static format (input: any): string|boolean {
    input = Pis.sanitize(input);
    if (input === false) return false;

    if (input.length > 11) input = input.substring(0, 11);
    if (input.length < 11) input = Utils.padWithZeroes(input, 11);

    return input.replace(
      PisRegex,
      "$1.$2.$3-$4"
    );
  }

  /**
   * Provides some basic input masking.
   * 
   * @param input 
   *     Value to filter 
   */
  static filter (input: any): string {
    input = Pis.sanitize(input);
    if (!input) return "";

    if (input.length > 11) input = input.substring(0, 11);

    let slices = PisMask.exec(input),
        returnable = "";
    
    if (slices[1] === undefined) return "";

    returnable += slices[1];
    if (slices[2] !== undefined) returnable += "." + slices[2];
    if (slices[3] !== undefined) returnable += "." + slices[3];
    if (slices[4] !== undefined) returnable += "-" + slices[4];

    return returnable;
  }

  /**
   * Validates the value using the standard validation algorithm provided.
   * 
   * @param input 
   *     Value to format 
   */
  static validate (input: any): boolean {
    input = Pis.sanitize(input);
    if (input === false) return false;

    if (input.length > 11) input = input.substring(0, 11);
    if (input.length < 11) input = Utils.padWithZeroes(input, 11);

    if (Utils.checkNumberRepetition(input, 11)) return false;

    let sum: number, 
        val: number, 
        multiplier: number;
  
    multiplier = 3;
    sum = 0;
  
    for (let l: number = 0; l < 10; l++) {
      sum += multiplier * input[l];
  
      multiplier -= 1;
      if (multiplier === 1) multiplier = 9;
    }
  
    val = 11 - (sum % 11);
    val = (val === 10 || val === 11) ? 0 : val;
  
    if (input[10] !== val.toString()) {
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
