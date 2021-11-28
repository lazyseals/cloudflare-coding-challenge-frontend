import { log } from "./logger";

export function handleError(error: any): string {
  if (process.env.NODE_ENV !== "production") {
    log(error);
  }

  const _error = error as any;

  return (
    _error?.response?.data?.error?.message ||
    _error?.response?.data?.message ||
    "An unknown error occured"
  );
}
