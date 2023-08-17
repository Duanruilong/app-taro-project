/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:16:27
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-17 11:29:39
 * @Description:
 */
import http from "@/utils/http";

const common = new http("common");
const user = new http("user");


// 标签
export function getList(params) {
  return common.get("/search", params, {
    loading: { title: "加载中...", mask: false }
  });
}

// 注册/zqt/api/user/register
export function Register(params) {
  return user.get("/app_register", params, { loading: { title: "加载中...", mask: false } });
}
