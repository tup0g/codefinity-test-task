import type { IFileReader } from '../contracts/iFileReader';

export class MockApiRepository implements IFileReader {
  private readonly _storage: Map<string, string>;

  constructor() {
    this._storage = new Map<string, string>();
    
    this._storage.set(
      "file1.txt",
      `Hello world! : 2024-02-22 14:35:30 UTC\nGoodbye world! : 2024-02-22 16:35:30 UTC`
    );
    this._storage.set(
      "file2.txt",
      `How are you doing ? : 2024-02-22 13:59:30 UTC`
    );
    this._storage.set(
      "file3.txt",
      `System check : 2024-02-22 10:00:00 UTC`
    );
  }

  public async read(): Promise<Map<string, string>> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return this._storage; 
  }

  public async post(filename: string, body: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}