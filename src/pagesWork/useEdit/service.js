/*
 * @Author: duanruilong
 * @Date: 2022-10-26 15:55:30
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-19 17:47:09
 * @Description:
 */
import http from '@/utils/http'

const user = new http("user");

 
export function getEditInfo(params) {
  return user.get("/edit_info", params, {
    loading: { title: "加载中", mask: false }
  });
}
 

// 新增绑定企业
export function getNewBind(params) {
  return user.get("/new_bind", params, {
    loading: { title: "加载中", mask: false }
  });
}
 