/*
 * @Author: duanruilong
 * @Date: 2022-08-30 17:38:31
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-05-26 16:03:03
 * @Description:
 */
import http from "@/utils/http";

const { get } = new http("user");

export function getInfo(params) {
  return get("/policy_info", params, {
    loading: false,
  });
}
//  申请
export function getApply(params) {
  return get("/apply", params, {
    loading: { title: "加载中...", mask: false },
  });
}