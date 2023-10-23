/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-23 10:58:00
 * @Description:
 */
import { ENV } from "../constants";

const hostMap = {
  dev: "https://zqt.yqybarter.com:8010",
  qa: "https://zqt.yqybarter.com:8010",
  prod: "https://zqt.yqybarter.com:8010"
};

const servers = {
  user: `${hostMap[ENV]}/zqt/api/user`,
  common: `${hostMap[ENV]}/zqt/api/common`
};

export default servers;
