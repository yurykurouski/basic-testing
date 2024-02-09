import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.useFakeTimers();

const pathMock = 'test';
const config = {
  baseURL: 'https://jsonplaceholder.typicode.com',
};

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const get = jest.fn().mockResolvedValue({ data: 'test' });
    (axios.create as jest.Mock).mockImplementationOnce(() => ({
      get,
    }));

    await throttledGetDataFromApi(pathMock);

    expect(axios.create).toHaveBeenCalledWith(config);
  });

  test('should perform request to correct provided url', async () => {
    const get = jest.fn().mockResolvedValue({ data: 'test' });
    (axios.create as jest.Mock).mockImplementationOnce(() => ({
      get,
    }));

    await throttledGetDataFromApi(pathMock);
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(get).toHaveBeenCalledWith(pathMock);
  });

  test('should return response data', async () => {
    const expected = 'test';

    const get = jest.fn().mockResolvedValue({ data: expected });
    (axios.create as jest.Mock).mockImplementationOnce(() => ({
      get,
    }));

    const actual = await throttledGetDataFromApi(pathMock);
    expect(actual).toEqual(expected);
  });
});
