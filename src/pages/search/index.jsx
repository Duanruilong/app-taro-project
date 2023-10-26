/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-26 10:52:42
 * @Description: 政策列表
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
import { getList, getFollow, getListNew } from "./service";
import "./index.scss";

const SearchPage = () => {
  const listViewRef = useRef(null);
  const { current } = useRef({
    infoData: "",
    hideInfo: false,
  });
  const [newData, setNewData] = useState([]);

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
        newList(values);
        requestList({ user_id: userData?.user_id });
      })
      .catch(() => {
        current.hideInfo = true;
        current.infoData = { user_id: USER_DEFAULT_ID };
      });
  });

  // 新闻数据
  const newList = (values) => {
    getListNew({
      user_id: values?.user_id,
      pn: 1,
      ps: 5,
    })
      .then((res) => {
        console.log("新闻数据 :>> ", res);

        if (!isEmpty(res?.records)) {
          setNewData(res?.records);
        }
      })
      .catch(() => {});
  };

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
    if (values?.follow && values.follow === 1) {
      toast("您已关注过该政策!");
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
      return (
        <View>
          <Image
            className="searchPage_list_img"
            src={require("@/assets/list_bc1.png")}
          />
          <View className="searchPage_list-top-tit">最新发布</View>
          <ServiceTab newData={newData} />
          <View
            className="searchPage_list-top-more"
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/new/index`,
              });
            }}
          >
            <View className="searchPage_list-top-more-tit">更多快讯</View>
          </View>
          <View className="searchPage_list-top-tit">所有政策</View>
          {records.map((item, index) => {
            return (
              <View
                key={Date.now() + index}
                className="searchPage_list-item"
                onClick={() => {
                  onEditData(item);
                }}
              >
                <View className="searchPage_list-item-cont">
                  <View className="searchPage_list-item-cont-title">
                    {item.title}
                  </View>
                  <View>
                    {/* {item.tags && (
                      <View className="searchPage_list-item-cont-tags">
                        {item.tags}
                      </View>
                    )} */}
                    <View className="searchPage_list-item-cont-info">
                      发文部门：{item.source||'暂无'}
                    </View>
                    <View className="searchPage_list-item-cont-info">
                      印发日期：{item.publish_date||'暂无'}
                    </View>
                  </View>
                </View>
                <View className="searchPage_list-item-img">
                  <Image
                    className="searchPage_list-item-img-cont"
                    src={listIMG}
                  />
                </View>
                {item?.level && (
                  <View className="searchPage_list-item-types">
                    {item?.level}
                  </View>
                )}

                {/* {!current.hideInfo && (
                  <View
                    className="searchPage_list-item-follow"
                    onClick={() => {
                      cliTip(item);
                    }}
                  >
                    <Image
                      className="searchPage_list-item-follow-img"
                      src={
                        item?.follow && item.follow === 1
                          ? require("@/assets/follow_yes.png")
                          : require("@/assets/follow_no.png")
                      }
                    />
                  </View>
                )} */}
              </View>
            );
          })}
        </View>
      );
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
      <View>
        <YListView
          classStyle={"searchPage_list"}
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

// 最新发布
const ServiceTab = (props) => {
  const { newData } = props;

  const onOpenCustomer = async (values) => {
    await Taro.setStorage({
      key: "DAMAGE-NEW",
      data: values,
    });
    Taro.navigateTo({
      url: `/pages/newDetail/index`,
    });
  };

  return (
    <View className="searchPage_list-top">
      <ScrollView
        className="searchPage_list-top-scroll"
        scrollX // 横向
        showsHorizontalScrollIndicator={false} // 此属性为true的时候，显示一个水平方向的滚动条。
      >
        {newData.map((item, index) => {
          return (
            <View
              key={Date.now() + index}
              className="searchPage_list-top-item"
              style={
                index === 0
                  ? "marginLeft:24px"
                  : index + 1 === newData.length
                  ? "marginRight:24px"
                  : ""
              }
              onClick={() => {
                onOpenCustomer(item);
              }}
            >
              {/* <Image className="searchPage_list-top-item-img" src={item.img} alt="" /> */}
              <View className="searchPage_list-top-item-to">
                {item?.source}
              </View>
              <View className="searchPage_list-top-item-text">
                {item?.title.length > 30
                  ? `${(item?.title).slice(0, 30)}...`
                  : item?.title}
              </View>
              <View className="searchPage_list-top-item-info">
                发布时间：{item?.create_time}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default SearchPage;
