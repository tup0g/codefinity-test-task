export interface iFileReader {
  read(): Promise<Map<string, string>>;
}
