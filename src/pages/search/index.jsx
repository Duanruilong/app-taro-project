/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-17 16:13:59
 * @Description: 政策列表
 */
import { useState, useRef, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Input, Image } from "@tarojs/components";
// import YListView from "@/components/YListView";
// import YInputSearch from "@/components/YInputSearch";
// import YNoData from "@/components/YNoData";
// import YButton from "@/components/YButton";
// import listItemImg from "@/assets/index_list1.png";
// import { getStorageData, isEmpty } from "@/utils/utils";
// import { toast } from "@/utils/tools";
// import { getList, getFollow } from "./service";
import "./index.scss";

const SearchPage = () => {
  const { current } = useRef({ local: null });
  const listViewRef = useRef(null);
  // // const { windowHeight } = Taro.getSystemInfoSync();
 

  return (
    <View className="search">
      <View className="search_top">政策列表</View>
    
    </View>
  );
};

export default SearchPage;
