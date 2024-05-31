import { describe, expect, it, test } from 'vitest';
import type { ITree } from '../treeClass.ts';
import TreeStore from '../treeClass.ts';

describe('TreeStore', () => {
  const items: ITree[] = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
  ];

  const ts = new TreeStore(items);

  it('Тест getAll()', () => {
    expect(ts.getAll()).toEqual(items);
  });

  test.each([
    [7, { id: 7, parent: 4, type: null }],
    [4, { id: 4, parent: 2, type: 'test' }],
    [2, { id: 2, parent: 1, type: 'test' }],
    [1, { id: 1, parent: 'root', type: undefined }],
    [9, undefined],
  ])('Тест getItem(%i) -> %o', (id, result) => {
    expect(ts.getItem(id)).toEqual(result);
  });

  test.each([
    [
      4,
      [
        { id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null },
      ],
    ],
    [
      2,
      [
        { id: 4, parent: 2, type: 'test' },
        { id: 5, parent: 2, type: 'test' },
        { id: 6, parent: 2, type: 'test' },
      ],
    ],
    [
      1,
      [
        { id: 2, parent: 1, type: 'test' },
        { id: 3, parent: 1, type: 'test' },
      ],
    ],
    [8, []],
  ])('Тест getChildren(%i) -> %o', (id, result) => {
    expect(ts.getChildren(id)).toEqual(result);
  });

  test.each([
    [
      2,
      [
        { id: 4, parent: 2, type: 'test' },
        { id: 5, parent: 2, type: 'test' },
        { id: 6, parent: 2, type: 'test' },
        { id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null },
      ],
    ],
    [
      1,
      [
        { id: 2, parent: 1, type: 'test' },
        { id: 3, parent: 1, type: 'test' },
        { id: 4, parent: 2, type: 'test' },
        { id: 5, parent: 2, type: 'test' },
        { id: 6, parent: 2, type: 'test' },
        { id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null },
      ],
    ],
    [8, []],
  ])('Тест getAllChildren(%i) -> %o', (id, result) => {
    expect(ts.getAllChildren(id)).toEqual(result);
  });

  test.each([
    [
      2,
      [
        { id: 2, parent: 1, type: 'test' },
        { id: 1, parent: 'root' },
      ],
    ],
    [1, [{ id: 1, parent: 'root' }]],
    [
      7,
      [
        { id: 7, parent: 4, type: null },
        { id: 4, parent: 2, type: 'test' },
        { id: 2, parent: 1, type: 'test' },
        { id: 1, parent: 'root' },
      ],
    ],
  ])('Тест getAllParents(%i) -> %o', (id, result) => {
    expect(ts.getAllParents(id)).toEqual(result);
  });
});
