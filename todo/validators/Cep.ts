import { 
  SanitizeToDigitsWithAssertion, 
  PadWithZeroes 
} from "../utils/Utils";
import {
  Cep as CepRegex, CepMask
} from "../core/Expressions";

/**
 * validators/Cep
 * ----------------------------------------------------------------------
 * Simple validation for the brazilian ZIP code.
 *
 * @since     0.5.0
 */
export class Cep {
  /**
   * Provides some basic input masking.
   * 
   * @param value 
   *     Value to filter 
   */
  public static filter (value: any): string {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return "";

    if (value.length > 8) value = value.substring(0, 8);

    let slices = CepMask.exec(value),
        returnable = "";
    
    if (slices[1] === undefined) return "";

    returnable += slices[1];
    if (slices[2] !== undefined) returnable += "-" + slices[2];

    return returnable;
  }

  /**
   * Formats the value against the matching RegExp. If it doesn't match, returns 
   * boolean `false`.
   * 
   * @param value 
   *     Value to format 
   */
  public static format (value: any): string|boolean {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return false;

    if (value.length > 8) value = value.substring(0, 8);
    if (value.length < 8) value = PadWithZeroes(value, 8);

    return value.replace(
      CepRegex,
      "$1-$2"
    );
  }

  /**
   * Validates the value using the standard validation algorithm provided.
   * 
   * @param value 
   *     Value to test 
   */
  public static validate (value: any): boolean {
    value = SanitizeToDigitsWithAssertion(value);
    if (value === false) return false;

    return CepRegex.test(value);
  }
}
