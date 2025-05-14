import { STORAGE_KEY } from '@/constants/storage';

/**
 * Token
 */
export default class {
  get value(): string {
    return localStorage.getItem(STORAGE_KEY.TOKEN) || '';
  }

  setValue(token: string) {
    localStorage.setItem(STORAGE_KEY.TOKEN, token);
  }

  clear() {
    localStorage.removeItem(STORAGE_KEY.TOKEN);
  }
}
