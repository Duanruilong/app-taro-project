/*
 * @Author: duanruilong
 * @Date: 2022-08-30 16:29:48
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-26 10:40:08
 * @Description: 政策解读
 */

import Taro, { Current } from "@tarojs/taro";
import { useState, useEffect, useRef } from "react";
import { View, Image, RichText } from "@tarojs/components";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import { getInfo } from "./service";
import "./index.scss";

const PolicyInter = () => {
  const [params] = useState(Current.router.params);
  // const { windowHeight } = Taro.getSystemInfoSync();
  const { current } = useRef({
    value1: "",
    value2: "",
  });

  const [data, setData] = useState();

  useEffect(() => {
    Taro.setNavigationBarColor({
      // frontColor: '#ffffff',
      backgroundColor: "#f5f9fc",
    });
    getStorageData("userInfo")
      .then((values) => {
        current.infoData = values;
        getStorageData("Inter-ITEM").then((info) => {
          getInfo({ interpret_id: info?.interpret_id })
            .then((res) => {
              setData(res);
            })
            .catch(() => {});
        });
      })
      .catch(() => {});
  }, []);

  return (
    <View className="policy">
      <Image className="policy_img1" src={require("@/assets/del_bc.jpg")} />
      <View className="policy_cent-title">{data?.title}</View>
      {!isEmpty(data?.level) && (
        <View className="policy_cent-clik">
          {" "}
          <View className="policy_cent-tag">{data?.level}</View>
        </View>
      )}
      <View className="policy_cent-info">
        政策解读来源：{data?.source || "暂无"}
      </View>
      <View className="policy_cent-info">
        政策发布日期：{data?.create_time || "暂无"}
      </View>
      <View className="policy_cent-clik"></View>

      {data?.content ? (
        <RichText
          style={{ padding: 16, backgroundColor: "#fff" }}
          nodes={data?.content}
        />
      ) : (
        <View style={{ marginTop: 100 }}>暂无内容</View>
      )}
    </View>
  );
};

export default PolicyInter;
