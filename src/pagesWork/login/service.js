import http from "@/utils/http";

const { get } = new http("admin", { ignoreSession: true });

export function login(params, options) {
  return get("/login", params, {
    ...options
  });
}
