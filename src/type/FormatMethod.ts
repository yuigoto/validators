/**
 * type/FormatMethod
 * ----------------------------------------------------------------------
 * Formatter method should fully format an input or return boolean `false`
 * if the input is invalid.
 *
 * @since 0.6.0
 */
export type FormatMethod<T> = (value: T) => string|boolean;
