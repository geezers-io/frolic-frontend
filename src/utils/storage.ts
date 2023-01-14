const storageLike = {
  length: 0,
  clear() {},
  getItem(key: string) {
    return null;
  },
  key(index: number) {},
  removeItem(key: string) {},
  setItem(key: string, value: string) {},
};

export const safetySessionStorage = typeof window !== 'undefined' ? window.sessionStorage : storageLike;
export const safetyLocalStorage = typeof window !== 'undefined' ? window.localStorage : storageLike;
