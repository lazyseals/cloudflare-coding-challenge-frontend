export function log(msg: string | Error, payload?: any, production = false) {
  if (process.env.NODE_ENV === "production" && !production) {
    return;
  }

  if (msg instanceof Error) {
    payload != null ? console.error(msg, payload) : console.error(msg);
  }

  payload != null ? console.log(msg, payload) : console.log(msg);
}
