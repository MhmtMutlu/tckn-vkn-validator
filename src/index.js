import fetch from "node-fetch";

/**
 * T.C. Kimlik No'nun NVI'den doğrulama fonksiyonu.
 * @param {string} tckn - T.C. Kimlik Numarası (11 haneli).
 * @param {string} name - Kullanıcının adı.
 * @param {string} surname - Kullanıcının soyadı.
 * @param {number} birthdate - Kullanıcının doğum yılı.
 * @returns {Promise<boolean>} - Doğrulama sonucu (true/false).
 */
async function validateTcknNvi(tckn, name, surname, birthdate) {
  if (!validateTckn(tckn)) {
    return false;
  }

  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
        <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
        <TCKimlikNo>${tckn}</TCKimlikNo>
        <Ad>${name}</Ad>
        <Soyad>${surname}</Soyad>
        <DogumYili>${birthdate}</DogumYili>
        </TCKimlikNoDogrula>
    </soap12:Body>
    </soap12:Envelope>`;

  const url = "https://tckimlik.nvi.gov.tr/service/kpspublic.asmx";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/soap+xml; charset=utf-8",
      },
      body: soapRequest,
    });

    if (!response.ok) {
      throw new Error(`HTTP Hatası: ${response.status}`);
    }

    const responseText = await response.text();
    const result = parseSOAPResponse(responseText);
    return result;
  } catch (error) {
    console.error("Doğrulama sırasında hata oluştu:", error);
    throw error;
  }

  function parseSOAPResponse(responseText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(responseText, "text/xml");

    const resultNode = xmlDoc.getElementsByTagName(
      "TCKimlikNoDogrulaResult"
    )[0];
    if (!resultNode) {
      throw new Error("Geçersiz yanıt formatı");
    }

    return resultNode.textContent === "true";
  }
}

/**
 * T.C. Kimlik No doğrulama fonksiyonu.
 * @param {string} tckn - T.C. Kimlik Numarası (11 haneli).
 * @returns {Promise<boolean>} - Doğrulama sonucu (true/false).
 */
function validateTckn(tckn) {
  if (!/^\d{11}$/.test(tckn) || tckn[0] === "0") {
    return false;
  }

  const digits = tckn.split("").map(Number);
  const sumOfFirst10 = digits
    .slice(0, 10)
    .reduce((sum, digit) => sum + digit, 0);
  if (sumOfFirst10 % 10 !== digits[10]) {
    return false;
  }

  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
  if ((oddSum * 7 - evenSum) % 10 !== digits[9]) {
    return false;
  }

  return true;
}

/**
 * Vergi kimlik numarası doğrulama fonksiyonu.
 * @param {string} vkn - Vergi Kimlik Numarası (10 haneli).
 * @returns {Promise<boolean>} - Doğrulama sonucu (true/false).
 */
function validateVkn(vkn) {
  if (vkn.length !== 10) {
    return false;
  }

  let stepOfVkn = [];
  const lastDigit = Number(vkn.charAt(9));
  for (let i = 0; i < 9; i++) {
    const tmp = (Number(vkn.charAt(i)) + (9 - i)) % 10;
    stepOfVkn[i] = (tmp * 2 ** (9 - i)) % 9;
    if (tmp !== 0 && stepOfVkn[i] === 0) stepOfVkn[i] = 9;
  }
  const sum = stepOfVkn.reduce((a, b) => a + b, 0) % 10;
  return (10 - (sum % 10)) % 10 === lastDigit;
}

export { validateTckn, validateTcknNvi, validateVkn };
