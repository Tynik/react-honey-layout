import { convertHexToHexWithAlpha, flattenNestedList } from '../utils';

describe('[utils]: converting hex to hex with alpha', () => {
  it('should convert short hex without hash and alpha 0 to hex with alpha', () => {
    expect(convertHexToHexWithAlpha('FFF', 0)).toBe('#FFFFFF00');
  });

  it('should convert short hex with hash and alpha 0 to hex with alpha', () => {
    expect(convertHexToHexWithAlpha('#FFF', 0)).toBe('#FFFFFF00');
  });

  it('should convert short hex with hash and alpha 1 to hex with alpha', () => {
    expect(convertHexToHexWithAlpha('#FFF', 1)).toBe('#FFFFFFFF');
  });

  it('should convert full hex with alpha 0 to hex with alpha', () => {
    expect(convertHexToHexWithAlpha('#FFFFFF', 0)).toBe('#FFFFFF00');
  });

  it('should convert full hex with alpha 0.7 to hex with alpha', () => {
    expect(convertHexToHexWithAlpha('#FFFFFF', 0.7)).toBe('#FFFFFFB3');
  });

  it('should convert full hex with alpha 1 to hex with alpha', () => {
    expect(convertHexToHexWithAlpha('#FFFFFF', 1)).toBe('#FFFFFFFF');
  });

  it('should convert minimum 3-char hex with alpha 0 to hex with alpha', () => {
    expect(convertHexToHexWithAlpha('#000', 0)).toBe('#00000000');
  });

  it('should convert maximum 3-char hex with alpha 1 to hex with alpha', () => {
    expect(convertHexToHexWithAlpha('#FFF', 1)).toBe('#FFFFFFFF');
  });

  it('should convert minimum 6-char hex with alpha 0 to hex with alpha', () => {
    expect(convertHexToHexWithAlpha('#000000', 0)).toBe('#00000000');
  });

  it('should convert maximum 6-char hex with alpha 1 to hex with alpha', () => {
    expect(convertHexToHexWithAlpha('#FFFFFF', 1)).toBe('#FFFFFFFF');
  });

  it('should throw error for invalid hex code', () => {
    expect(() => convertHexToHexWithAlpha('#ZZZ', 0)).toThrow();
  });

  it('should throw error for alpha value less than 0', () => {
    expect(() => convertHexToHexWithAlpha('#FFF', -0.1)).toThrow();
  });

  it('should throw error for alpha value greater than 1', () => {
    expect(() => convertHexToHexWithAlpha('#FFF', 1.1)).toThrow();
  });
});

describe('[utils]: convert nested list to flat list', () => {
  type Item = {
    name: string;
    children?: Item[] | null;
  };

  it('should handle undefined input list', () => {
    const items: Item[] | undefined = undefined;

    const flatList = flattenNestedList(items, 'children');

    expect(flatList).toStrictEqual([]);
  });

  it('should handle empty input list', () => {
    const items: Item[] = [];

    const flatList = flattenNestedList(items, 'children');

    expect(flatList).toStrictEqual([]);
  });

  it('should flatten a nested list excluding the nested key', () => {
    const items: Item[] = [
      {
        name: 'Apple',
        children: [
          {
            name: 'Pear',
            children: [],
          },
          {
            name: 'Banana',
            children: [],
          },
        ],
      },
    ];

    const flatList = flattenNestedList(items, 'children');

    expect(flatList).toStrictEqual([
      {
        name: 'Apple',
        parentIndex: undefined,
        depthLevel: 0,
        totalNestedItems: 2,
      },
      {
        name: 'Pear',
        parentIndex: 0,
        depthLevel: 1,
        totalNestedItems: 0,
      },
      {
        name: 'Banana',
        parentIndex: 0,
        depthLevel: 1,
        totalNestedItems: 0,
      },
    ]);
  });

  it('should handle deeply nested lists', () => {
    const items: Item[] = [
      {
        name: 'Apple',
        children: [
          {
            name: 'Pear',
            children: [
              {
                name: 'Banana',
                children: [
                  {
                    name: 'Mango',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const flatList = flattenNestedList(items, 'children');

    expect(flatList).toStrictEqual([
      {
        name: 'Apple',
        parentIndex: undefined,
        depthLevel: 0,
        totalNestedItems: 1,
      },
      {
        name: 'Pear',
        parentIndex: 0,
        depthLevel: 1,
        totalNestedItems: 1,
      },
      {
        name: 'Banana',
        parentIndex: 1,
        depthLevel: 2,
        totalNestedItems: 1,
      },
      {
        name: 'Mango',
        parentIndex: 2,
        depthLevel: 3,
        totalNestedItems: 0,
      },
    ]);
  });

  it('should handle items without children', () => {
    const items: Item[] = [
      {
        name: 'Apple',
      },
      {
        name: 'Banana',
      },
    ];

    const flatList = flattenNestedList(items, 'children');

    expect(flatList).toStrictEqual([
      {
        name: 'Apple',
        parentIndex: undefined,
        depthLevel: 0,
        totalNestedItems: 0,
      },
      {
        name: 'Banana',
        parentIndex: undefined,
        depthLevel: 0,
        totalNestedItems: 0,
      },
    ]);
  });

  it('should handle items with undefined or null children', () => {
    const items: Item[] = [
      {
        name: 'Apple',
        children: undefined,
      },
      {
        name: 'Banana',
        children: null,
      },
    ];

    const flatList = flattenNestedList(items, 'children');

    expect(flatList).toStrictEqual([
      {
        name: 'Apple',
        parentIndex: undefined,
        depthLevel: 0,
        totalNestedItems: 0,
      },
      {
        name: 'Banana',
        parentIndex: undefined,
        depthLevel: 0,
        totalNestedItems: 0,
      },
    ]);
  });
});
