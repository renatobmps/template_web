export default class GeneralError extends Error {
  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
