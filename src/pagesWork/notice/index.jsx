/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-05-19 10:12:59
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-23 16:00:36
 * @FilePath: \taro-rn-appd:\fanx\zqt-weapp\src\pages\list\index.jsx
 * @Description: 系统通知
 */

import { useRef, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text,Image } from "@tarojs/components";
import YNoData from "@/components/YNoData";
import YListView from "@/components/YListView";
import { getStorageData, isEmpty } from "@/utils/utils";
import { getList } from "./service";
import "./index.scss";

const NoticePages = () => {
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

  // const onEditData = async (values) => {
  //   await Taro.setStorage({
  //     key: "DAMAGE-ITEM",
  //     data: values,
  //   });
  //   Taro.navigateTo({
  //     url: `/pages/policyDetail/index?type=dis`,
  //   });
  // };

  const renderList = (data) => {
    console.log("data renderList:>> ", data);
    const { records } = data;
    if (isEmpty(data) || isEmpty(records)) {
      console.log("暂无数据 :>> ", records);
      return <YNoData desc={"暂无数据"} />;
    }
    if (records && records.length > 0) {
      return records.map((item, index) => {
        return (
          <View
            key={Date.now() + index}
            className="notice_list-item"
            onClick={() => {
              // onEditData(item);
            }}
          >
            <View className="notice_list-item-cent">
              <View className="notice_list-item-cent-title">
                <Text className="notice_list-item-cent-keynote">通知标题：</Text>
                {item.title||'无'}
              </View>
              <View className="notice_list-item-cent-title">
              <Text className="notice_list-item-cent-keynote">通知内容：</Text>
                {item.content||'无'}
              </View>
              <View className="notice_list-item-cent-title">
              <Text className="notice_list-item-cent-keynote">发布时间：</Text>
              {item.create_time}
              </View>
            </View>
            <View className="notice_list-item-img">
              <Image
                className="notice_list-item-img-cent"
                src={require("@/assets/tips.png")}
              />
            </View>
          </View>
        );
      });
    }
  };
  return (
    <View className="notice">
      <YListView
        classStyle={"notice_list"}
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

export default NoticePages;
