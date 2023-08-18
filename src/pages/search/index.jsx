/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-18 10:59:07
 * @Description: 政策列表
 */
import { useState, useRef, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import YInputSearch from "@/components/YInputSearch";
import YButton from "@/components/YButton";
import YNoData from "@/components/YNoData";
import YListView from "@/components/YListView";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import { getList,getFollow } from "./service";
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
            key={item?.policy_id}
            className="search_list-item"
            onClick={() => {
              setShowData(item);
            }}
          >
            <View className="search_list-item-cent">
                <View className="search_list-item-cent-title"> {item.title}</View>
                {item?.tags && (
                <View className="search_list-item-cent-tag">{item?.tags}</View>
              )}
              <View className="search_list-item-cent-info">
                {item.create_time}
              </View>
              {/* <View className="search_list-item-but">
                <YButton
                  yType="default"
                  disabled={item?.follow === 1}
                  onClick={() => {
                    cliTip(item);
                  }}
                >
                  <View className="search_list-item-but-t">关注该政策</View>
                </YButton>
              </View> */}
            </View>
            <View className="search_list-item-img">
            <Image
              className="search_list-item-img-cent"
              src={require("@/assets/index_list1.png")}
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
