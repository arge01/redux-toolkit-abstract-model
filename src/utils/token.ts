import { User } from "@/components/layout/Provider";

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

export function setUser(user: User = {} as User, rememberMe = true) {
  if (user) {
    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    if (!rememberMe) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }

    return {} as User;
  }

  return {} as User;
}

export function getToken(token?: string | undefined): string | null {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    token ||
    null
  );
}

export function getUser(user: User = {} as User): User {
  const r =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user") ||
    JSON.stringify(user);

  return JSON.parse(r);
}

export function tokenFlush() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");

  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
}
