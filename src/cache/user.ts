import { STORAGE_KEY } from "@/constants/storage";
import type { CacheUserInfo } from "@/typings/user";

export default class {
  get value(): CacheUserInfo {
    try {
      const storedValue = localStorage.getItem(STORAGE_KEY.USER);
      return storedValue ? JSON.parse(storedValue) : ({} as CacheUserInfo);
    } catch (error) {
      console.error("Failed to parse user cache:", error);
      return {} as CacheUserInfo;
    }
  }

  setValue(info: CacheUserInfo) {
    try {
      const oldInfo = this.value;
      const mergedInfo = { ...oldInfo, ...info };
      localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(mergedInfo));
    } catch (error) {
      console.error("Failed to save user cache:", error);
    }
  }

  clear() {
    this.setValue({} as CacheUserInfo);
  }
}
