/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:16:27
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-19 16:43:14
 * @Description:登陆
 */
import Taro from "@tarojs/taro";
import { useState } from "react";
import { View, Image, Swiper, SwiperItem } from "@tarojs/components";
import "./index.scss";

const GuidePage = () => {
  const [active, setActive] = useState(0);

  const guide=[
    'https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/icon/guide_page1.png',
    'https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/icon/guide_page2.png',
    'https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/icon/guide_page3.png'
  ]

  const cliLook = (values) => {
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
      <View
        className="guide_top"
        onClick={() => {
          cliLook();
        }}
      >
        <View className="guide_top-text">跳 过</View>
      </View>
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
