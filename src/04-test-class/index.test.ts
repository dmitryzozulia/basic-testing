// Uncomment the code below and write your tests
import { getBankAccount } from '.';
import {
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const money = 100;
    const account = getBankAccount(money);
    expect(() => account.withdraw(money + 50)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const money = 100;
    const account = getBankAccount(money);
    const accountTwo = getBankAccount(money);
    expect(() => account.transfer(money + 50, accountTwo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const money = 100;
    const account = getBankAccount(money);
    expect(() => account.transfer(money, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const money = 100;
    const account = getBankAccount(money);
    const depositAmount = 50;
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(money + depositAmount);
  });

  test('should withdraw money', () => {
    const money = 100;
    const account = getBankAccount(money);
    const withdraw = 50;
    expect(account.withdraw(withdraw).getBalance()).toBe(money - withdraw);
  });

  test('should transfer money', () => {
    const money = 100;
    const account = getBankAccount(money);
    const accountTwo = getBankAccount(money);
    account.transfer(money - 50, accountTwo);
    expect(accountTwo.getBalance()).toBe(money + 50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const money = 100;
    const account = getBankAccount(money);
    const balance = await account.getBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
