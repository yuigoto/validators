import Utils from "../utils/Utils";

/**
 * Documents/Cpf
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
const Cpf = {};

/**
 * Formats the CPF document number.
 *
 * @param {String|Number} cpf
 * @return {String|Boolean}
 */
Cpf.format = (cpf) => {
  cpf = Utils.sanitizeToDigitsOnly(cpf);

  if (!cpf) return false;

  // Check length
  if (cpf.length > 11) return false;
  if (cpf.length < 11) cpf = Utils.paddedZeroes(cpf, 11);

  return cpf.replace(
    /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/g,
    "$1.$2.$3-$4"
  );
};

/**
 * Validates the CPF document number.
 *
 * @param {String|Number} cpf
 * @return {Boolean}
 */
Cpf.validate = (cpf) => {
  cpf = Utils.sanitizeToDigitsOnly(cpf);

  if (!cpf) return false;

  // Check length
  if (cpf.length > 11) return false;
  if (cpf.length < 11) cpf = Utils.paddedZeroes(cpf, 11);

  // Check repetition
  if (!Utils.checkNumberRepetition(cpf, 11)) return false;

  let sum, val;

  // Digit 1
  sum = 0;
  for (var l = 0; l < 9; l++) {
    sum += parseInt(cpf[l]) * (10 - l);
  }
  val = 11 - (sum % 11);
  if (val === 10 || val === 11) val = 0;
  if (cpf[9] !== val.toString()) return false;

  // Digit 2
  sum = 0;
  for (var l = 0; l < 10; l++) {
    sum += parseInt(cpf[l]) * (11 - l);
  }
  val = 11 - (sum % 11);
  if (val === 10 || val === 11) val = 0;
  if (cpf[10] !== val.toString()) return false;

  return true;
};

export default Cpf;
