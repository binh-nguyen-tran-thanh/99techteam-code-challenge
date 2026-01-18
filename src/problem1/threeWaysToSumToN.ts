// Mathematical formula solution
// O(1) time complexity
export const sumToNFirstSolution = (n: number): number => {
  if (n < 0 || Number.isNaN(n)) return 0;
  return (n * (n + 1)) / 2;
};

// Iterative solution
// O(n) time complexity
export const sumToNSecondSolution = (n: number): number => {
  if (n < 0 || Number.isNaN(n)) return 0;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Can increase this number depend on the machine
const maxItemPerProcess = 100;

// Uses recursion with batch processing to prevent stack overflow
// Time Complexity: O(n)
// - The outer loop runs processNeeded times: O(n / maxItemPerProcess)
// - Each sumHelper call processes maxItemPerProcess items recursively: O(maxItemPerProcess)
// - Total: O((n / maxItemPerProcess) * maxItemPerProcess) = O(n)
// - Final sumHelper call: O(n % maxItemPerProcess)
// - Overall: O(n)
//
// Space Complexity: O(maxItemPerProcess)
// - Maximum recursion depth is limited to maxItemPerProcess
// - Each recursive call adds a frame to the call stack
// - Space is O(maxItemPerProcess) which is O(1) since maxItemPerProcess is a constant
export const sumToNThirdSolution = (n: number): number => {
  if (n < 0 || Number.isNaN(n)) return 0;

  const sumHelper = (n: number, excludeValue: number = 0): number => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (n === excludeValue) return 0;
    return sumHelper(n - 1, excludeValue) + n;
  };

  const processNeeded = Math.floor(n / maxItemPerProcess);

  let sum = 0;
  if (processNeeded > 0) {
    for (let i = 1; i <= processNeeded; i++) {
      sum += sumHelper(maxItemPerProcess * i, maxItemPerProcess * (i - 1));
    }
  }

  return sum + sumHelper(n, maxItemPerProcess * processNeeded);
};
