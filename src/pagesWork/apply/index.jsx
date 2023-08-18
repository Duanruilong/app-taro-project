 
/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-05-19 10:12:59
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-18 16:09:10
 * @FilePath: \taro-rn-appd:\fanx\zqt-weapp\src\pages\list\index.jsx
 * @Description: apply
 */
 
import {   useRef, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import YNoData from "@/components/YNoData";
import YListView from "@/components/YListView";
import { getStorageData, isEmpty } from "@/utils/utils";
import { getList } from "./service";
import "./index.scss";

const ApplyPages = () => {
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
      url: `/pagesWork/policyDetail/index?type=dis`,
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
      return records.map((item,index) => {
        return (
          <View
            key={Date.now()+index}
            className="apply_list-item"
            onClick={() => {
              onEditData(item);
            }}
          >
            <View className="apply_list-item-cent">
              <View className="apply_list-item-cent-title"> {item.title}</View>
              <View className="apply_list-item-cent-info">
                {item.create_time}
              </View>
            </View>
            <View className="apply_list-item-img">
              <Image
                className="apply_list-item-img-cent"
                src={require("@/assets/policy.png")}
              />
            </View>
          </View>
        );
      });
    }
  };
  return (
    <View className="apply" style={{height:'100vh'}}>
      <YListView
        classStyle={"apply_list"}
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

export default ApplyPages;
