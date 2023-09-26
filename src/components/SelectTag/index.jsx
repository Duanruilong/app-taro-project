/*
 * @Author: duanruilong
 * @Date: 2022-08-30 17:40:12
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-26 15:21:29
 * @Description: SelectTag
 */
import { useState, useRef, useEffect } from "react";
import { View, Input, ScrollView, Image, Text } from "@tarojs/components";
import YTitleBorder from "@/components/YTitleBorder";
import TMask from "@/components/tinker/TMask";
import { toast } from "@/utils/tools";
import close_b from "@/assets/close_b.png";
import rightImg from "@/assets/right.png";
import { getList } from "./service";
import "./index.scss";

const SelectTag = (props) => {
  const { className = "", tagValue, onClose } = props;
  const { current } = useRef({});
  const [popupData, setPopupData] = useState([]);
  const [popList, setPopList] = useState([]);

  console.log("props :>> ", props);
  const onGetList = (param) => {
    getList({ ...param })
      .then((res) => {
        console.log("res :>> ", res);
        setPopupData(res.split(","));
      })
      .catch(() => {});
  };

  useEffect(() => {
    onGetList({ key: "" });
  }, []);

  useEffect(() => {
    if (tagValue) {
      setPopList(tagValue.split(","));
      current.popListNew = tagValue.split(",");
    }
  }, [tagValue]);

  const onPopClick = (values) => {
    console.log("onPopClick :>> ", values);
    const newPop = [...popList];
    if (popList.includes(values)) {
      toast("已经存在内容，请选择其他内容！");
    } else {
      newPop.push(values);
      setPopList(newPop);
      current.popListNew = newPop;
    }
  };

  // 删除tag
  const onPopClose = (values) => {
    const popListNew = [...popList];
    console.log(values, "删除tag :>> ", popListNew);
    popListNew.splice(values, 1);
    current.popListNew = popListNew;
    setPopList(popListNew)
  };

  const onSearchClick = (values) => {
    console.log("values :>> ", values);
    onGetList({ key: values });
  };

  const onSearchClear = (values) => {
    console.log("onSearchClear :>> ", values);
  };

  return (
    <View className={`select_tag ${className}`}>
      <TMask visible>
        <View className="select_tag_popup">
          <View className="select_tag_popup-title">选择产业领域</View>
          {/* <SearchBar
            placeholder="搜索最新政策"
            onSearch={(e) => onSearchClick(e)}
            onClear={(e) => onSearchClear(e)}
          /> */}
          <YTitleBorder title="已选择：" />
          <ScrollView
            className="select_tag_popup-scroll"
            style={{ height: 110 }}
            scrollY
            scrollWithAnimation
          >
            <View className="select_tag_popup-list">
              {popList && popList.length > 0 ? (
                popList.map((item, index) => {
                  return (
                    <View className="select_tag_popup-item" key={index}>
                      <View className="select_tag_popup-item-text">{item}</View>
                      <Image
                        className="select_tag_popup-item-img"
                        mode="aspectFit"
                        src={close_b}
                        onClick={() => {
                          onPopClose(index);
                        }}
                      />
                    </View>
                  );
                })
              ) : (
                <View style={{ fontSize: 16, marginLeft: 10 }}>无</View>
              )}
            </View>
          </ScrollView>
          <View className="select_tag_popup-seg" />
          <YTitleBorder title="选择数据：" />
          <ScrollView
            className="select_tag_popup-scroll"
            style={{ height: 120 }}
            scrollY
            scrollWithAnimation
          >
            <View className="select_tag_popup-list">
              {popupData && popupData.length > 0 ? (
                popupData.map((item, index) => {
                  return (
                    <View
                      className="select_tag_popup-item select_tag_popup-select"
                      key={index}
                      onClick={() => onPopClick(item)}
                    >
                      <View className="select_tag_popup-select-text">{item}</View>
                    </View>
                  );
                })
              ) : (
                <View style={{ fontSize: 16, marginLeft: 10 }}>无</View>
              )}
            </View>
          </ScrollView>
          <Image
            className="select_tag_popup-close"
            mode="aspectFit"
            src={close_b}
            onClick={() => {
              onClose(current.popListNew);
              setPopList(current.popListNew);
            }}
          />
        </View>
      </TMask>
    </View>
  );
};

export default SelectTag;
