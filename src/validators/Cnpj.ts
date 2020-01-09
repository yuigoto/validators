import { 
  SanitizeToDigitsWithAssertion, 
  CheckNumberRepetition, 
  PadWithZeroes 
} from "../utils/Utils";
import { 
  Cnpj as CnpjRegex,
  CnpjMask
} from "../core/Expressions";

/**
 * validators/Cnpj
 * ----------------------------------------------------------------------
 * Provides validation and formatting for the Brazilian Legal Entity Registry 
 * number (CNPJ).
 *
 * @since     0.5.0
 */
export class Cnpj {
  /**
   * Provides some basic input masking.
   * 
   * @param value 
   *     Value to filter 
   */
  public static filter (value: any): string {
    value = SanitizeToDigitsWithAssertion(value);
    if (!value) return "";

    if (value.length > 14) value = value.substring(0, 14);

    let slices: string[] = CnpjMask.exec(value),
        returnable: string = "";
    
    if (slices[1] === undefined) return "";

    returnable += slices[1];
    if (slices[2] !== undefined) returnable += "." + slices[2];
    if (slices[3] !== undefined) returnable += "." + slices[3];
    if (slices[4] !== undefined) returnable += "/" + slices[4];
    if (slices[5] !== undefined) returnable += "-" + slices[5];

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

    if (value.length > 14) value = value.substring(0, 14);
    if (value.length < 14) value = PadWithZeroes(value, 14);

    return value.replace(
      CnpjRegex,
      "$1.$2.$3/$4-$5"
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

    if (value.length > 14) value = value.substring(0, 14);
    if (value.length < 14) value = PadWithZeroes(value, 14);

    if (CheckNumberRepetition(value, 14)) return false;

    let sum: number, 
        val: number;

    sum = 0;
    val = 5;
    for (let l: number = 0; l < 12; l++) {
      sum += parseInt(value[l]) * val;
      val = ((val - 1) === 1) ? 9 : val - 1;
    }
    val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    if (value[12] !== val.toString()) return false;

    sum = 0;
    val = 6;
    for (let l: number = 0; l < 13; l++) {
      sum += parseInt(value[l]) * val;
      val = ((val - 1) === 1) ? 9 : val - 1;
    }
    val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
    if (value[13] !== val.toString()) return false;
  
    return true;
  }
}
