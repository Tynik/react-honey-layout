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
    children?: Item[];
  };

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
        depthLevel: 0,
      },
      {
        name: 'Pear',
        depthLevel: 1,
      },
      {
        name: 'Banana',
        depthLevel: 1,
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
        depthLevel: 0,
      },
      {
        name: 'Pear',
        depthLevel: 1,
      },
      {
        name: 'Banana',
        depthLevel: 2,
      },
      {
        name: 'Mango',
        depthLevel: 3,
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
        depthLevel: 0,
      },
      {
        name: 'Banana',
        depthLevel: 0,
      },
    ]);
  });

  it('should handle items with undefined children', () => {
    const items: Item[] = [
      {
        name: 'Apple',
        children: undefined,
      },
      {
        name: 'Banana',
      },
    ];

    const flatList = flattenNestedList(items, 'children');

    expect(flatList).toStrictEqual([
      {
        name: 'Apple',
        depthLevel: 0,
      },
      {
        name: 'Banana',
        depthLevel: 0,
      },
    ]);
  });
});