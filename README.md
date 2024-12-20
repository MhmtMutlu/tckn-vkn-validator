# Tckn & Vkn Validator

Includes validateTcknNvi, validateTckn and validateVkn functions to validate Turkish Identification Number (Tckn) and Tax Identification Number (Vkn)

[![NPM](https://img.shields.io/npm/v/tckn-vkn-validator.svg)](https://www.npmjs.com/package/tckn-vkn-validator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install tckn-vkn-validator
```

## Usages

> validateTcknNvi function gets tckn (string), name (string), surname (string) and birthdate (number) as parameters and returns boolean as a result. It also uses KPS Public Tckn Validation API which is provided NVI (Population and citizenship affairs).

```ts
const tckn: string = "11111111110";
const name: string = "John";
const surname: string = "Doe";
const birthdate: number = 1985;

const result: boolean = await validateTcknNvi(tckn, name, surname, birthdate);
```

> validateTckn function gets tckn (string) as a parameter and returns boolean as a result. It only checks tckn in accordance with its rules.

```ts
const tckn: string = "11111111110";

const result: boolean = validateTckn(tckn);
```

> validateVkn function gets vkn (string) as a parameter and returns boolean as a result. It only checks vkn in accordance with its rules.

```ts
const vkn: string = "1430466081";

const result: boolean = validateVkn(vkn);
```

## License

MIT
