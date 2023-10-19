/*
 * @Author: duanruilong
 * @Date: 2022-08-30 17:38:31
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-18 14:54:46
 * @Description:
 */
import http from "@/utils/http";

const { get } = new http("user");

export function getList(params) {
  return get("/list_bind", params, {
    loading: { title: "加载中", mask: false }
  });
}


export function getDelete(params) {
  return get("/delete_bind", params, {
    loading: { title: "加载中", mask: false }
  });
}

 