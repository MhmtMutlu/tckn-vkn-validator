/**
 * T.C. Kimlik No doğrulama fonksiyonu.
 * @param {string} tckn - T.C. Kimlik Numarası (11 haneli).
 * @returns {boolean} - Doğrulama sonucu (true/false).
 */
function validateTckn(tckn: string): boolean {
  if (!/^\d{11}$/.test(tckn) || tckn[0] === "0") {
    return false;
  }

  const digits: number[] = tckn.split("").map(Number);
  const sumOfFirst10: number = digits
    .slice(0, 10)
    .reduce((sum, digit) => sum + digit, 0);
  if (sumOfFirst10 % 10 !== digits[10]) {
    return false;
  }

  const oddSum: number =
    digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum: number = digits[1] + digits[3] + digits[5] + digits[7];
  if ((oddSum * 7 - evenSum) % 10 !== digits[9]) {
    return false;
  }

  return true;
}

/**
 * Vergi kimlik numarası doğrulama fonksiyonu.
 * @param {string} vkn - Vergi Kimlik Numarası (10 haneli).
 * @returns {boolean} - Doğrulama sonucu (true/false).
 */
function validateVkn(vkn: string): boolean {
  if (vkn.length !== 10) {
    return false;
  }

  let stepOfVkn: number[] = [];
  const lastDigit = Number(vkn.charAt(9));
  for (let i = 0; i < 9; i++) {
    const tmp: number = (Number(vkn.charAt(i)) + (9 - i)) % 10;
    stepOfVkn[i] = (tmp * 2 ** (9 - i)) % 9;
    if (tmp !== 0 && stepOfVkn[i] === 0) stepOfVkn[i] = 9;
  }
  const sum: number = stepOfVkn.reduce((a, b) => a + b, 0) % 10;
  return (10 - (sum % 10)) % 10 === lastDigit;
}

export { validateTckn, validateVkn };
