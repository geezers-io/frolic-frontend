import debug from 'debug';

declare global {
  interface Window {
    log: {
      error: debug.Debugger | Console.log;
      warn: debug.Debugger | Console.log;
      info: debug.Debugger | Console.log;
      debug: debug.Debugger | Console.log;
      fatal: debug.Debugger | Console.log;
    };
    debugLevel: number;
    __DEV__: boolean;
  }

  const log: {
    error: debug.Debugger;
    warn: debug.Debugger;
    info: debug.Debugger;
    debug: debug.Debugger;
    fatal: debug.Debugger;
  };
}
