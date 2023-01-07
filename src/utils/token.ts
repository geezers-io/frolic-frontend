export const token = {
  accessToken: {
    key: 'ACCESS_TOKEN',

    set(v) {
      sessionStorage.setItem(this.key, v);
    },

    get() {
      return sessionStorage.getItem(this.key);
    },

    delete() {
      sessionStorage.removeItem(this.key);
    },
  },

  refreshToken: {
    key: 'REFRESH_TOKEN',

    set(v, isRemember) {
      if (isRemember) {
        localStorage.setItem(this.key, v);
      } else {
        sessionStorage.setItem(this.key, v);
      }
    },

    get() {
      return localStorage.getItem(this.key) ?? sessionStorage.getItem(this.key);
    },

    delete() {
      localStorage.removeItem(this.key);
      sessionStorage.removeItem(this.key);
    },
  },

  get() {
    return {
      accessToken: this.accessToken.get(),
      refreshToken: this.refreshToken.get(),
    };
  },

  clear() {
    this.accessToken.delete();
    this.refreshToken.delete();
  },
};
