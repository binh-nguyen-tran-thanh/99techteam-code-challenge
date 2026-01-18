export type TokenPriceItemResponse = {
  currency: string;
  price: number;
  date: string;
};

export type TokenPriceResponse = TokenPriceItemResponse[];

export type TokenOption = {
  iconUrl: string;
  label: string;
  value: string;
};
