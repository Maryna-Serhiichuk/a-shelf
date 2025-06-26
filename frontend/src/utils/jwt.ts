const TOKEN_KEY = 'jwt';

export const jwt = {
  set(token: string): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // 7 днів

    document.cookie = `${TOKEN_KEY}=${token}; path=/; expires=${expires.toUTCString()}; SameSite=Strict; Secure`;
  },

  get(): string | null {
    const match = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${TOKEN_KEY}=`));

    return match ? match.split('=')[1] : null;
  },

  remove(): void {
    document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure`;
  }
};