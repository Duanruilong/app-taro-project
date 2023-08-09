/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-05-25 16:15:14
 * @Description:
 */
import { ENV } from "../constants";

const hostMap = {
  dev: "https://base.zhsq.work:8010",
  qa: "https://base.zhsq.work:8010",
  prod: "https://base.zhsq.work:8010"
};

const servers = {
  user: `${hostMap[ENV]}/zqt/api/user`,
  common: `${hostMap[ENV]}/zqt/api/common`
};

export default servers;
