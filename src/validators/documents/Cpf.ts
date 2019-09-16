import { Utils } from "../../utils/Utils";
import { 
  Cpf as CpfRegex,
  CpfMask
} from "../../utils/Expressions";

/**
 * Validators/Documents/Cpf
 * ----------------------------------------------------------------------
 * Provides validation and formatting for the Brazilian Natural Person 
 * Registry number (CPF).
 *
 * @since 0.5.0
 */
export class Cpf {
  /**
   * Formats the value against the matching RegExp. If it doesn't match, returns 
   * boolean `false`.
   * 
   * @param input 
   *     Value to format 
   */
  static format (input: any): string|boolean {
    input = Cpf.sanitize(input);
    if (!input) return false;

    if (input.length > 11) input = input.substring(0, 11);
    if (input.length < 11) input = Utils.padWithZeroes(input, 11);

    return input.replace(
      CpfRegex,
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
    input = Cpf.sanitize(input);
    if (!input) return "";

    if (input.length > 11) input = input.substring(0, 11);

    let slices = CpfMask.exec(input),
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
    input = Cpf.sanitize(input);
    if (!input) return false;

    if (input.length > 11) input = input.substring(0, 11);
    if (input.length < 11) input = Utils.padWithZeroes(input, 11);

    if (Utils.checkNumberRepetition(input, 11)) return false;

    let sum: number, 
        val: number;

    sum = 0;
    for (let l: number = 0; l < 9; l++) {
      sum += parseInt(input[l]) * (10 - l);
    }
    val = 11 - (sum % 11);
    if (val === 10 || val === 11) val = 0;
    if (input[9] !== val.toString()) return false;
    
    sum = 0;
    for (let l: number = 0; l < 10; l++) {
      sum += parseInt(input[l]) * (11 - l);
    }
    val = 11 - (sum % 11);
    if (val === 10 || val === 11) val = 0;
    if (input[10] !== val.toString()) return false;

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
