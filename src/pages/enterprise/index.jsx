/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-20 16:52:25
 * @Description: 企业信息查询
 */
import { useState, useRef, useEffect } from "react";
import Taro,{ useDidShow } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import YInputSearch from "@/components/YInputSearch";
// import YButton from "@/components/YButton";
import YNoData from "@/components/YNoData";
import YListView from "@/components/YListView";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import listIMG from "@/assets/policy3.png";
import { USER_DEFAULT_ID } from "@/constants";
import { getList } from "./service";
import "./index.scss";

const EnterprisePage = () => {
  const listViewRef = useRef(null);
  const { current } = useRef({
    infoData: "",
    hideInfo: false,
  });

  const requestList = (param) => {
    listViewRef.current.load({
      pn: param?.pn || 1,
      ...param,
    });
  };

  // useEffect(() => {
    
  // }, []);


  useDidShow(() => {
    getStorageData("userInfo")
      .then((values) => {
        console.log("userInfo :>> ", values);
        let userData = {};
        if (isEmpty(values)) {
          userData.user_id = USER_DEFAULT_ID;
          current.hideInfo = true;
        } else {
          userData = values;
        }
        current.infoData = userData;
        // requestList({ user_id: userData?.user_id });
        requestList();
      })
      .catch(() => {
        current.hideInfo = true;
        current.infoData = { user_id: USER_DEFAULT_ID };
      });
  });

  const onChange = (values) => {
    console.log("onChange :>> ", values);
    current.local = values;
  };

  const onClearClick = (values) => {
    console.log("onSearchChange :>> ", values);
    current.local = null;
    listViewRef.current.load({
      // user_id: current.infoData?.user_id,
      key: "",
      pn: 1,
    });
  };

  const onSearchGoods = (values) => {
    current.local = values;
    console.log("onConfirmChange :>> ", values);
    listViewRef.current.load({
      // user_id: current.infoData?.user_id,
      key: values,
      pn: 1,
    });
  };

  const onConfirmChange = (values) => {
    const searchPageValue = values.detail?.value || undefined;
    onSearchGoods(searchPageValue);
  };
 

  const onEditData = async (values) => {
    await Taro.setStorage({
      key: "DAMAGE-ITEM",
      data: values,
    });
    Taro.navigateTo({
      url: `/pages/enterDetail/index`,
    });
  };

  const renderList = (data) => {
    console.log("企业 renderList:>> ", data);
    const { records } = data;
    if (isEmpty(data) || isEmpty(records)) {
      console.log("暂无数据 :>> ", records);
      return <YNoData desc={"暂无数据"} />;
    }
    if (records && records.length > 0) {
      return records.map((item, index) => {
        return (
          <View
            key={Date.now() + index+1}
            className="enterprise_list-item"
            onClick={() => {
              onEditData(item);
            }}
          >
            <View className="enterprise_list-item-cont">
              <View className="enterprise_list-item-cont-title">
                {item.enterprise_name || "XXX有限公司"}
              </View>
              <View className="enterprise_list-item-cont-info">
                企业法人：{item.juridical_person||'暂无'}
              </View>
              <View className="enterprise_list-item-cont-info">
                企业注册资本：{item.enterprise_register_capital||'暂无'}
              </View>
              <View className="enterprise_list-item-cont-info">
                企业注册时间：{item.enterprise_register_time||'暂无'}
              </View>
              <View className="enterprise_list-item-cont-tag_list">
              {item?.tags && item?.tags.split(",").map((news) => {
                return (
                  <View key={Date.now() + news} className="enterprise_list-item-cont-tags">
                    {news}
                  </View>
                );
              })}
              </View>
            </View>
            <View className="enterprise_list-item-img">
              <Image className="enterprise_list-item-img-cont" src={listIMG} />
            </View>
          </View>
        );
      });
    }
  };
  return (
    <View className="enterprise">
      <View className="enterprise_top">
        <View className="enterprise_top-cent">
          <YInputSearch
            className={"enterprise_top-input"}
            placeholder={"搜索企业相关信息"}
            onClearClick={onClearClick}
            onConfirm={onConfirmChange}
            onChange={onChange}
            // initialValue={params?.text}
          />
        </View>
      </View>
      <View>
        <YListView
          classStyle={"enterprise_list"}
          boxHeight={180}
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
export default EnterprisePage;
