/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-09 15:32:08
 * @Description: 我的
 */
import { useState } from "react";
// import Taro, { useDidShow, Current } from "@tarojs/taro";
import { View, Input, Image, Text } from "@tarojs/components";
// import YTitleTask from "@/components/YTitleTask";
// import YButton from "@/components/YButton";
import YSafeAreaView from "@/components/YSafeAreaView";
// import { toast } from "@/utils/tools";
// // import { getStorageData } from "@/utils/utils";
// import { loginHandler } from "@/utils/loginHandler";
// import useBack from "@/assets/use_back.png";
// import logo from "@/assets/logo.png";
// import { login } from "./service";
import "./index.scss";

const User = () => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

 

  return (
    <YSafeAreaView className="login-sec">
     <View className={"login-sec-tit-r"}>我的</View>
    </YSafeAreaView>
  );
};

export default User;
