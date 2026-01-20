export interface ILogMessage {
  text(): string;
  date(): string;
  source(): string;
}