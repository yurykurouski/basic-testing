import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const expected = 5;

    await expect(resolveValue(5)).resolves.toEqual(expected);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const mockErrMsg = 'error message';

    expect(() => throwError(mockErrMsg)).toThrow(mockErrMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    const expectedMessage = 'Oops';

    expect(() => throwError()).toThrow(expectedMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrow(
      new MyAwesomeError(),
    );
  });
});
