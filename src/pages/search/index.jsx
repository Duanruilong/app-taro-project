/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-18 10:38:03
 * @Description: 政策列表
 */
import { useState, useRef, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import YInputSearch from "@/components/YInputSearch";
import TMask from "@/components/tinker/TMask";
import YNoData from "@/components/YNoData";
import YListView from "@/components/YListView";
import { getStorageData, isEmpty } from "@/utils/utils";
import { getList } from "./service";
import "./index.scss";

const SearchPage = () => {
  const listViewRef = useRef(null);
  const { current } = useRef({
    infoData: "",
  });
  const [showData, setShowData] = useState();

  const requestList = (param) => {
    listViewRef.current.load({
      pn: param?.pn || 1,
      ...param,
    });
  };

  useEffect(() => {
    getStorageData("userInfo").then((values) => {
      current.infoData = values;
      requestList({ user_id: values?.user_id });
    });
  }, []);


  const onChange = (values) => {
    console.log("onChange :>> ", values);
    current.local = values;
  };

  const onClearClick = (values) => {
    console.log("onSearchChange :>> ", values);
    current.local = null;
    listViewRef.current.load({
      user_id: current.infoData?.user_id,
      key: "",
      pn: 1,
    });
  };

  const onSearchGoods = (values) => {
    current.local = values;
    console.log("onConfirmChange :>> ", values);
    listViewRef.current.load({
      user_id: current.infoData?.user_id,
      key: values,
      pn: 1,
    });
  };

  const onConfirmChange = (values) => {
    const searchValue = values.detail?.value || undefined;
    onSearchGoods(searchValue);
  };


  const renderList = (data) => {
    console.log("data renderList:>> ", data);
    const { records } = data;
    if (isEmpty(data) || isEmpty(records)) {
      console.log("暂无数据 :>> ", records);
      return <YNoData desc={"暂无数据"} />;
    }
    if (records && records.length > 0) {
      return records.map((item) => {
        return (
          <View
            key={item?.question_id}
            className="list_list-item"
            onClick={() => {
              setShowData(item);
            }}
          >
            <View className="list_list-item-cent">
              <View className="list_list-item-cent-title"> {item.title}</View>
              <View className="list_list-item-cent-left">
                回复内容：  
              </View>
              <View className="list_list-item-cent-answer">
                 {item.answer || "暂无回复"}
              </View>
              <View className="list_list-item-cent-info">
                {item.create_time}
              </View>
            </View>
            <View className="list_list-item-img">
              <Image
                className="list_list-item-img-cent"
                src={require("@/assets/xinxi_item.png")}
              />
            </View>
          </View>
        );
      });
    }
  };
  return (
    <View className="search">
      <View className="search_top">
        <View className="search_top-cent">
          <YInputSearch
            className={"search_top-input"}
            placeholder={"搜索最新政策"}
            onClearClick={onClearClick}
            onConfirm={onConfirmChange}
            onChange={onChange}
            // initialValue={params?.text}
          />
        </View> 
      </View>
      <YListView
        classStyle={"search_list"}
        boxHeight={230}
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
export default SearchPage;
