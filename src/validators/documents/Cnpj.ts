import { Utils } from "../../utils/Utils";
import { Cnpj as CnpjRegex } from "../../utils/Expressions";

/**
 * Validators/Documents/Cnpj
 * ----------------------------------------------------------------------
 * Provides validation and formatting for the Brazilian Legal Entity Registry 
 * number (CNPJ).
 *
 * @since 0.5.0
 */
export class Cnpj {
  /**
   * Formats the value against the matching RegExp. If it doesn't match, returns 
   * boolean `false`.
   * 
   * @param input 
   *     Value to format 
   */
  static format (input: any): string|boolean {
    input = Cnpj.sanitize(input);
    if (!input) return false;

    if (input.length > 14) input = input.substring(0, 14);
    if (input.length < 14) input = Utils.padWithZeroes(input, 14);

    return input.replace(
      CnpjRegex,
      "$1.$2.$3/$4-$5"
    );
  }

  /**
   * Validates the value using the standard validation algorithm provided.
   * 
   * @param input 
   *     Value to format 
   */
  static validate (input: any): boolean {
    input = Cnpj.sanitize(input);
    if (input === false) return false;

    if (input.length > 14) input = input.substring(0, 14);
    if (input.length < 14) input = Utils.padWithZeroes(input, 14);

    if (Utils.checkNumberRepetition(input, 14)) return false;

    let sum: number, 
        val: number;

    sum = 0;
    val = 5;
    for (let l: number = 0; l < 12; l++) {
      sum += parseInt(input[l]) * val;
      val = ((val - 1) === 1) ? 9 : val - 1;
    }
    val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    if (input[12] !== val.toString()) return false;

    sum = 0;
    val = 6;
    for (let l: number = 0; l < 13; l++) {
      sum += parseInt(input[l]) * val;
      val = ((val - 1) === 1) ? 9 : val - 1;
    }
    val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    if (input[13] !== val.toString()) return false;
  
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
