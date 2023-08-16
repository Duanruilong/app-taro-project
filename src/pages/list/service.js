/*
 * @Author: duanruilong
 * @Date: 2022-08-30 17:38:31
 * @LastEditors: duanruilong
 * @LastEditTime: 2022-12-05 11:49:07
 * @Description:
 */
import http from "@/utils/http";

const { get } = new http("user");

export function getList(params) {
  return get("/question_list", params, {
    loading: { title: "加载中...", mask: false }
  });
}

 