/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-17 16:00:08
 * @Description: 政策列表
 */
import { useState, useRef, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Input, Image } from "@tarojs/components";
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
  const { current } = useRef({ local: null });
  const listViewRef = useRef(null);
  // // const { windowHeight } = Taro.getSystemInfoSync();

  // const requestList = (param) => {
  //   listViewRef.current.load({
  //     pn: param?.pn || 1,
  //     ps: 10,
  //     ...param,
  //   });
  // };

  // useEffect(() => {
  //   getStorageData("userInfo").then((values) => {
  //     current.infoData = values;
  //     requestList({ user_id: values?.user_id });
  //   });
  // }, []);

  // const onChange = (values) => {
  //   console.log("onChange :>> ", values);
  //   current.local = values;
  // };

  // const onClearClick = (values) => {
  //   console.log("onSearchChange :>> ", values);
  //   current.local = null;
  //   listViewRef.current.load({
  //     user_id: current.infoData?.user_id,
  //     key: "",
  //     pn: 1,
  //   });
  // };

  // const onSearchGoods = (values) => {
  //   current.local = values;
  //   console.log("onConfirmChange :>> ", values);
  //   listViewRef.current.load({
  //     user_id: current.infoData?.user_id,
  //     key: values,
  //     pn: 1,
  //   });
  // };

  // const onConfirmChange = (values) => {
  //   const searchValue = values.detail?.value || undefined;
  //   onSearchGoods(searchValue);
  // };

  // const cliTip = (values) => {
  //   getFollow({
  //     user_id: current.infoData?.user_id,
  //     policy_id: values?.policy_id,
  //   })
  //     .then(() => {
  //       toast("关注该政策成功!");
  //       onClearClick();
  //     })
  //     .catch(() => {});
  // };

  // const onEditData = async (values) => {
  //   await Taro.setStorage({
  //     key: "DAMAGE-ITEM",
  //     data: values,
  //   });
  //   Taro.navigateTo({
  //     url: `/pages/policyDetail/index`,
  //   });
  // };

  // const renderList = (values) => {
  //   const { records } = values;
  //   if (records.length === 0) {
  //     return <YNoData desc={"暂无数据"} />;
  //   }
  //   return records.map((item) => {
  //     return (
  //       <View
  //         key={item?.policy_id}
  //         className="search_list-item"
  //         onClick={() => {
  //           onEditData(item);
  //         }}
  //       >
  //         <View className="search_list-item-cent">
  //           <View className="search_list-item-cent-title">{item.title}</View>
  //           {item?.tags && (
  //             <View className="search_list-item-cent-tag">{item?.tags}</View>
  //           )}
  //           <View className="search_list-item-cent-info">
  //             {item.create_time}
  //           </View>

  //           <View className="search_list-item-but">
  //               <YButton
  //                 yType="default"
  //                 disabled={item?.follow === 1}
  //                 onClick={() => {
  //                   cliTip(item);
  //                 }}
  //               >
  //                 <View className="search_list-item-but-t">关注该政策</View>
  //               </YButton>
  //             </View>
  //         </View>
  //         <View className="search_list-item-img">
  //           <Image
  //             className="search_list-item-img-cent"
  //             src={require("@/assets/index_list1.png")}
  //           />
  //         </View>
  //       </View>
  //     );
  //   });
  // };

  // const renderList = (values) => {
  //   console.log("data renderList:>> ", values);

  //   const { records } = values;
  //   if (isEmpty(values) || isEmpty(records)) {
  //     return <YNoData desc={"暂无数据"} />;
  //   }
  //   return records.map((item) => {
  //     return (
  //       <View
  //         key={item?.policy_id}
  //         className="search_list-item"
  //         // onClick={() => {
  //         //   onEditData(item);
  //         // }}
  //       >
  //         <View className="search_list-item-cent">
  //           <View className="search_list-item-cent-title">{item.title}</View>
  //           {item?.tags && (
  //             <View className="search_list-item-cent-tag">{item?.tags}</View>
  //           )}
  //           <View className="search_list-item-cent-info">
  //             {item.create_time}
  //           </View>

  //           <View className="search_list-item-but">
  //             <YButton
  //               yType="default"
  //               disabled={item?.follow === 1}
  //               onClick={() => {
  //                 cliTip(item);
  //               }}
  //             >
  //               <View className="search_list-item-but-t">关注该政策</View>
  //             </YButton>
  //           </View>
  //         </View>
  //         <View className="search_list-item-img">
  //           <Image
  //             className="search_list-item-img-cent"
  //             src={listItemImg}
  //           />
  //         </View>
  //       </View>
  //     );
  //   });
  // };

  return (
    <View className="search">
      <View className="search_top">政策列表</View>
      <View className="search_top">
        <View className="search_top-cent">
          <YInputSearch
            className={"search_top-input"}
            placeholder={"搜索最新政策"}
            // onClearClick={onClearClick}
            // onConfirm={onConfirmChange}
            // onChange={onChange}
            // initialValue={params?.text}
          />
        </View>
      </View>
      {/* <YListView
        classStyle={"search_list"}
        boxHeight={188}
        renderList={renderList}
        request={getList}
        ref={listViewRef}
        extraParams={{}}
        manual
        pnParams
      /> */}
    </View>
  );
};

export default SearchPage;
