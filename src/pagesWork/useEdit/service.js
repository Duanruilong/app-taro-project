/*
 * @Author: duanruilong
 * @Date: 2022-10-26 15:55:30
 * @LastEditors: duanruilong
 * @LastEditTime: 2022-10-26 16:20:22
 * @Description:
 */
import http from '@/utils/http'

const user = new http("user");

 
export function getEditInfo(params) {
  return user.get("/edit_info", params, {
    loading: { title: "加载中", mask: false }
  });
}
 