/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-05-19 10:12:59
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-18 16:09:31
 * @FilePath: \taro-rn-appd:\fanx\zqt-weapp\src\pages\list\index.jsx
 * @Description: follow
 */

import { useRef, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import YNoData from "@/components/YNoData";
import YListView from "@/components/YListView";
import { getStorageData, isEmpty } from "@/utils/utils";
import { getList } from "./service";
import "./index.scss";

const Follow = () => {
  const listViewRef = useRef(null);
  const { current } = useRef({
    infoData: "",
  });

  const requestList = (param) => {
    listViewRef.current.load({
      pn: param?.pn || 1,
      // ps:20,
      ...param,
    });
  };

  useEffect(() => {
    getStorageData("userInfo").then((values) => {
      current.infoData = values;
      requestList({ user_id: values?.user_id });
    });
  }, []);

  const onEditData = async (values) => {
    await Taro.setStorage({
      key: "DAMAGE-ITEM",
      data: values,
    });
    Taro.navigateTo({
      url: `/pages/policyDetail/index?type=dis`,
    });
  };

  const renderList = (data) => {
    console.log("data renderList:>> ", data);
    const { records } = data;
    if (isEmpty(data) || isEmpty(records)) {
      console.log("暂无数据 :>> ", records);
      return <YNoData desc={"暂无数据"} />;
    }
    if (records && records.length > 0) {
      return (
        <View className="follow_list-box">
          {records.map((item, index) => {
            return (
              <View
                key={Date.now() + index}
                className="follow_list-item"
                onClick={() => {
                  onEditData(item);
                }}
              >
                <View className="follow_list-item-cent">
                  <View className="follow_list-item-cent-title">
                    {" "}
                    {item.title}
                  </View>
                  <View className="follow_list-item-cent-info">
                    {item.create_time}
                  </View>
                </View>
                <View className="follow_list-item-img">
                  <Image
                    className="follow_list-item-img-cent"
                    src={require("@/assets/policy1.png")}
                  />
                </View>
              </View>
            );
          })}
        </View>
      );
    }
  };
  return (
    <View className="follow">
      <YListView
        classStyle={"follow_list"}
        boxHeight={60}
        renderList={renderList}
        request={getList}
        ref={listViewRef}
        extraParams={{}}
        manual
        pnParams
      />
    </View>
  );
};

export default Follow;
