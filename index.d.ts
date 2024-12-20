declare module "tckn-vkn-validator" {
  export async function validateTcknNvi(
    tckn: string,
    name: string,
    surname: string,
    birthdate: number
  ): boolean;
  export function validateTckn(tckn: string): boolean;
  export function validateVkn(vkn: string): boolean;
}
