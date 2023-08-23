import { View, Image } from "@tarojs/components";
import { loginOutHandler } from "@/utils/loginHandler";
import listImg from "./list.png";
import "./index.scss";

// 登录查看更多

const LoginMore = (props) => {
  const { title, text, but, onClick, bc = "#fa9172" } = props;
  return (
    <View className={`login_more`} style={{ backgroundColor: bc }}>
      <View className={`login_more_lef`}>
        <View className={"login_more_lef-title"}>{title}</View>
        <View className={"login_more_lef-info"}>{text}</View>
        <View
          className={"login_more_lef-but"}
          onClick={() => {
            loginOutHandler();
            onClick();
          }}
        >
          {but}
        </View>
      </View>
      <Image className={"login_more-img"} src={listImg} />
    </View>
  );
};

export default LoginMore;
