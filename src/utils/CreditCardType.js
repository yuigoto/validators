/**
 * Utils/CreditCardType
 * ----------------------------------------------------------------------
 * Contains a list of credit card flag names, slugs and patterns used for 
 * validation.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export const CreditCardType = {
  AMEX: {
    name: "American Express",
    slug: "amex",
    pattern: /^3[47]\d{13}$/
  },
  DINERS: {
    name: "Diners Club",
    slug: "diners",
    pattern: /^3(?:0[0-5]|[68]\d)\d{11}$/
  },
  ELO: {
    name: "Elo",
    slug: "elo",
    pattern: /(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9]))|(509([0-9][0-9][0-9])))/
  },
  AURA: {
    name: "Aura",
    slug: "aura",
    pattern: /^50\d{14}/
  },
  HIPERCARD: {
    name: "Hipercard",
    slug: "hipercard",
    pattern: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/
  },
  MASTERCARD: {
    name: "Mastercard",
    slug: "master",
    pattern: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/
  },
  VISA: {
    name: "Visa",
    slug: "visa",
    pattern: /^4\d{12}(?:\d{3})?$/
  },
  DISCOVER: {
    name: "Discover",
    slug: "discover",
    pattern: /^(6011\d{12,15}|622\d{13,16}|64\d{14,17}|65\d{14,17})/
  },
  JCB: {
    name: "JCB",
    slug: "jcb",
    pattern: /^35\d{14,17}/
  }
};
