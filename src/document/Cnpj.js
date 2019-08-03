import { Utils } from "../utils/Utils";
import { Cnpj as CnpjRegex } from "../utils/Expressions";

/**
 * Document/Cnpj
 * ----------------------------------------------------------------------
 * Provides validation and formatting for the Brazilian Legal Entity Registry 
 * number (CNPJ).
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class Cnpj {
  /**
   * Formats the value against the matching RegExp. If it doesn't match, returns 
   * boolean `false`.
   * 
   * @param {String|Number} input 
   *     Value to format 
   * @returns {String|Boolean} 
   */
  static format (input) {
    input = Cnpj.sanitize(input);
    if (!input) return false;

    if (input.length > 14) input = input.substring(0, 14);
    if (input.length < 14) input = Utils.paddingWithZeroes(input, 14);

    return input.replace(
      CnpjRegex,
      "$1.$2.$3/$4-$5"
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
    input = Cnpj.sanitize(input);
    if (input === false) return false;

    if (input.length > 14) input = input.substring(0, 14);
    if (input.length < 14) input = Utils.paddingWithZeroes(input, 14);

    if (Utils.checkNumberRepetition(input, 14)) return false;

    let sum, val;

    sum = 0;
    val = 5;
    for (var l = 0; l < 12; l++) {
      sum += parseInt(input[l]) * val;
      val = ((val - 1) === 1) ? 9 : val - 1;
    }
    val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    if (input[12] !== val.toString()) return false;

    sum = 0;
    val = 6;
    for (var l = 0; l < 13; l++) {
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
