/*
 * @Author: duanruilong
 * @Date: 2022-08-30 16:29:48
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-26 11:45:52
 * @Description: 政策详情
 */

import Taro, { Current } from "@tarojs/taro";
import { useState, useEffect, useRef } from "react";
import { View, Image, WebView, RichText } from "@tarojs/components";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import { USER_DEFAULT_ID } from "@/constants";
// import { getInfo  } from "./service";
import "./index.scss";

const NewDetail = () => {
  const { windowHeight } = Taro.getSystemInfoSync();
  const { current } = useRef({});

  const [data, setData] = useState();

  useEffect(() => {
    Taro.setNavigationBarColor({
      // frontColor: '#ffffff',
      backgroundColor: '#f5f9fc',
    })
    getStorageData("userInfo")
      .then((values) => {
        let userData = {};
        if (isEmpty(values)) {
          userData.user_id = USER_DEFAULT_ID;
          current.hideInfo = true;
        } else {
          userData = values;
        }
        current.infoData = userData;

        getStorageData("DAMAGE-NEW").then((values) => {
          setData(values);
        });
      })
      .catch(() => {
        current.hideInfo = true;
        current.infoData = { user_id: USER_DEFAULT_ID };
      });
  }, []);

  console.log("data?.content :>> ", data?.content);
  return (
    <View className="policy">
      <Image
        className="policy_img2"
        src={require("@/assets/del_bc.jpg")}
      />
      <View className="policy_cent-title">{data?.title}</View>
      <View className="policy_cent-clik">
        <View className="policy_cent-tag">
          {data?.tags &&
            data.tags.split(",").map((items, index) => {
              return (
                <View
                  key={Date.now() + index}
                  className="policy_cent-tags"
                >
                  {items}
                </View>
              );
            })}
        </View>
      </View>
      <View className="policy_cent-info">来源：{data?.source}</View>
      <View className="policy_cent-info">发布时间：{data?.create_time}</View>
      {data?.content ? (
        <RichText
          style={{ paddingLeft: 10,paddingRight:10,paddingTop:10, backgroundColor: "#fff" ,whiteSpace:'pre-wrap'}}
          nodes={data?.content}
        />
      ) : (
        <View style={{ marginTop: 100 }}>暂无内容</View>
      )}
    </View>
  );
};

export default NewDetail;
