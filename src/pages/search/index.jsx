/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-18 09:44:29
 * @Description: 政策列表
 */
import { useState, useRef, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Button, Image } from "@tarojs/components";
import YListView from "@/components/YListView";
import YInputSearch from "@/components/YInputSearch";
import YNoData from "@/components/YNoData";
import YButton from "@/components/YButton";
import listItemImg from "@/assets/index_list1.png";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import { getList, getFollow } from "./service";
import "./index.scss";

const SearchPage = () => {
  const { current } = useRef({ userInfo: null });
  const listViewRef = useRef(null);
  const [seachType, setSeachType] = useState("kind");
  const [addData, setAddData] = useState();
  const [codeModal, setCodeModal] = useState(false);

  const request = param => {
    listViewRef.current.load({
      pn: param?.pn || 1,
      ps: 10,
      ...param,
    });
  };

  useEffect(() => {
    getStorageData("userInfo").then(values => {
      current.infoData = values;
      request({ user_id: values?.user_id });
    });
  }, []);

 

  const onItemGoods = values => {
    // Taro.navigateTo({
    //   url: `/pages/details/index?id=${values.batch_no}`
    // });
  };



  const formSubmit = () => {
    request({
      user_id: current.infoData?.user_id,
      kind: "",
      date: ""
    });
  };

  const renderList = data => {
    const { records } = data;
    console.log('renderList :>> ', data);
    if (records && records.length === 0) {
      return <YNoData desc={"暂无数据"} />;
    }
    if (records && records.length > 0) {
      return records.map(item => {
        return (
          <View
            key={item.policy_id}
            className="search_list-item"
            onClick={() => {
              onItemGoods(item);
            }}
          >
            <View className="list-l-i-g">
              <View className="list-l-i-g-top">批次id：</View>
              <View className="list-l-i-g-top">{item?.title || "无"}</View>
            </View>
            <View className="list-l-i-g">
              <View className="list-l-i-g-t">品种:</View>
              <View className="list-l-i-g-v">{item?.tags || "无"}</View>
            </View>
            <View className="list-l-i-g">
              <View className="list-l-i-g-t">现有规格:</View>
              <View className="list-l-i-g-v">{item?.source || "无"}</View>
            </View>
            <View className="list-l-i-g">
              <View className="list-l-i-g-t">临近时间:</View>
              <View className="list-l-i-g-v">{item?.latest_time || 0}天</View>
            </View>
            <View className="list-l-i-g">
              <View className="list-l-i-g-t">报损:</View>
              <View className="list-l-i-g-v">{item?.damage || 0}</View>
            </View>
            <View className="list-l-i-g">
              <View className="list-l-i-g-t">库存:</View>
              <View className="list-l-i-g-v">{item?.stock || 0}</View>
            </View>
            <View className="list-l-i-g">
              <View className="list-l-i-g-t">总占用空间:</View>
              <View className="list-l-i-g-v">{item?.space || 0} 平方厘米</View>
            </View>
          </View>
        );
      });
    }
    return <YNoData desc={"加载中..."} />;
  };

  return (
    <View className="list">
      {/* 搜索 */}
      <View className="list-seach">
          <YInputSearch />

        <Button
          type="primary"
          className={"list-seach-button"}
          onClick={formSubmit}
        >
          <View className="list-seach-button-c">搜索</View>
        </Button>
      </View>

      {/* use-list */}
      <YListView
        classStyle={"list-l"}
        height={460}
        pnParams
        // boxHeight={140}
        renderList={renderList}
        request={getList}
        ref={listViewRef}
        manual
      />
    </View>
  );
};

export default SearchPage;
