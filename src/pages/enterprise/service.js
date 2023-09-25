/*
 * @Author: duanruilong
 * @Date: 2022-08-30 17:38:31
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-25 17:20:30
 * @Description:
 */
import http from "@/utils/http";

const { get } = new http("user");
const common = new http("common");

export function getList(params) {
  return common.get("/search_user", params, {
    loading: false,
  });
}


// // 关注
// export function getFollow(params) {
//   return get("/follow", params, {
//     loading: { title: "加载中...", mask: false }
//   });
// }

 