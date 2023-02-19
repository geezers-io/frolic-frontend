import { isAlphabet } from 'utils/isAlphabet';

const alphabetToColorDict: Record<string, string> = {
  unknown: '#7F8C8D',
  a: '#093145',
  b: '#0C374D',
  c: '#0D3D56',
  d: '#3C6478',
  e: '#107896',
  f: '#1287A8',
  g: '#1496BB',
  h: '#43ABC9',
  i: '#2E8857',
  j: '#3F704D',
  k: '#829356',
  l: '#93A661',
  m: '#A3B86C',
  n: '#B5C689',
  o: '#C49102',
  p: '#BCA136',
  q: '#D3B53D',
  r: '#EBC944',
  s: '#C2571A',
  t: '#DA621E',
  u: '#F26D21',
  v: '#F58B4C',
  w: '#9A2617',
  x: '#AD2A1A',
  y: '#C02F1D',
  z: '#CD594A',
};

export function convertAlphabetToColor(char: string) {
  if (!isAlphabet(char)) {
    return alphabetToColorDict.unknown;
  }

  return alphabetToColorDict[char.toLowerCase()] ?? alphabetToColorDict.unknown;
}
