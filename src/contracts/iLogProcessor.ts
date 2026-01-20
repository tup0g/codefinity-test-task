export interface ILogProcessor {
  process(filename: string, content: string): Promise<void>;
}