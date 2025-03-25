import { getToken } from "./token";

export function redirect() {
  if (!getToken()) {
    if (location.pathname !== "/auth/login") {
      const { pathname, search } = window.location;
      const redirectUrl = `${pathname}${search}`;
      window.location.href = `/auth/login?redirect=${redirectUrl}`;
    }
  }
}
