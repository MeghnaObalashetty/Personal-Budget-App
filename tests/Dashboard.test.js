import { getExceededValue } from '../src/Utils';

// Test when the expense exceeds the total budget
test('Calculate exceeded value when expense is more than budget', () => {
  const totalBudget = 200;
  const expense = 300;

  // Calculate the exceeded value
  const result = getExceededValue(totalBudget, expense);

  // Expect the exceeded value to be 100 (expense - totalBudget)
  expect(result).toBe(100);
});

// Test when the expense does not exceed the total budget
test('Calculate exceeded value when expense is within the budget', () => {
  const totalBudget = 300;
  const expense = 200;

  // Calculate the exceeded value
  const result = getExceededValue(totalBudget, expense);

  // Expect the exceeded value to be 0 (expense - totalBudget)
  expect(result).toBe(0);
});

// Test when the expense equals the total budget
test('Calculate exceeded value when expense equals the budget', () => {
  const totalBudget = 500;
  const expense = 500;

  // Calculate the exceeded value
  const result = getExceededValue(totalBudget, expense);

  // Expect the exceeded value to be 0 (expense - totalBudget)
  expect(result).toBe(0);
});
