/**
 * General/Email
 * ----------------------------------------------------------------------
 * Generic e-mail string validation.
 *
 * TODO: see if it's possible to test for MX records/server so we can see
 * if the e-mail's domain is valid.
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
const Email = {};

/**
 * Validates an e-mail address string, but doesn't validate MX records.
 *
 * @param {String} email
 * @return {Boolean}
 */
Email.validateAddress = (email) => {
  if (null === email || undefined === email) return false;

  email = email.trim("");

  if (email === "") return false;

  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})$/;

  if (email.match !== null && email.match !== undefined) {
    return true;
  }

  return false;
};

export default Email;
