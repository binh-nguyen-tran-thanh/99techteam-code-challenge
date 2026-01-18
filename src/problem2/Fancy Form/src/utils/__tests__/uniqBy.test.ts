import { uniqBy } from '../uniqBy';

describe('uniqBy', () => {
  it('should remove duplicates based on key function', () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 1 }];
    expect(uniqBy(input, (i) => i.id.toString())).toEqual([
      { id: 1 },
      { id: 2 }
    ]);
  });

  it('should handle empty array', () => {
    expect(uniqBy([], (i) => i)).toEqual([]);
  });

  it('should keep first occurrence when duplicates exist', () => {
    const input = [
      { id: 1, name: 'first' },
      { id: 1, name: 'second' }
    ];
    expect(uniqBy(input, (i) => i.id.toString())).toEqual([
      { id: 1, name: 'first' }
    ]);
  });

  it('should handle single element array', () => {
    const input = [{ id: 1 }];
    expect(uniqBy(input, (i) => i.id.toString())).toEqual([{ id: 1 }]);
  });
});
