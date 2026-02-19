import type { InputItem } from './item.js';

export function parserInputItem(value: unknown): InputItem | null {
  if (typeof value === 'object' && value) {
    const object = value;
    if ('name' in object && typeof object.name === 'string') {
      return { name: object.name };
    }
  }

  return null;
}
