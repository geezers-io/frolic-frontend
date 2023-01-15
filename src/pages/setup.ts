import debug from 'debug';

if (typeof window !== 'undefined') {
  window.__DEV__ = process.env.NODE_ENV === 'development';

  if (!localStorage.debug) {
    localStorage.debug = process.env.NODE_ENV === 'development' ? 'app:*' : 'app:error,app:fatal,app:info';
  }

  if (!window.log) {
    const consoleBonded = console.log.bind(console);

    if (process.env.NODE_ENV === 'test') {
      window.log = {
        error: consoleBonded,
        warn: consoleBonded,
        info: consoleBonded,
        debug: consoleBonded,
        fatal: consoleBonded,
      };
    } else {
      window.log = {
        error: debug('app:error'),
        warn: debug('app:warn'),
        info: debug('app:info'),
        debug: debug('app:debug'),
        fatal: debug('app:fatal'),
      };

      Object.values(window.log).forEach((_log) => (_log.log = consoleBonded));
    }
  }
}
