/*
 * @Author: duanruilong
 * @Date: 2022-08-30 17:38:31
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-25 16:09:13
 * @Description:
 */
import http from "@/utils/http";

const { get } = new http("user");

export function getList(params) {
  return get("/search", params,{ loading: false });
}


// 关注
export function getFollow(params) {
  return get("/follow", params, {
    loading: { title: "加载中...", mask: false }
  });
}

 