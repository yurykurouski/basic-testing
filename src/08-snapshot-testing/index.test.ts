import { generateLinkedList } from './index';

const testData = [1];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const expected = {
      value: 1,
      next: { value: null, next: null },
    };
    const actual = generateLinkedList(testData);

    expect(actual).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const actual = generateLinkedList(testData);

    expect(actual).toMatchSnapshot();
  });
});
