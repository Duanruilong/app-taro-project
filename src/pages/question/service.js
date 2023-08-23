/*
 * @Author: duanruilong
 * @Date: 2022-08-30 17:38:31
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-05-26 16:03:03
 * @Description: 
 */
import http from "@/utils/http";

const { get } = new http("user");
const common = new http("common");


// 发起问题
export function getSetQue(params) {
  return get("/question", params, {
    loading: { title: "加载中...", mask: false }
  });
}
 
// 问题反馈
export function getFeedback(params) {
  return common.get("/feedback", params, {
    loading: { title: "加载中...", mask: false }
  });
}
 