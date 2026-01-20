export interface iLogProcessor {
  process(filename: string, content: string): Promise<void>;
}