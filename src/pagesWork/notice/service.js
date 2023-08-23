/*
 * @Author: duanruilong
 * @Date: 2022-08-30 17:38:31
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-23 11:14:04
 * @Description:
 */
import http from "@/utils/http";

// const { get } = new http("common");

// export function getList(params) {
//   return get("/notice_list", params, {
//     loading: { title: "加载中", mask: false }
//   });
// }

 

const { get } = new http("user");

export function getList(params) {
  return get("/apply_list", params, {
    loading: { title: "加载中", mask: false }
  });
}
