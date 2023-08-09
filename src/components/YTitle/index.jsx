/*
 * @Author: duanruilong
 * @Date: 2022-08-16 14:10:38
 * @LastEditors: duanruilong
 * @LastEditTime: 2022-08-16 14:22:21
 * @Description:
 */
import { View } from "@tarojs/components";
import "./index.scss";

const YTitle = props => {
  const { children, className = "" } = props;
  return <View className={`y-title ${className}`}>{children}</View>;
};

export default YTitle;
