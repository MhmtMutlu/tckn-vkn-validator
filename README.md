# Tckn & Vkn Validator

Includes validateTckn and validateVkn functions to validate Turkish Identification Number (Tckn) and Tax Identification Number (Vkn)

[![NPM](https://img.shields.io/npm/v/tckn-vkn-validator.svg)](https://www.npmjs.com/package/tckn-vkn-validator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install tckn-vkn-validator
```

## Usages

> validateTckn function gets tckn (string) as a parameter and returns boolean as a result. It only checks tckn in accordance with its rules.

```ts
import { validateTckn } from "tckn-vkn-validator";

const tckn: string = "11111111110";

const result: boolean = validateTckn(tckn);
```

> validateVkn function gets vkn (string) as a parameter and returns boolean as a result. It only checks vkn in accordance with its rules.

```ts
import { validateVkn } from "tckn-vkn-validator";

const vkn: string = "1430466081";

const result: boolean = validateVkn(vkn);
```

## License

MIT
