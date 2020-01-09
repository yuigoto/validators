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
 */
export type CreditCardItem = {
  name: string,
  slug: string,
  pattern: RegExp
};

/**
 * Credit card collections stores unique key/value pairs of `CreditCardItem`
 * objects.
 */
export type CreditCardCollection = {
  [key: string]: CreditCardItem
};
