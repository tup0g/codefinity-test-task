import type { iAction } from '../contracts/iAction';
import type { iLogMessage } from '../contracts/iLogMessage';
import { MockApiRepository } from '../mock/mockApiRepository';

export class RandomDelayAction implements iAction<iLogMessage> {
  constructor(
    private readonly _minMs: number, 
    private readonly _maxMs: number
  ) {}

  public async execute(_message: iLogMessage): Promise<void> {
    const delay = Math.random() * (this._maxMs - this._minMs) + this._minMs;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
}

export class ConsoleLogAction implements iAction<iLogMessage> {
  constructor(private readonly _prefix: string = "Saved message -") {}

  public async execute(message: iLogMessage): Promise<void> {
    const type = message.text().length > 8 ? "long" : "short"; 
    const outName = message.source().replace('file', 'out');

    console.log(
      `${this._prefix} ${message.text()} to ${outName} as ${type}`
    );
  }
}

export class ApiSaveAction implements iAction<iLogMessage> {
  constructor(private readonly _api: MockApiRepository) {}

  public async execute(message: iLogMessage): Promise<void> {
    const outName = message.source().replace('.txt', '_out.txt');
    
    const body = JSON.stringify({
      message: message.text(),
      timestamp: message.date(),
      type: message.text().length > 8 ? "long" : "short",
    });

    await this._api.post(outName, body);
  }
}