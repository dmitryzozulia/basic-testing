// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'node:fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    expect(callback).not.toHaveBeenCalled();
    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByInterval(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByInterval(callback, timeout);
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'imdontexist.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(null);
  });
  jest.mock('fs/promises');
  test('should return file content if file exists', async () => {
    const content = 'file content';

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValueOnce(content);

    const result = await readFileAsynchronously('test.txt');

    expect(result).toBe(content);
  });
});
