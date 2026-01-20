export interface IParser<T>{
  parse(rawContent: string, filename: string): T[];
}
