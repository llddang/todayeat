export const handleError = (errorMessage: ErrorMessage) => {
  throw errorMessage;
};

export type ErrorMessage = {
  title: string;
  description: string;
};
