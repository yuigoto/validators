"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.match");

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
var Email = {};
/**
 * Validates an e-mail address string, but doesn't validate MX records.
 *
 * @param {String} email
 * @return {Boolean}
 */

Email.validateAddress = function (email) {
  if (null === email || undefined === email) return false;
  email = email.trim("");
  if (email === "") return false;
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})$/;

  if (email.match !== null && email.match !== undefined) {
    return true;
  }

  return false;
};

var _default = Email;
exports.default = _default;