export interface iLogMessage {
  text(): string;
  date(): string;
  source(): string;
}