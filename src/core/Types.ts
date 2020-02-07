/**
 * core/Types
 * ----------------------------------------------------------------------
 * Exports types used to validate objects.
 * 
 * @since     0.5.0
 */

/**
 * Every credit card must have:
 * - A human-readable name for the flag;
 * - URL-safe, unique, slug;
 * - A RegExp pattern to validate it;
 * 
 * Optionally you may include:
 * - A groupPattern you can use to filter/mask the card, can also be used to 
 * validate the mask;
 * - A `mask` to validate masked credit card values;
 */
export type CreditCardItem = {
  name: string,
  slug: string,
  pattern: RegExp,
  groupPattern?: RegExp,
  mask?: RegExp
};

/**
 * Credit card collections stores unique key/value pairs of `CreditCardItem`
 * objects.
 */
export type CreditCardCollection = {
  [key: string]: CreditCardItem
};
