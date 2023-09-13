/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:16:27
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-11 15:12:45
 * @Description:登陆
 */
import Taro from "@tarojs/taro";
import { useState } from "react";
import { View, Image, Swiper, SwiperItem } from "@tarojs/components";
import banner1 from "./g.png";

import "./index.scss";

const GuidePage = () => {
  const [active, setActive] = useState(0);

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
        {[1, 11, 2, 3].map((item, index) => {
          return (
            <SwiperItem key={Date.now() + index}>
              <View className="guide_banner-item">
                <Image className="guide_banner-img" src={banner1} alt="" />
                {index + 1 === [1, 11, 2, 3].length && (
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
        {[1, 11, 2, 3].map((item, index) => {
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
