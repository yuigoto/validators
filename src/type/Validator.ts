import { ValidateMethod } from "./ValidateMethod";
import { FilterMethod } from "./FilterMethod";
import { FormatMethod } from "./FormatMethod";
import { MaskMethod } from "./MaskMethod";

/**
 * type/Validator
 * ----------------------------------------------------------------------
 * Describes the basic structure of an exported validator.
 *
 * @since 0.6.0
 */
export type Validator = {
  /**
   * Validates the input provided.
   *
   * @param value
   *     Value to be validated
   */
  validate: ValidateMethod<any>;

  /**
   * Filters an input and returns it formatted.
   *
   * Different from `format()`, this method works with an incomplete string.
   *
   * @param value
   *     Value to be filtered
   */
  filter?: FilterMethod<any>;

  /**
   * Formats the input, returning it properly formatted or boolean `false` in
   * case the input is invalid.
   *
   * Differently from `filter()`, this method only works if the string is
   * valid against the validator's matching algorithm.
   *
   * @param value
   *     Value to be formatted
   */
  format?: FormatMethod<any>;

  /**
   * Filters an input, returning it formatted and partially/fully obfuscated.
   *
   * @param value
   *     Value to mask
   * @param maskWith
   *     Character to be used when masking
   */
  mask?: MaskMethod<any>;
};