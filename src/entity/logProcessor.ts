import type { ILogProcessor } from '../contracts/iLogProcessor';
import type { IParser } from '../contracts/iParser';
import type { IAction } from '../contracts/iAction';
import type { ILogMessage } from '../contracts/iLogMessage';

export class LogProcessor implements ILogProcessor {
  constructor(
    private readonly _parser: IParser<ILogMessage>,
    private readonly _actions: IAction<ILogMessage>[]
  ) {}

  public async process(filename: string, content: string): Promise<void> {
    const messages: ILogMessage[] = this._parser.parse(content, filename);
    
    const tasks = messages.map(async (msg) => {
      for (const action of this._actions) {
        await action.execute(msg);
      }
    });

    await Promise.all(tasks);
  }
}