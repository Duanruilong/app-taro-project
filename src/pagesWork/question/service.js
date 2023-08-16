/*
 * @Author: duanruilong
 * @Date: 2022-08-30 17:38:31
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-05-26 16:03:03
 * @Description: 
 */
import http from "@/utils/http";

const { get } = new http("user");


// 发起问题
export function getSetQue(params) {
  return get("/question", params, {
    loading: { title: "加载中...", mask: false }
  });
}
 