/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-09 15:34:42
 * @Description: 登陆
 */
import { useState } from "react";
// import Taro, { useDidShow, Current } from "@tarojs/taro";
import { View, Input, Image, Text } from "@tarojs/components";
// import YTitleTask from "@/components/YTitleTask";
import YButton from "@/components/YButton";
import YSafeAreaView from "@/components/YSafeAreaView";
import { toast } from "@/utils/tools";
// import { getStorageData } from "@/utils/utils";
import { loginHandler } from "@/utils/loginHandler";
// import useBack from "@/assets/use_back.png";
import logo from "@/assets/logo.png";
import { login } from "./service";
import "./index.scss";

const Login = () => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  // const onForget = () => {
  //   Taro.navigateTo({ url: "/pages/updatePassword/index" });
  // };

  const onLog = () => {
    if (!phone) {
      return toast("输入手机号");
    }
    if (!password) {
      return toast("输入正确密码");
    }
    login({
      phone,
      password
    })
      .then(res => {
        loginHandler({ ...res });
      })
      .catch(() => {});
  };

  return (
    <YSafeAreaView className="login-sec">
      {/* <Image className={"login-sec-back"} src={useBack} mode="aspectFit" /> */}
      <View className={"login-sec-tit"}>
        <Image className={"login-sec-tit-l"} src={logo} mode="aspectFit" />
        <View className={"login-sec-tit-r"}>秀海生产管理系统</View>
      </View>
      <View className="login-sec-center">
        <Text className="login-sec-center-tas">手机号</Text>
        <Input
          className="login-sec-center-input"
          name={"phone"}
          placeholder="输入手机号"
          type="number"
          value={phone}
          maxlength={11}
          onInput={e => {
            setPhone(e.detail.value);
          }}
        />
        <Text className="login-sec-center-tas">密码</Text>
        <Input
          className="login-sec-center-input"
          type="password"
          password
          placeholder="输入密码"
          value={password}
          onInput={e => {
            setPassword(e.detail.value);
          }}
        />
        {/* <View className="login-sec-center-forget" onClick={onForget}>
          忘记密码
        </View> */}
        <View className="login-sec-center-button">
          <YButton
            yType="default"
            onClick={() => {
              onLog();
            }}
          >
            <View className="login-sec-center-button-text">登录</View>
          </YButton>
        </View>
      </View>
    </YSafeAreaView>
  );
};

export default Login;
