/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-09 15:16:40
 * @Description:
 */
import { ENV } from "../constants";

const hostMap = {
  dev: "https://base.zhsq.work:8010",
  qa: "https://base.zhsq.work:8010",
  prod: "https://base.zhsq.work:8010"
};

const servers = {
  file: `${hostMap[ENV]}/base/file`,
  admin: `${hostMap[ENV]}/base/api/admin`,
  plan: `${hostMap[ENV]}/base/api/plan`,
  seedbed: `${hostMap[ENV]}/base/api/seedbed`,
  notice: `${hostMap[ENV]}/base/api/notice`
};

export default servers;
