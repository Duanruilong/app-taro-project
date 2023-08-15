/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-15 17:12:32
 * @Description: 消息通知
 */
import { useState, useRef, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import TMask from "@/components/tinker/TMask";
import YNoData from "@/components/YNoData";
import YListView from "@/components/YListView";
import { getStorageData, isEmpty } from "@/utils/utils";
import { getList } from "./service";
import "./index.scss";

const List = () => {
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
              <View> {item.title}</View>
              <View className="list_list-item-cent-answer">
                回复内容： {item.answer || "暂无回复"}
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
    <View className="list">
      <View className="list_top">
        <View className="list_top-item">
          <Image
            className="list_top-item-img"
            src={require("@/assets/xinxi.png")}
          />
          <View>系统通知</View>
        </View>
        <View className="list_top-item">
          <Image
            className="list_top-item-img"
            src={require("@/assets/xinxi_bug.png")}
          />
          <View>问题反馈</View>
        </View>
        <View
          className="list_top-item"
          onClick={() => {
            Taro.navigateTo({
              url: `/pagesWork/question/index`,
              events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                QuestionPage: function () {
                  requestList({ user_id: current.infoData?.user_id });
                },
              },
            });
          }}
        >
          <Image
            className="list_top-item-img"
            src={require("@/assets/xinxi_new.png")}
          />
          <View>提问</View>
        </View>
      </View>
      <YListView
        classStyle={"list_list"}
        boxHeight={110}
        renderList={renderList}
        request={getList}
        ref={listViewRef}
        extraParams={{}}
        manual
        pnParams
      />
      {/* TModal */}
      {showData && (
        <TMask visible>
          <View className="list_msk">
            <View className="list_msk-top">信息详情</View>
            <View className="list_mod-cent">
              <View className="list_mod-cent-left">提问内容： </View>
              <View className="list_mod-cent-answer">{showData.question}</View>
              <View className="list_mod-cent-left">回复内容：</View>
              <View className="list_mod-cent-answer">
                {showData.answer || "暂无回复"}
              </View>
              <View className="list_mod-cent-info">
                创建时间： {showData.create_time}
              </View>
            </View>
            <View
              className="list_msk-b"
              onClick={() => {
                setShowData();
              }}
            >
              <View className="list_msk-b-c">返 回</View>
            </View>
          </View>
        </TMask>
      )}
    </View>
  );
};

export default List;
