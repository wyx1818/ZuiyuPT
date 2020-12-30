import { TrackerErrors } from '@tracker/common/enums';

type TransArgs = {
  [k: string]: any;
};

export class TrackerException extends Error {
  public errStr: any;
  constructor(public readonly errCode: number, public readonly transArgs?: TransArgs) {
    super();

    this.errStr = TrackerErrors[errCode];
    this.logger();
  }

  logger() {
    const logMessage = `${new Date().toLocaleString()} --> ${this.errStr}`;
    console.log(this.errCode, logMessage);
  }
}
