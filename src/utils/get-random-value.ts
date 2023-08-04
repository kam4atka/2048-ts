import { getRandomInt } from './get-random-int';

export function getRandomValue<Document>(array: Document[]) {
  return array[getRandomInt(0, array.length - 1)];
}
