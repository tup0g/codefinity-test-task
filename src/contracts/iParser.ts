export interface iParser<T>{
  parse(rawContent: string, filename: string): T[];
}
