/**
 * Utils/Expressions
 * ----------------------------------------------------------------------
 * Regular expressions used to match multiple types of strings.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */

/**
 * Brazilian natural person registry number (CPF).
 *
 * @type {RegExp}
 */
export const Cpf = /^(\d{3})(\.?\d{3})(\.?\d{3})-?(\d{2})$/;

/**
 * Brazilian legal entity registry number (CNPJ).
 *
 * @type {RegExp}
 */
export const Cnpj = /^(\d{2})(\.?\d{3})(\.?\d{3})\/?(\d{4})-?(\d{2})$/;

/**
 * Brazilian Social Integration Program (PIS) number.
 * 
 * @type {RegExp}
 */
export const Pis = /^(\d{2})(\.?\d{5})(\.?\d{3})-?(\d{1})$/;

/**
 * UUID/GUID, might work for MD5 hashes too.
 *
 * @type {RegExp}
 */
export const Uuid = /^\{?([a-f0-9]{8})(-?[a-f0-9]{4}){3}(-?[a-f0-9]{12})\}?$/;

/**
 * E-mail addresses.
 *
 * @type {RegExp}
 */
export const Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})/;

/**
 * ISO date string.
 *
 * @type {RegExp}
 */
export const IsoDate = /^([0-9]{4})(\-[0-9]{2}){2}T(:?[0-9]{2}){3}(\.[0-9]{3})Z$/;

/**
 * GMT date string.
 *
 * @type {RegExp}
 */
export const GmtDate = /^([A-z]{3}),\s([0-9]{2})\s([A-z]{3})\s([0-9]{4})\s(:?[0-9]{2}){3}\sGMT/;
