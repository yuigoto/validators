import { CreditCardCollection } from "reviuew/interface/CreditCardCollection";
import {HashMap} from "reviuew/type/HashMap";
import {CreditCardItem} from "reviuew/type/CreditCardItem";

/**
 * core/CreditCardList
 * ----------------------------------------------------------------------
 * Provides a list of credit card flag names, slugs and `RegExp` patterns 
 * used to validate, match and mask credit card numbers.
 * 
 * Does not aim to provide an absolute list.
 * 
 * @since 0.6.0
 */
export const CreditCardList: HashMap<CreditCardItem> = {
  AMEX: {
    name: "American Express",
    slug: "amex",
    pattern: /^3[47]\d{13}$/,
    groupPattern: /(\d{1,4})(-|\s)?(\d{1,6})?(-|\s)?(\d{1,5})?/,
    mask: /(\d{1,4})(-|\s)?([Xx*]{1,6})?-?([Xx*]{1,5})?/
  },
  DINERS: {
    name: "Diners Club",
    slug: "diners",
    pattern: /^3(?:0[0-5]|[68]\d)\d{11}$/,
    groupPattern: /(\d{1,4})-?(\d{1,6})?-?(\d{1,4})?/,
    mask: /(\d{1,4})(-|\s)?([Xx*]{1,6})?(-|\s)?([Xx*]{1,4})?/
  },
  ELO: {
    name: "Elo",
    slug: "elo",
    pattern: /(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9]))|(509([0-9][0-9][0-9])))/,
    groupPattern: /(\d{1,4})(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,3})?/,
    mask: /(\d{1,4})(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,3})?/
  },
  AURA: {
    name: "Aura",
    slug: "aura",
    pattern: /^50\d{14}/,
    groupPattern: /(\d{1,4})(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,3})?/,
    mask: /(\d{1,4})(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,3})?/
  },
  HIPERCARD: {
    name: "Hipercard",
    slug: "hipercard",
    pattern: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
    groupPattern: /(\d{1,4})(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,3})?/,
    mask: /(\d{1,4})(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,3})?/
  },
  MASTERCARD: {
    name: "Mastercard",
    slug: "master",
    pattern: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
    groupPattern: /(\d{1,4})(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,3})?/,
    mask: /(\d{1,4})(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,3})?/
  },
  VISA: {
    name: "Visa",
    slug: "visa",
    pattern: /^4\d{12}(?:\d{3})?$/,
    groupPattern: /(\d{1,4})(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,3})?/,
    mask: /(\d{1,4})(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,3})?/
  },
  DISCOVER: {
    name: "Discover",
    slug: "discover",
    pattern: /^(6011\d{12,15}|622\d{13,16}|64\d{14,17}|65\d{14,17})/,
    groupPattern: /(\d{1,4})(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,3})?/,
    mask: /(\d{1,4})(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,3})?/
  },
  JCB: {
    name: "JCB",
    slug: "jcb",
    pattern: /^35\d{14,17}/,
    groupPattern: /(\d{1,4})(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,4})?(-|\s)?(\d{1,3})?/,
    mask: /(\d{1,4})(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,4})?(-|\s)?([Xx*]{1,3})?/
  }
};
