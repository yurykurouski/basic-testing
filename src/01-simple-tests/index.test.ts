import { simpleCalculator, Action } from './index';

const a = 1;
const b = 2;

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const expected = 3;

    const actual = simpleCalculator({ a, b, action: Action.Add });

    expect(actual).toEqual(expected);
  });

  test('should subtract two numbers', () => {
    const expected = -1;

    const actual = simpleCalculator({ a, b, action: Action.Subtract });

    expect(actual).toEqual(expected);
  });

  test('should multiply two numbers', () => {
    const expected = 2;

    const actual = simpleCalculator({ a, b, action: Action.Multiply });

    expect(actual).toEqual(expected);
  });

  test('should divide two numbers', () => {
    const expected = 0.5;

    const actual = simpleCalculator({ a, b, action: Action.Divide });

    expect(actual).toEqual(expected);
  });

  test('should exponentiate two numbers', () => {
    const expected = 1;

    const actual = simpleCalculator({ a, b, action: Action.Exponentiate });

    expect(actual).toEqual(expected);
  });

  test('should return null for invalid action', () => {
    const expected = null;

    const actual = simpleCalculator({ a, b, action: 'Invalid action' });

    expect(actual).toEqual(expected);
  });

  test('should return null for invalid arguments', () => {
    const expected = null;

    const actual = simpleCalculator({
      a: 'invalid',
      b,
      action: Action.Exponentiate,
    });

    expect(actual).toEqual(expected);
  });
});
