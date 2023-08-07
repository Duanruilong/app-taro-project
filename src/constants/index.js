/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-07 15:01:35
 * @Description:
 */
// import { getStorageData } from "@/utils/utils";

// const useName = getStorageData("use-name");

export const APP_VERSION = "v1.0.0";

export const NEW_VERSION = "100"; //后端接口请求参数  例如：100--> V1.0.0

export const LOGIN_CHANNEL = "login-channel"; // 登录频道
 
export const LOGIN_PAGE = "/pages/login/index";

export const HOME_PAGE = "/pages/index/index";

export const SYSTEM = "REPRESENT";

// 性别
export const MAP_SEX = [
  {
    code: 1,
    value: "男"
  },
  {
    code: 2,
    value: "女"
  }
];

// 工作计划状态 1 待完成 2 已完成 3 已超时 4 已取消
export const WORK_PLAN_TYPE = {
  1: {
    value: 1,
    text: "待完成"
  },
  2: {
    value: 2,
    text: "已完成 "
  },
  3: {
    value: 3,
    text: "已超时"
  },
  4: {
    value: 4,
    text: "已取消"
  }
};

 