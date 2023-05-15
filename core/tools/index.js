const log = require("electron-log");

const isPrimeMethod1 = (n) => {
  if (n <= 1) return false;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const testingNumbers = (input) => {
  let n = parseInt(input);
  let isPrime = false;

  if (isPrimeMethod1(n)) {
    isPrime = true;
  }

  let factors = [];
  let iterations1 = 0;
  let iterations2 = 0;

  for (let i = 2; i <= n; i++) {
    iterations1++;

    while (n % i === 0) {
      factors.push(i);
      n /= i;
      iterations2++;
    }
  }
  let unique = Array.from(new Set(factors));
  log.info("Done");
  return {
    isPrime: isPrime,
    factors: unique.join(", "),
    firstMethod: iterations1,
    secondMethod: iterations2,
  };
};

module.exports = { testingNumbers };
