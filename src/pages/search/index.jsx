/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-21 16:48:17
 * @Description: 政策列表
 */
import { useState, useRef, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image,Button } from "@tarojs/components";
import YInputSearch from "@/components/YInputSearch";
import YButton from "@/components/YButton";
import YNoData from "@/components/YNoData";
import YListView from "@/components/YListView";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import listIMG from "./index_item.png";
import { getList, getFollow } from "./service";
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
    const searchPageValue = values.detail?.value || undefined;
    onSearchGoods(searchPageValue);
  };

  const cliTip = (values) => {
    getFollow({
      user_id: current.infoData?.user_id,
      policy_id: values?.policy_id,
    })
      .then(() => {
        toast("关注该政策成功!");
        onClearClick();
      })
      .catch(() => {});
  };

  // const renderList = (data) => {
  //   console.log("data renderList:>> ", data);
  //   const { records } = data;
  //   if (isEmpty(data) || isEmpty(records)) {
  //     console.log("暂无数据 :>> ", records);
  //     return <YNoData desc={"暂无数据"} />;
  //   }
  //   if (records && records.length > 0) {
  //     return records.map((item) => {
  //       return (
  //         <View
  //           key={item?.policy_id}
  //           className="searchPage_list-item"
  //           onClick={() => {
  //             setShowData(item);
  //           }}
  //         >
  //           <View className="searchPage_list-item-cent">
  //             <View className="searchPage_list-item-cent-title"> {item.title}</View>
  //             <View className="searchPage_list-item-cent-tag">{item?.tags}</View>
  //             <View className="searchPage_list-item-cent-info">{item.create_time}</View>
  //             <View className="searchPage_list-item-but">
  //               <YButton
  //                 yType="default"
  //                 disabled={item?.follow && item.follow === 1}
  //                 onClick={() => {
  //                   cliTip(item)
  //                 }}
  //               >
  //                 <View className="searchPage_list-item-but-t">关注该政策</View>
  //               </YButton>
  //             </View>
  //           </View>
  //           <View className="searchPage_list-item-img">
  //             <Image
  //               className="searchPage_list-item-img-cent"
  //               src={require("@/assets/index_list1.png")}
  //             />
  //           </View>
  //         </View>
  //       );
  //     });
  //   }
  // };

  const onEditData = async (values) => {
    await Taro.setStorage({
      key: "DAMAGE-ITEM",
      data: values,
    });
    Taro.navigateTo({
      url: `/pages/policyDetail/index`,
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
      return records.map((item, index) => {
        return (
          <View
            key={Date.now() + index}
            className="searchPage_list-item"
            onClick={() => {
              setShowData(item);
            }}
          >
            <View className="searchPage_list-item-cont">
              <View className="searchPage_list-item-cont-title"> {item.title}</View>
              <View className="searchPage_list-item-cont-tags">
                {item.tags}
              </View>
              <View className="searchPage_list-item-cont-info">
                {item.create_time}
              </View>
            </View>
            <View className="searchPage_list-item-img">
              <Image
                className="searchPage_list-item-img-cont"
                src={'https://pic5.58cdn.com.cn/nowater/fangfe/n_v25a185c1657984016926f26af591912c4.jpg'}
              />
            </View>
          </View>
        );
      });
    }
  };
  return (
    <View className="searchPage">
      <View className="searchPage_top">
        <View className="searchPage_top-cent">
          <YInputSearch
            className={"searchPage_top-input"}
            placeholder={"搜索最新政策"}
            onClearClick={onClearClick}
            onConfirm={onConfirmChange}
            onChange={onChange}
            // initialValue={params?.text}
          />
        </View>
      </View>
      <View style={{ height: "100vh" }}>
        <YListView
          classStyle={"searchPage_list"}
          boxHeight={176}
          renderList={renderList}
          request={getList}
          ref={listViewRef}
          extraParams={{}}
          manual
          pnParams
        />
      </View>
    </View>
  );
};
export default SearchPage;
