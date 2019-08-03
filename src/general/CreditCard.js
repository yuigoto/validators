import { CreditCardType } from "../utils/CreditCardType";
import { Utils } from "../utils/Utils";

/**
 * General/CreditCard
 * ----------------------------------------------------------------------
 * Class for simple credit card validation, uses the dictionary provided by 
 * `utils/CreditCardType`, so more can be added later.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class CreditCard {
  /**
   * Contains precalculated values do we don't have to multiply digits all 
   * the time.
   * 
   * @type {Array}
   */
  static MODULO = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

  /**
   * Verifies the card flag my using eager type detection.
   * 
   * Returns the card number flag or boolean `false` if no valid flag is 
   * found.
   * 
   * @param {String|Number} input 
   *     Card number to check the flag
   * @returns {String|Boolean}
   */
  static validateFlag (input) {
    input = Utils.assertInputIsString(input);
    if (input === false) return false;

    input = Utils.sanitizeToDigits(input);
    if (input === "") return false;

    let keys = Object.keys(CreditCardType);

    for (let key of keys) {
      let card = CreditCardType[key];
      if (card.pattern.test(input)) return card.slug;
    }

    return false;
  }

  /**
   * Validates the card number using mod10.
   * 
   * @param {String|Number} input 
   *     Card number to test
   * @returns {Boolean}
   */
  static validateModulo (input) {
    input = Utils.assertInputIsString(input);
    if (input === false) return false;

    input = Utils.sanitizeToDigits(input);
    if (input === "") return false;

    let exploded = input.trim().split(""),
        sum = 0;
    
    exploded = exploded.reverse();

    for (let n = 0; n < exploded.length; n++) {
      let _value = parseInt(exploded[n]);
      sum += (n % 2 === 0) ? _value : CreditCard.MODULO[_value];
    }

    return (sum % 10 === 0);
  }

  /**
   * Validates the digit of the credit card number using Luhn's algorithm.
   * 
   * @param {String|Number} input 
   *     Card number to test
   * @returns {Boolean}
   */
  static validateDigit (input) {
    input = Utils.assertInputIsString(input);
    if (input === false) return false;

    input = Utils.sanitizeToDigits(input);
    if (input === "") return false;

    let exploded = input.trim().split(""),
        sum = 0,
        digit = exploded.pop(),
        check;
    
    exploded = exploded.reverse();

    for (let n = 0; n < exploded.length; n++) {
      let _value = parseInt(exploded[n]);
      sum += (n % 2 === 0) ? CreditCard.MODULO[_value] : _value;
    }

    check = (10 - (sum % 10)) % 10;

    return (check === parseInt(digit));
  }
}
