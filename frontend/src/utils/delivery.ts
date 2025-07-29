import { FormType } from "@/components/Delivery";

const TOKEN_KEY = 'delivery';

export const deliveryLS = {
  set(input: FormType): void {
    const string = JSON.stringify(input)
    localStorage.setItem(TOKEN_KEY, string);
  },

  get(): Maybe<FormType> {
    const string = localStorage.getItem(TOKEN_KEY);
    if(!string) return undefined
    return JSON.parse(string)
  },

  remove(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
};