import { Utils } from "../utils/Utils";
import { Cpf as CpfRegex } from "../utils/Expressions";

/**
 * Document/Cpf
 * ----------------------------------------------------------------------
 * Provides validation and formatting for the Brazilian Natural Person 
 * Registry number (CPF).
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class Cpf {
  /**
   * Formats the value against the matching RegExp. If it doesn't match, returns 
   * boolean `false`.
   * 
   * @param {String|Number} input 
   *     Value to format 
   * @returns {String|Boolean} 
   */
  static format (input) {
    input = Cpf.sanitize(input);
    if (!input) return false;

    if (input.length > 11) input = input.substring(0, 11);
    if (input.length < 11) input = Utils.paddingWithZeroes(input, 11);

    return input.replace(
      CpfRegex,
      "$1.$2.$3-$4"
    );
  }

  /**
   * Validates the value using the standard validation algorithm provided.
   * 
   * @param {String|Number} input 
   *     Value to format 
   * @returns {Boolean} 
   */
  static validate (input) {
    input = Cpf.sanitize(input);
    if (!input) return false;

    if (input.length > 11) input = input.substring(0, 11);
    if (input.length < 11) input = Utils.paddingWithZeroes(input, 11);

    if (Utils.checkNumberRepetition(input, 11)) return false;
    
    let sum, val;

    sum = 0;
    for (var l = 0; l < 9; l++) {
      sum += parseInt(input[l]) * (10 - l);
    }
    val = 11 - (sum % 11);
    if (val === 10 || val === 11) val = 0;
    if (input[9] !== val.toString()) return false;
    
    sum = 0;
    for (var l = 0; l < 10; l++) {
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
   * @param {String|Number} input 
   *     Value to sanitize
   * @returns {String|Boolean}
   */
  static sanitize (input) {
    input = Utils.assertInputIsString(input, true);
    if (input === false) return false;
    
    input = Utils.sanitizeToDigits(input);
    if (!input) return false;

    return input;
  }
}
