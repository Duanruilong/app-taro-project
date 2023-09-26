/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:16:27
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-26 15:22:16
 * @Description:
 */
import http from "@/utils/http";

const common = new http("common");

// 标签
export function getList(params) {
  return common.get("/search", params, {
    loading: false
  });
}
