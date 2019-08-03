import { Utils } from "../utils/Utils";
import { Pis as PisRegex } from "../utils/Expressions";

/**
 * Document/Pis
 * ----------------------------------------------------------------------
 * Provides validation and formatting for the Brazilian Social Integration 
 * Program number (PIS).
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class Pis {
  /**
   * Formats the value against the matching RegExp. If it doesn't match, returns 
   * boolean `false`.
   * 
   * @param {String|Number} input 
   *     Value to format 
   * @returns {String|Boolean} 
   */
  static format (input) {
    input = Pis.sanitize(input);
    if (input === false) return false;

    if (input.length > 11) input = input.substring(0, 11);
    if (input.length < 11) input = Utils.paddingWithZeroes(input, 11);

    return input.replace(
      PisRegex,
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
    input = Pis.sanitize(input);
    if (input === false) return false;

    if (input.length > 11) input = input.substring(0, 11);
    if (input.length < 11) input = Utils.paddingWithZeroes(input, 11);

    if (Utils.checkNumberRepetition(input, 11)) return false;

    let sum, val, multiplier;
  
    multiplier = 3;
    sum = 0;
  
    for (var l = 0; l < 10; l++) {
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
