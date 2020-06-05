/**
 * type/FilterMethod
 * ----------------------------------------------------------------------
 * A filter method should parse an input and returns it fully or partially
 * formatted.
 *
 * @since 0.6.0
 */
export type FilterMethod<T> = (value: T) => string;
