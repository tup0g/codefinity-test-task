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

      // Split by " : " (with spaces) to separate message from timestamp
      const parts = trimmed.split(' : ');
      if (parts.length < 2) continue;

      const msg = parts[0].trim();
      const time = parts.slice(1).join(' : ').trim();

      result.push(new LogMessage(msg, time, filename));
    }

    return result;
  }
}