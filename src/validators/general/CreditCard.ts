import { Utils } from "../../utils/Utils";
import { CreditCardList } from "../../utils/CreditCardList";

/**
 * Validators/General/CreditCard
 * ----------------------------------------------------------------------
 * Class for simple credit card validation, uses the dictionary provided by 
 * `utils/CreditCardList`, so more can be added later.
 *
 * @since 0.5.0
 */
export class CreditCard {
  /**
   * Contains precalculated values do we don't have to multiply digits all 
   * the time.
   */
  static MODULO: Array<any> = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

  /**
   * Verifies the card flag my using eager type detection.
   * 
   * Returns the card number flag or boolean `false` if no valid flag is 
   * found.
   * 
   * @param input 
   *     Card number to check the flag
   */
  static validateFlag (input: any): boolean|string {
    input = Utils.assertIsString(input);
    if (input === false) return false;

    input = Utils.sanitizeToDigits(input);
    if (input === "") return false;

    let keys: Array<string> = Object.keys(CreditCardList);

    for (let i in keys) {
      let key: string = keys[i];
      let card = CreditCardList[key];
      if (card.pattern.test(input)) return card.slug;
    }

    return false;
  }

  /**
   * Validates the card number using mod10.
   * 
   * @param input 
   *     Card number to test
   */
  static validateModulo (input: any): boolean {
    input = Utils.assertIsString(input);
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
   * @param input 
   *     Card number to test
   */
  static validateDigit (input: any): boolean {
    input = Utils.assertIsString(input);
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
