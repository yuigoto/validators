/**
 * utils/Expressions
 * ----------------------------------------------------------------------
 * Regular expressions used to match multiple types of strings.
 *
 * @since     0.0.1
 */

/**
 * Brazilian phone numbers.
 */
export const Phone: RegExp = /^\(?(\d{2})\)?\s?(\d{4,5})-?(\d{4})$/;

/**
 * Brazilian phone numbers mask.
 */
export const PhoneMask: RegExp = /^\(?(\d{1,2})\)?\s?(\d{1,4})?-?(\d{1,4})?(.*)?$/;

/**
 * Brazilian cellphone number mask.
 */
export const PhoneMaskCell: RegExp = /^\(?(\d{1,2})\)?\s?(\d{1,5})?-?(\d{1,4})?(.*)?$/;

/**
 * Brazilian ZIP code.
 */
export const Cep: RegExp = /^(\d{5})-?(\d{3})$/;

/**
 * Brazilian ZIP code mask.
 */
export const CepMask: RegExp = /^(\d{1,5})(\d{1,3})?(.*)?$/;

/**
 * Brazilian natural person registry number (CPF).
 */
export const Cpf: RegExp = /^(\d{3})(\.?\d{3})(\.?\d{3})-?(\d{2})$/;

/**
 * Used to provide input masking for CPF inputs.
 */
export const CpfMask: RegExp = /^(\d{1,3})\.?(\d{1,3})?\.?(\d{1,3})?\-?(\d{1,2})?(.*)?$/;

/**
 * Brazilian legal entity registry number (CNPJ).
 */
export const Cnpj: RegExp = /^(\d{2})(\.?\d{3})(\.?\d{3})\/?(\d{4})-?(\d{2})$/;

/**
 * Used to provide input masking for CNPJ inputs.
 */
export const CnpjMask: RegExp = /^(\d{1,2})\.?(\d{1,3})?\.?(\d{1,3})?\/?(\d{1,4})?-?(\d{1,2})?(.*)?/;

/**
 * Brazilian Social Integration Program (PIS) number.
 */
export const Pis: RegExp = /^(\d{2})(\.?\d{5})(\.?\d{3})-?(\d{1})$/;

/**
 * Used to provide input masking for PIS inputs.
 */
export const PisMask: RegExp = /^(\d{1,2})\.?(\d{1,5})?\.?(\d{1,3})?\-?(\d{1})?(.*)?$/;

/**
 * UUID/GUID, might work for MD5 hashes too.
 */
export const Uuid: RegExp = /^\{?([a-f0-9]{8})(-?[a-f0-9]{4}){3}(-?[a-f0-9]{12})\}?$/;

/**
 * E-mail addresses.
 */
export const Email: RegExp = /^\w+([^@]+)*@\w+([\.-]?\w+)*(\.\w{2,10})/;

/**
 * Regular DD/MM/YYYY date format.
 */
export const RegularDate: RegExp = /^([0-9]{2})\/?([0-9]{2})\/?([0-9]{4})$/;

/**
 * Regular DD/MM/YYYY date mask.
 */
export const RegularDateMask: RegExp = /^([0-9]{1,2})\/?([0-9]{1,2})?\/?([0-9]{1,4})?(.*)?$/;

/**
 * ISO date string.
 */
export const IsoDate: RegExp = /^([0-9]{4})(\-[0-9]{2}){2}T(:?[0-9]{2}){3}(\.[0-9]{3})Z$/;

/**
 * UTD date string.
 */
export const UtcDate: RegExp = /^([A-z]{3}),\s([0-9]{2})\s([A-z]{3})\s([0-9]{4})\s(:?[0-9]{2}){3}\sGMT/;

/**
 * URL matching.
 *
 * From this Gist by Diego Perini:
 * https://gist.github.com/dperini/729294
 */
export const Url: RegExp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
