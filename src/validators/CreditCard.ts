import { SanitizeToDigitsWithAssertion } from "../utils/Utils";
import { CreditCardList } from "../utils/CreditCardList";
import { CreditCardItem } from "../core/Types";

/**
 * validators/CreditCard
 * ----------------------------------------------------------------------
 * Class for simple credit card validation, uses the dictionary provided by 
 * `utils/CreditCardList`, so more can be added later.
 *
 * @since     0.5.0
 */
export class CreditCard {
  /**
   * Contains precalculated values do we don't have to multiply digits all 
   * the time.
   */
  public static MODULO: Array<number> = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

  /**
   * Checks and returns the credit card flag name.
   * 
   * @param {any} value 
   *     Credit card number 
   */
  public static getCardFlagName (value: any): string {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return "";

    let keys: Array<string> = Object.keys(CreditCardList);

    for (let i in keys) {
      let key: string = keys[i];
      let card: CreditCardItem = CreditCardList[key];

      if (card.pattern.test(value)) return card.name;
    }

    return "";
  }
  
  /**
   * Checks and returns the credit card slug.
   * 
   * @param {any} value 
   *     Credit card number 
   */
  public static getCardFlagSlug (value: any): string {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return "";

    let keys: Array<string> = Object.keys(CreditCardList);

    for (let i in keys) {
      let key: string = keys[i];
      let card: CreditCardItem = CreditCardList[key];

      if (card.pattern.test(value)) return card.slug;
    }

    return "";
  }

  /**
   * Filters the input value according to the mask pattern on the credit card 
   * declared in the object.
   * 
   * @param value 
   *     Number to filter 
   */
  public static filter (value: any): string {
    if (!CreditCard.validateFlag(value)) return value;

    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return "";

    let keys: Array<string> = Object.keys(CreditCardList);

    for (let i in keys) {
      let key: string = keys[i],
          card: CreditCardItem = CreditCardList[key],
          valid: boolean = card.pattern.test(value), 
          slices: string[] = card.groupPattern.exec(value),
          returnable: Array<string> = [];

      if (valid && slices[1] !== undefined) {
        for (let s = 1; s < slices.length; s++) {
          if (slices[s] !== undefined) {
            returnable.push(slices[s]);
          }
        }

        if (returnable.length > 0) return returnable.join(" ");
      }
    }

    return value;
  }

  /**
   * Formats the card number with `filter`, used as alias to avoid unnecessary 
   * expressions.
   * 
   * @param value 
   *     Card number to format 
   */
  public static format (value: any): string {
    return CreditCard.filter(value);
  }

  /**
   * Masks all segments from a credit card number, save for the first.
   * 
   * @param value 
   *     Card number to mask 
   * @param maskWith 
   *     Optional, defined which value to use when masking, by default we 
   *     use `x` 
   */
  public static mask (value: any, maskWith: string = "x"): string {
    if (!CreditCard.validateFlag(value)) return value;

    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return "";

    let keys: Array<string> = Object.keys(CreditCardList);

    for (let i in keys) {
      let key: string = keys[i],
          card: CreditCardItem = CreditCardList[key],
          slices = card.groupPattern.exec(value),
          returnable: Array<string> = [];

      if (slices[1] !== undefined) {
        for (let s = 1; s < slices.length; s++) {
          if (slices[s] !== undefined) {
            if (s > 1) {
              returnable.push(slices[s].replace(/\d/g, maskWith));
            } else {
              returnable.push(slices[s]);
            }
          }
        }
        
        if (returnable.length > 0) return returnable.join("-");
      }
    }

    return value;
  }

  /**
   * Validates the digit of the credit card number using Luhn's algorithm.
   * 
   * @param value 
   *     Card number to test
   */
  public static validateDigit (value: any): boolean {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return false;

    let exploded: string[] = value.trim().split(""),
        sum: number = 0,
        digit: string = exploded.pop(),
        check: number;
    
    exploded = exploded.reverse();

    for (let n = 0; n < exploded.length; n++) {
      let _value = parseInt(exploded[n]);
      sum += (n % 2 === 0) ? CreditCard.MODULO[_value] : _value;
    }

    check = (10 - (sum % 10)) % 10;

    return (check === parseInt(digit));
  }

  /**
   * Verifies the card flag my using eager type detection.
   * 
   * Returns the card number flag or boolean `false` if no valid flag is 
   * found.
   * 
   * @param value 
   *     Card number to check the flag
   */
  public static validateFlag (value: any): boolean|string {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return false;

    let keys: Array<string> = Object.keys(CreditCardList);

    for (let i in keys) {
      let key: string = keys[i];
      let card: CreditCardItem = CreditCardList[key];

      if (card.pattern.test(value)) return card.slug;
    }

    return false;
  }

  /**
   * Validates the card number using mod10.
   * 
   * @param value 
   *     Card number to test
   */
  public static validateModulo (value: any): boolean {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return false;

    let exploded: string[] = value.trim().split(""),
        sum: number = 0;
    
    exploded = exploded.reverse();

    for (let n = 0; n < exploded.length; n++) {
      let _value = parseInt(exploded[n]);
      sum += (n % 2 === 0) ? _value : CreditCard.MODULO[_value];
    }

    return (sum % 10 === 0);
  }
}
