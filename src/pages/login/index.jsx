/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:16:27
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-17 15:22:38
 * @Description:登陆
 */
import Taro from "@tarojs/taro";
import { useState } from "react";
import { View, Input, Image, Radio } from "@tarojs/components";
import YButton from "@/components/YButton";
import logo from "@/assets/logo.png";
import phoneImg from "@/assets/phone.png";
import paswordImg from "@/assets/pasword.png";
import { toast } from "@/utils/tools";
import { loginHandler } from "@/utils/loginHandler";
import { login } from "./service";

import "./index.scss";

const Login = () => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [checked, setChecked] = useState(false);

  const onLog = () => {
    if (!phone) {
      return toast("输入手机号");
    }
    if (!password) {
      return toast("输入正确密码");
    }
    // if (!checked) {
    //   return toast("请阅读并同意用户协议和隐私协议");
    // }
    login({
      phone,
      password,
    })
      .then((res) => {
        loginHandler({ ...res });
      })
      .catch(() => {});
  };

  const cliLook = (values) => {
    Taro.navigateTo({
      url: `/pagesWork/webView/index?url=${values}`,
    });
  };

  return (
    <View className="login">
      <View className={"login-logo"}>
        <Image className={"login-logo-img"} src={logo} mode="aspectFit" />
      </View>
      <View className="login-center">
        <View className="login-center-tit">账号登陆</View>
        <View className="login-center-tas">
          <Image
            className={"login-center-tas-img"}
            src={phoneImg}
            mode="aspectFit"
          />
          <Input
            className="login-center-input"
            name={"phone"}
            placeholder="输入手机号"
            type="number"
            value={phone}
            maxlength={11}
            onInput={(e) => {
              setPhone(e.detail.value);
            }}
          />
        </View>
        <View className="login-center-tas">
          <Image
            className={"login-center-tas-img"}
            src={paswordImg}
            mode="aspectFit"
          />
          <Input
            className="login-center-input"
            type="password"
            password
            placeholder="输入密码"
            value={password}
            onInput={(e) => {
              setPassword(e.detail.value);
            }}
          />
        </View>

        <View className="login-center-button">
          <YButton
            yType="default"
            onClick={() => {
              onLog();
            }}
          >
            <View className="login-center-button-text">登 录</View>
          </YButton>
        </View>
        <View className="login-center-button">
          <YButton
            yType="grey"
            onClick={() => {
              Taro.navigateTo({ url: "/pages/sign/index" });
            }}
          >
            <View
              className="login-center-button-text"
              style={{ color: "#000" }}
            >
              注 册
            </View>
          </YButton>
        </View>
        {/* <View
          className="login-center-info"
          onClick={() => {
            setChecked(!checked)
          }}
        >
          <Radio checked />&nbsp;我已阅读并同意&nbsp;
          <View
            style={{ color: "#05aa9c" }}
            onClick={() => {
              cliLook('https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/User%20Agreement.pdf');
            }}
          >
            用户服务协议
          </View>
          &nbsp;及&nbsp;
          <View
            style={{ color: "#05aa9c" }}
            onClick={() => {
              cliLook('https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/privacy.pdf');
            }}
          >
           隐私政策
          </View>
        </View> */}
      </View>
    </View>
  );
};
export default Login;
