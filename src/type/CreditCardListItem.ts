/**
 * type/CreditCardListItem
 * ----------------------------------------------------------------------
 * Describe the minimum required to have on a credit card flag validator item.
 *
 * @since 0.6.0
 */
export type CreditCardListItem = {
  /**
   * Human-readable credit card flag name.
   */
  name: string;

  /**
   * URL-safe, unique, credit card flag slug.
   */
  slug: string;

  /**
   * `RegExp` pattern used to match and test for the current flag.
   */
  pattern: RegExp;

  /**
   * `RegExp` pattern used to filter the input even when incomplete (usually
   * when typing).
   */
  groupPattern?: RegExp;

  /**
   * A special `RegExp` pattern used to mask the credit card value.
   */
  mask?: RegExp;
};
