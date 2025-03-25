export function setToken(token: string | null, rememberMe = true) {
  if (token) {
    if (rememberMe) {
      localStorage.setItem("token", token);
    }

    if (!rememberMe) {
      sessionStorage.setItem("token", token);
    }

    return null;
  }

  return undefined;
}

export function getToken(token?: string | undefined): string | null {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    token ||
    null
  );
}

export function tokenFlush() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
}
