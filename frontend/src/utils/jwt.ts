const TOKEN_KEY = 'jwt';

function getCookieSecurity(): string {
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    return '; Secure';
  }
  return '';
}

export const jwt = {
  set(token: string): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    document.cookie = `${TOKEN_KEY}=${token}; path=/; expires=${expires.toUTCString()}; SameSite=Strict${getCookieSecurity()}`;
  },

  get(): string | null {
    const match = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${TOKEN_KEY}=`));

    return match ? match.split('=')[1] : null;
  },

  remove(): void {
    document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict${getCookieSecurity()}`;
  }
};