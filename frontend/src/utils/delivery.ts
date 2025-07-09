const TOKEN_KEY = 'delivery';

export const deliveryLS = {
  set(input: DeliveryInput): void {
    const string = JSON.stringify(input)
    localStorage.setItem(TOKEN_KEY, string);
  },

  get(): Maybe<DeliveryInput> {
    const string = localStorage.getItem(TOKEN_KEY);
    if(!string) return undefined
    return JSON.parse(string)
  },

  remove(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
};