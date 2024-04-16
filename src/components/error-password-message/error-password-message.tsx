interface ErrorPasswordMessageProps {
  error: string;
}

const ErrorPasswordMessage = ({
  error,
}: ErrorPasswordMessageProps): JSX.Element => {
  return <div>{error}</div>;
};
export default ErrorPasswordMessage;
