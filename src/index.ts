import { MockApiRepository } from './mock/mockApiRepository';
import { LogParser } from './entity/logParsers';
import { ConsoleLogAction, ApiSaveAction, RandomDelayAction } from './entity/logAction';
import { LogProcessor } from './entity/logProcessor';

async function main() {
  const api = new MockApiRepository();
  const parser = new LogParser(':');
  
  const actions = [
    new RandomDelayAction(100, 5000),
    new ApiSaveAction(api),
    new ConsoleLogAction()
  ];

  const processor = new LogProcessor(parser, actions);
  
  const filesMap = await api.read();

  const fileTasks: Promise<void>[] = [];
  
  filesMap.forEach((content: string, filename: string) => {
    fileTasks.push(processor.process(filename, content));
  });

  await Promise.all(fileTasks);
  console.log("All done!");
}

main();