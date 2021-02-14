export class GenericResponseError extends Error {
  constructor(readonly code: number, readonly message: string) {
    super(message);
  }
}

export function throwError(code: number, message: string): any {
  throw new GenericResponseError(code, message);
}
