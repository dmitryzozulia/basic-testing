import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Add });
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Subtract });
    expect(result).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Multiply });
    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 4, b: 2, action: Action.Divide });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: 'error',
    });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const resultOne = simpleCalculator({
      a: '2',
      b: 3,
      action: Action.Add,
    });
    const resultTwo = simpleCalculator({
      a: 2,
      b: null,
      action: Action.Add,
    });
    expect(resultOne).toBe(null);
    expect(resultTwo).toBe(null);
  });
});
