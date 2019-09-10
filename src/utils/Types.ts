export type CreditCardItem = {
  name: string,
  slug: string,
  pattern: RegExp 
};

export type CreditCardCollection = {
  [key: string]: CreditCardItem
};
