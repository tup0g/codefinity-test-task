import type { IParser } from '../contracts/iParser';
import type { ILogMessage } from '../contracts/iLogMessage';
import { LogMessage } from './logMessage';

export class LogParser implements IParser<ILogMessage>{
  constructor(private readonly _delimiter: string = ':') {}

  public parse(rawContent: string, filename: string): ILogMessage[] {
    const lines = rawContent.split('\n');
    const result: ILogMessage[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const lastIndex = trimmed.lastIndexOf(this._delimiter);
      if (lastIndex === -1) continue;

      const msg = trimmed.substring(0, lastIndex).trim();
      const time = trimmed.substring(lastIndex + 1).trim();

      result.push(new LogMessage(msg, time, filename));
    }

    return result;
  }
}