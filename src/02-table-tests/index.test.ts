import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 1, b: 2, action: 'Invalid action', expected: null },
  { a: 'invalid', b: 2, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    '$a $action $b should be equal to $expected',
    ({ a, b, action, expected }) => {
      expect(expected).toEqual(simpleCalculator({ a, b, action }));
    },
  );
});
