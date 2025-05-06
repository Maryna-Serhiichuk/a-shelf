const TOKEN_KEY = 'jwt';

export const jwt = {
  set(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  get(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  remove(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
};