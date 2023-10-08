/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-08 16:09:52
 * @Description: 快讯列表
 */
import { useState, useRef, useEffect } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import YInputSearch from "@/components/YInputSearch";
import YNoData from "@/components/YNoData";
import YListView from "@/components/YListView";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import listIMG from "@/assets/policy2.png";
import { USER_DEFAULT_ID } from "@/constants";
import { getList, getFollow } from "./service";
import "./index.scss";

const NewPage = () => {
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
        requestList({ user_id: userData?.user_id });
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
      user_id: current.infoData?.user_id,
      title: "",
      pn: 1,
    });
  };

  const onSearchGoods = (values) => {
    current.local = values;
    console.log("onConfirmChange :>> ", values);
    listViewRef.current.load({
      user_id: current.infoData?.user_id,
      title: values,
      pn: 1,
    });
  };

  const onConfirmChange = (values) => {
    const newPageValue = values.detail?.value || undefined;
    onSearchGoods(newPageValue);
  };

  const onEditData = async (values) => {
    await Taro.setStorage({
      key: "DAMAGE-NEW",
      data: values,
    });
    Taro.navigateTo({
      url: `/pages/newDetail/index`,
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
            className="newPage_list-item"
            onClick={() => {
              onEditData(item);
            }}
          >
            <View className="newPage_list-item-cont">
              <View className="newPage_list-item-cont-title">{item.title}</View>
              <View className="newPage_list-item-cont-tag">
                {item.tags &&
                  item.tags.split(",").map((items, index) => {
                    return (
                      <View
                        key={Date.now() + index}
                        className="newPage_list-item-cont-tags"
                      >
                        {items}
                      </View>
                    );
                  })}
              </View>
              <View className="newPage_list-item-cont-info">
                来源：{item.source}
              </View>
              <View className="newPage_list-item-cont-info">
                发布时间：{item.create_time}
              </View>
            </View>
            <View className="newPage_list-item-img">
              <Image className="newPage_list-item-img-cont" src={listIMG} />
            </View>
            {/* <View
              className="newPage_list-item-follow"
              onClick={() => {
                cliTip(item);
              }}
            >
              快讯
            </View> */}
          </View>
        );
      });
    }
  };
  return (
    <View className="newPage">
      <View className="newPage_top">
        <View className="newPage_top-cent">
          <YInputSearch
            className={"newPage_top-input"}
            placeholder={"搜索最新快讯"}
            onClearClick={onClearClick}
            onConfirm={onConfirmChange}
            onChange={onChange}
            // initialValue={params?.text}
          />
        </View>
      </View>
      <View>
        <YListView
          classStyle={"newPage_list"}
          boxHeight={125}
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

export default NewPage;
