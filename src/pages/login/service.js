/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-08-16 16:30:42
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-17 10:02:59
 * @FilePath: \app-taro-project\src\pages\login\service.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "@/utils/http";

const { get } = new http("user", { ignoreSession: true });

export function login(params, options) {
  return get("/app_login", params, {
    ...options
  });
}
