interface GeneralErrorProps {
  message: string;
}

export default class GeneralError extends Error {
  private readonly props: GeneralErrorProps = {
    message: '',
  };

  get message(): string {
    return this.props.message || 'Unexpected error';
  }

  constructor(message: string) {
    super();

    this.props.message = message;
  }
}
