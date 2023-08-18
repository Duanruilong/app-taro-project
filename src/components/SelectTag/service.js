/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:16:27
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-05-25 17:19:11
 * @Description:
 */
import http from "@/utils/http";

const common = new http("common");

// 标签
export function getList(params) {
  return common.get("/search", params, {
    loading: { title: "加载中...", mask: false }
  });
}