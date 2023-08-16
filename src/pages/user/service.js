/*
 * @Author: duanruilong
 * @Date: 2022-08-30 17:38:31
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-05-26 11:54:16
 * @Description:
 */
import http from "@/utils/http";

const { get } = new http("user");

export function getCount(params) {
  return get("/count_info", params, {
    loading: { title: "加载中...", mask: false }
  });
}

 