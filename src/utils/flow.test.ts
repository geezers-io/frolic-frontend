import { flow } from 'utils/flow';

type TestGroup<T> = {
  input: T;
  functions: ((...args: T[]) => T)[];
  expected: T;
};

const numberTest: TestGroup<number> = {
  input: 0,
  functions: [
    function add(num: number) {
      return num + 10;
    },
    function sum(num: number) {
      return num - 5;
    },
  ],
  expected: 5,
};

interface Obj {
  a: number;
  b?: number;
}
const objTest: TestGroup<Obj> = {
  input: {
    a: 1,
    b: 2,
  },
  functions: [
    function replace(obj: Obj) {
      obj.a = 2;
      return obj;
    },
    function omit(obj: Obj) {
      delete obj.b;
      return obj;
    },
  ],
  expected: {
    a: 2,
  },
};

describe('utils/flow', () => {
  it('number test', () => {
    const { functions, input, expected } = numberTest;
    const flowed = flow(functions);
    expect(flowed(input)).toEqual(expected);
  });

  it('obj test', () => {
    const { functions, input, expected } = objTest;
    const flowed = flow(functions);
    expect(flowed(input)).toMatchObject(expected);
  });
});
