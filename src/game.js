import _ from 'lodash';

// Change the rules of the game here
export const NUM_GUESSES = 8;
export const SECRET_LEN = 4;

// Generate a SECRET_LEN unique digit long sequence
export function generateSecret() {
  let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let str = "";
  for (let i = 0; i < SECRET_LEN; i++) {
    digits = _.shuffle(digits);
    str += digits.shift();
  }
  return str;
}

// Given a string, return the unique digits in it
// If there are duplicates, keep the first instance only
export function uniqDigits(str) {
  let result = "";
  for (const c of str) {
    if (c >= '0' && c <= '9' && !result.includes(c)) {
      result += c;
    }
  }
  return result;
}

// Given a guess and the secret number, give the result
// Format: A(# Correctly Positioned Digits)B(# Incorrectly Positiond Digits)
export function resultOf(g, r) {
  let a = 0;
  let b = 0;

  for (let i = 0; i < r.length; i++)  {
    if (g[i] === r[i]) a++;
    else if (r.includes(g[i])) b++;
  }

  return "A" + a + "B" + b;
}