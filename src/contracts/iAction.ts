export interface IAction<T> {
  execute(message: T): Promise<void>;
}
