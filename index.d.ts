declare module "tckn-vkn-validator" {
  export function validateTcknNvi(
    tckn: string,
    name: string,
    surname: string,
    birthdate: number
  ): Promise<boolean>;
  export function validateTckn(tckn: string): boolean;
  export function validateVkn(vkn: string): boolean;
}
