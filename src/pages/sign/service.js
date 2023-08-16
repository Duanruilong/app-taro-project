/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-08-09 15:32:09
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-09 16:24:15
 * @FilePath: \app-taro-project\src\pages\sign\service.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "@/utils/http";

const { get } = new http("user", { ignoreSession: true });

export function login(params, options) {
  return get("/login", params, {
    ...options
  });
}
