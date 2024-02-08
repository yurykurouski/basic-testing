import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

const mockInitialBalance = 100;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(mockInitialBalance);

    const result = bankAccount.getBalance();

    expect(result).toEqual(mockInitialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(mockInitialBalance);

    expect(() => bankAccount.withdraw(110)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(mockInitialBalance);
    const secondBankAccount = getBankAccount(mockInitialBalance);

    expect(() => bankAccount.transfer(200, secondBankAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(mockInitialBalance);

    expect(() => bankAccount.transfer(50, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(mockInitialBalance);

    const expectedBalance = mockInitialBalance + 10;

    bankAccount.deposit(10);

    expect(bankAccount.getBalance()).toEqual(expectedBalance);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(mockInitialBalance);

    const expectedBalance = mockInitialBalance - 10;

    bankAccount.withdraw(10);

    expect(bankAccount.getBalance()).toEqual(expectedBalance);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(mockInitialBalance);
    const anotherBankAccount = getBankAccount(mockInitialBalance);

    const mockOperationValue = 10;

    bankAccount.transfer(mockOperationValue, anotherBankAccount);

    expect(bankAccount.getBalance()).toEqual(
      mockInitialBalance - mockOperationValue,
    );
    expect(anotherBankAccount.getBalance()).toEqual(
      mockInitialBalance + mockOperationValue,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(mockInitialBalance);
    const expected = 1;

    lodash.random = jest.fn().mockImplementationOnce(() => expected);

    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(expected);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(mockInitialBalance);
    const expected = 1;

    bankAccount.fetchBalance = jest.fn().mockImplementationOnce(() => expected);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(expected);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(mockInitialBalance);

    bankAccount.fetchBalance = jest.fn().mockImplementationOnce(() => null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
