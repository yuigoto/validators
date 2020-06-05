/**
 * type/MaskMethod
 * ----------------------------------------------------------------------
 * Filters an input and returns it partially, or fully, obfuscated.
 *
 * Should provide an optional parameter to set a character to be used as mask.
 *
 * @since 0.6.0
 */
export type MaskMethod<T> = (value: T, maskWith?: string) => string;
