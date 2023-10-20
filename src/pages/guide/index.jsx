/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:16:27
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-20 16:22:41
 * @Description:登陆
 */
import Taro from "@tarojs/taro";
import { useState, useRef, useEffect } from "react";
import { View, Image, Swiper, SwiperItem } from "@tarojs/components";
import { getStorageData, isEmpty } from "@/utils/utils";
import "./index.scss";

const GuidePage = () => {
  const [active, setActive] = useState(0);
  const [showB, setShowB] = useState(false);

  const guide = [
    "https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/icon/guide_page1.png",
    "https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/icon/guide_page2.png",
    "https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/icon/guide_page3.png",
  ];

  useEffect(() => {
    getUserInfo();
    setTimeout(() => {
      setShowB(true);
    }, 2000);
  }, []);

  const getUserInfo = async () => {
    const userData = await getStorageData("userInfo");
    const userGuide = await getStorageData("userGuide");
    console.log("userGuide :>> ", userGuide);
    console.log("userData :>> ", userData);
    if (isEmpty(userGuide) || isEmpty(userData)) {
      Taro.setStorage({
        key: "userGuide",
        data: true,
      });
    } else {
      cliLook();
    }
  };

  const cliLook = () => {
    Taro.switchTab({
      url: `/pages/index/index`,
    });
  };

  return (
    <View className="guide">
      <Swiper
        className="guide_banner-swipe"
        indicatorActiveColor="#05aa9c"
        indicatorColor="#e9e9e9"
        // previousMargin="24px"
        // circular
        // indicatorDots
        interval={3000}
        onChange={(e) => {
          console.log("onChange :>> ", e);
          const { detail } = e;
          setActive(detail?.current);
        }}
      >
        {guide.map((item, index) => {
          return (
            <SwiperItem key={Date.now() + index}>
              <View className="guide_banner-item">
                <Image className="guide_banner-img" src={item} alt="" />
                {index + 1 === guide.length && (
                  <View
                    className="guide_banner-item-new"
                    onClick={() => {
                      cliLook();
                    }}
                  >
                    <View className="guide_banner-item-new-text">立即体验</View>
                  </View>
                )}
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
      {showB && (
        <View
          className="guide_top"
          onClick={() => {
            cliLook();
          }}
        >
          <View className="guide_top-text">跳 过</View>
        </View>
      )}

      <View
        className="guide_indicator"
        onClick={() => {
          cliLook();
        }}
      >
        {guide.map((item, index) => {
          return (
            <View
              key={Date.now() + index}
              className={`${
                active === index
                  ? " guide_indicator-item guide_indicator-item-active"
                  : "guide_indicator-item "
              }`}
            ></View>
          );
        })}
      </View>
    </View>
  );
};
export default GuidePage;
