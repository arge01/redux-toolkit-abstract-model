import { getToken } from "./token";

export function redirect() {
  if (!getToken()) {
    if (
      location.pathname !== "/auth/login" &&
      location.pathname !== "/auth/sign-up"
    ) {
      const redirectUrl = window.location.href;
      window.location.href = `/auth/login?redirect=${redirectUrl}`;
    }
  }
}
