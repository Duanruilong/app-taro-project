/*
 * @Author: duanruilong
 * @Date: 2022-08-30 17:38:31
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-22 16:27:38
 * @Description:
 */
import http from "@/utils/http";

const { get } = new http("user");

// 最新
export function getNewList(params) {
  return get("/policy_new", params, { loading: false });
}

// 与我相关
export function getOrderPay(params) {
  return get("/policy_about", params, { loading: false });
}

// getOrderChange
export function getOrderChange(params) {
  return get("/steamer_change", params, { loading: false });
}

// Banner
export function getBanner(params) {
  return get("/new_recommend_list", params, { loading: false });
}
