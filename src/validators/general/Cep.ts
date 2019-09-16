import { 
  Cep as CepRegex,
  CepMask
} from "../../utils/Expressions";
import { Utils } from "../../utils/Utils";

/**
 * Validators/General/Cep
 * ----------------------------------------------------------------------
 * Simple validation for the brazilian ZIP code.
 *
 * @since 0.5.0
 */
export class Cep {
  /**
   * Provides some basic input masking.
   * 
   * @param input 
   *     Value to filter 
   */
  static filter (input: any): string {
    input = Cep.sanitize(input);
    if (!input) return "";

    if (input.length > 8) input = input.substring(0, 8);

    let slices = CepMask.exec(input),
        returnable = "";
    
    if (slices[1] === undefined) return "";

    returnable += slices[1];
    if (slices[2] !== undefined) returnable += "-" + slices[2];

    return returnable;
  }

  /**
   * Simple validation for URL strings with regular expressions.
   * 
   * @param cep 
   *     URL to test 
   */
  static validate (cep: string): boolean {
    if (typeof cep !== "string") return false;
    cep = cep.trim();
    if (cep === "") return false;
    return CepRegex.test(cep);
  }

  /**
   * Sanitizes value, making sure it's always a proper string.
   * 
   * @param input 
   *     Value to sanitize
   */
  static sanitize (input: any): string|boolean {
    input = Utils.assertIsString(input, true);
    if (input === false) return false;
    
    input = Utils.sanitizeToDigits(input);
    if (!input) return false;

    return input;
  }
}
