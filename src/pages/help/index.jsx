/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:16:27
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-17 10:50:00
 * @Description:帮助服务
 */
import Taro from "@tarojs/taro";
import { useState, useRef, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import { getStorageData, isEmpty } from "@/utils/utils";
import YTitleTask from "@/components/YTitleTask";
import { toast } from "@/utils/tools";
import "./index.scss";

const HelpPages = () => {
  const { current } = useRef({
    infoData: "",
    hideInfo: false,
  });
  const serListData = [
    {
      title: "法律服务",
      key: "https://work.weixin.qq.com/kfid/kfc8cbb3383fe5e17cc",
      img: require("@/assets/serve/falv.png"),
    },
    {
      title: "财税服务",
      key: "https://work.weixin.qq.com/kfid/kfc0bb4e48975825e87",
      img: require("@/assets/serve/caishui.png"),
    },
    {
      title: "企业培训",
      key: "https://work.weixin.qq.com/kfid/kfcf1dae5da2f9bfff6",
      img: require("@/assets/serve/peixun.png"),
    },
    {
      title: "知识产权",
      key: "https://work.weixin.qq.com/kfid/kfc0e48e59f2d23d6ed",
      img: require("@/assets/serve/zhishi.png"),
    },
    {
      title: "金融服务",
      key: "https://work.weixin.qq.com/kfid/kfc184e62d581ad5f34",
      img: require("@/assets/serve/jinrong.png"),
    },
    {
      title: "管理咨询",
      key: "https://work.weixin.qq.com/kfid/kfc9dda3f3c667b9b5b",
      img: require("@/assets/serve/gli.png"),
    },
    {
      title: "企业采购",
      key: "https://work.weixin.qq.com/kfid/kfc9a11122109ac3059",
      img: require("@/assets/serve/caig.png"),
    },
    // {
    //   title: "其他",
    //   key: "kfc7615dff40a4c9dea",
    //   img: require("@/assets/serve/qta.png"),
    // },
  ];

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userData = await getStorageData("userInfo");
    current.infoData = userData;
  };

  // 打开微信客服
  const onOpenCustomer = async (values) => {
    console.log("打开微信客服 :>> ", values);
    
    toast("正在打开微信客服，请稍等...");
    Taro.navigateTo({
      url: `/pagesWork/webView/index?url=${values.key}&type=back`,
    });
  };
  return (
    <View className="hep">
      <YTitleTask
        showIcon={false}
        className="hep_tas"
        title={<View className="hep_tas-tit">服务选项</View>}
      />
      <View className="hep_ser">
        {serListData.map((item) => {
          return (
            <View
              key={item.title}
              className="hep_ser-item"
              onClick={() => {
                if (current.hideInfo) {
                  toast("注册登录查看更多");
                  return;
                } else {
                  onOpenCustomer(item);
                }
              }}
            >
              <Image className="hep_ser-item-img" src={item.img} alt="" />
              <View className="hep_ser-item-text">{item.title}</View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default HelpPages;
