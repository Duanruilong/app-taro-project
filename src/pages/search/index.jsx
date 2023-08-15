/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-15 16:52:53
 * @Description: 政策列表
 */
 

import { useState } from "react";
// import Taro, { useDidShow, Current } from "@tarojs/taro";
import { View, Input, Image, Text } from "@tarojs/components";
// import YTitleTask from "@/components/YTitleTask";
// import YButton from "@/components/YButton";
// import { toast } from "@/utils/tools";
// // import { getStorageData } from "@/utils/utils";
// import { loginHandler } from "@/utils/loginHandler";
// import useBack from "@/assets/use_back.png";
// import logo from "@/assets/logo.png";
// import { login } from "./service";
import "./index.scss";

const Search = () => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

 

  return (
    <View className="login-sec">
     <View className={"login-sec-tit-r"}>消息通知</View>
    </View>
  );
};

export default Search;
