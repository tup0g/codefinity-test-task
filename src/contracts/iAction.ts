export interface iAction<T> {
  execute(message: T): Promise<void>;
}
