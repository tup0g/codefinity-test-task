export interface IFileReader {
  read(): Promise<Map<string, string>>;
}
