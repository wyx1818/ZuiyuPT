export class TrackerException3 extends Error {
  constructor(private readonly response: string, public readonly errorCode: number, public readonly source: string) {
    super();
    this.message = `${errorCode}, ${response}`;
    this.errorCode = errorCode;
    this.source = source;

    this.logger();
  }

  logger() {
    const logMessage = `${new Date().toLocaleString()} --> ${this.source} 出现错误: ${this.message}`;
    console.log(logMessage);
  }
}
