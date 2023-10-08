/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-08-23 10:02:09
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-07 10:39:33
 * @FilePath: \app-taro-project\src\components\LoginMore\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Image } from "@tarojs/components";
import { loginOutHandler } from "@/utils/loginHandler";
import listImg from "./list.png";
import "./index.scss";

// 登录查看更多

const LoginMore = (props) => {
  const { title, text, but, onClick, bc = "#fa9172" } = props;
  return (
    <View
      className={`login_more`}
      onClick={() => {
        loginOutHandler();
        onClick;
      }}
      style={{ backgroundColor: bc }}
    >
      <View className={`login_more_lef`}>
        <View className={"login_more_lef-title"}>{title}</View>
        <View className={"login_more_lef-info"}>{text}</View>
        <View className={"login_more_lef-but"}>{but}</View>
      </View>
      <Image className={"login_more-img"} src={listImg} />
    </View>
  );
};

export default LoginMore;
