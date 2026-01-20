import type { ILogMessage } from '../contracts/iLogMessage';

export class LogMessage implements ILogMessage {
  constructor(
    private readonly _message: string,
    private readonly _timestamp: string,
    private readonly _filename: string
  ) {}

  public text(): string {
    return this._message;
  }

  public date(): string {
    return this._timestamp;
  }

  public source(): string {
    return this._filename;
  }
}