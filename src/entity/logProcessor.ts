import type { iLogProcessor } from '../contracts/iLogProcessor';
import type { iParser } from '../contracts/iParser';
import type { iAction } from '../contracts/iAction';
import type { iLogMessage } from '../contracts/iLogMessage';

export class LogProcessor implements iLogProcessor {
  constructor(
    private readonly _parser: iParser<iLogMessage>,
    private readonly _actions: iAction<iLogMessage>[]
  ) {}

  public async process(filename: string, content: string): Promise<void> {
    const messages: iLogMessage[] = this._parser.parse(content, filename);
    
    const tasks = messages.map(async (msg) => {
      for (const action of this._actions) {
        await action.execute(msg);
      }
    });

    await Promise.allSettled(tasks);
  }
}