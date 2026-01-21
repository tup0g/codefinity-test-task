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

  const fileTasks = Array.from(filesMap.entries()).map(([filename, content]) => {
    return (async () => {
      try {
        await processor.process(filename, content);
      } catch (err) {
        console.warn(`Processing failed for ${filename}:`, err);
      }
    })();
  });

  const results = await Promise.allSettled(fileTasks);
  const failed = results.filter(r => r.status === 'rejected');
  if (failed.length > 0) {
    console.warn(`Completed with ${failed.length} file task failures.`);
  }
  console.log("All done!");
}

main();