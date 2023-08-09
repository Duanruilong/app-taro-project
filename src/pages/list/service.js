import http from "@/utils/http";

const { get } = new http("user", { ignoreSession: true });

export function login(params, options) {
  return get("/login", params, {
    ...options
  });
}
