import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

const mockTimeValue = 100;
const pathMock = 'test/test';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const timerCallbackMock = jest.fn();

    doStuffByTimeout(timerCallbackMock, mockTimeValue);

    expect(timeoutSpy).toHaveBeenCalledWith(timerCallbackMock, mockTimeValue);
  });

  test('should call callback only after timeout', () => {
    const timerCallbackMock = jest.fn();

    doStuffByTimeout(timerCallbackMock, mockTimeValue);

    expect(timerCallbackMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(mockTimeValue);
    expect(timerCallbackMock).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setInterval');
    const intervalCallbackMock = jest.fn();

    doStuffByInterval(intervalCallbackMock, mockTimeValue);
    expect(timeoutSpy).toHaveBeenCalledWith(
      intervalCallbackMock,
      mockTimeValue,
    );
  });

  test('should call callback multiple times after multiple intervals', () => {
    const intervalCallbackMock = jest.fn();
    const callCount = 2;

    doStuffByInterval(intervalCallbackMock, mockTimeValue);

    expect(intervalCallbackMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(mockTimeValue * callCount);
    expect(intervalCallbackMock).toHaveBeenCalledTimes(callCount);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathMock);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathMock);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    const actual = await readFileAsynchronously(pathMock);

    expect(actual).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const expected = 'test';

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValueOnce(expected);

    const actual = await readFileAsynchronously(pathMock);

    expect(actual).toBe(expected);
  });
});
