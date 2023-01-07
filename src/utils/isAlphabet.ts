import { isNil } from 'lodash/lang';

const ASCII = {
  A: 'A'.charCodeAt(0),
  Z: 'Z'.charCodeAt(0),
  a: 'a'.charCodeAt(0),
  z: 'z'.charCodeAt(0),
};

export function isAlphabet(char) {
  if (isNil(char) || typeof char.charCodeAt !== 'function') {
    return false;
  }

  const ascii = char.charCodeAt(0);
  const isUpperCase = ascii >= ASCII.A && ascii <= ASCII.Z;
  const isLowerCase = ascii >= ASCII.a && ascii <= ASCII.z;

  return isLowerCase || isUpperCase;
}
