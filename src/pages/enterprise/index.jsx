/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-22 17:51:30
 * @Description: 企业信息查询
 */
import { useState, useRef, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import YInputSearch from "@/components/YInputSearch";
// import YButton from "@/components/YButton";
import YNoData from "@/components/YNoData";
import YListView from "@/components/YListView";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import listIMG from "@/assets/policy3.png";
import { USER_DEFAULT_ID } from "@/constants";
import { getList, getFollow } from "./service";
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

  useEffect(() => {
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
  }, []);

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

  const cliTip = (values) => {
    if (values?.follow && values.follow === 1) {
      toast("已关注关注该政策!");
      return;
    }
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
            key={Date.now() + index}
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
                企业法人：{item.juridical_person}
              </View>
              <View className="enterprise_list-item-cont-info">
                企业注册资本：{item.enterprise_register_capital}
              </View>
              <View className="enterprise_list-item-cont-info">
                企业注册时间：{item.enterprise_register_time}
              </View>
              <View className="enterprise_list-item-cont-tag_list">
              {item?.tag.split(",").map((item) => {
                return (
                  <View key={item} className="enterprise_list-item-cont-tags">
                    {item}
                  </View>
                );
              })}
              </View>
             
             
            </View>
            <View className="enterprise_list-item-img">
              <Image className="enterprise_list-item-img-cont" src={listIMG} />
            </View>
            {!current.hideInfo && (
              <View
                className="enterprise_list-item-follow"
                onClick={() => {
                  cliTip(item);
                }}
              >
                <Image
                  className="enterprise_list-item-follow-img"
                  src={
                    item?.follow && item.follow === 1
                      ? require("@/assets/follow_yes.png")
                      : require("@/assets/follow_no.png")
                  }
                />
              </View>
            )}
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
