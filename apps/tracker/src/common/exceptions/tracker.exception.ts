export class TrackerException extends Error {
  constructor(private readonly response: string, public readonly errorCode: number) {
    super();
    this.message = `err:${errorCode}, ${response}`;
    this.errorCode = errorCode;
  }
}
