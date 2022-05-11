
export const getErrMsg = (err: any): string => {
  if (err.data.err) return err.data.err?.sqlMessage;
  return JSON.stringify(err);
}

export const setToken = (): string | undefined => {
  const token = localStorage.getItem('token');
  if (token) return token;
  return undefined;
}
