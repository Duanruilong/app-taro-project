/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-23 15:56:36
 * @Description: 我的
 */
import Taro, { useDidShow } from "@tarojs/taro";
import { useState, useEffect, useRef } from "react";
import { View, Image, Text, ScrollView, Button } from "@tarojs/components";
import YTitleTask from "@/components/YTitleTask";
import LoginMore from "@/components/LoginMore";
import { loginOutHandler } from "@/utils/loginHandler";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import { APP_VERSION, USER_DEFAULT_ID } from "@/constants";
import { getCount } from "./service";
import "./index.scss";

const User = () => {
  const topData = [
    {
      title: "关注",
      type: "follow",
      url: `/pagesWork/follow/index`,
      icon: require("@/assets/follow.png"),
      value: 0,
    },
    {
      title: "准备申请",
      type: "apply",
      url: `/pagesWork/apply/index`,
      icon: require("@/assets/apply.png"),
      value: 0,
    },
    {
      title: "浏览历史",
      type: "history",
      url: `/pagesWork/history/index`,
      icon: require("@/assets/history.png"),
      value: 0,
    },
  ];
  const serListData = [
    {
      title: "法律服务",
      url: "https://work.weixin.qq.com/kfid/kfc8cbb3383fe5e17cc",
      img: require("@/assets/serve/falv.png"),
    },
    {
      title: "财税服务",
      url: "https://work.weixin.qq.com/kfid/kfc11914429a6346b01",
      img: require("@/assets/serve/caishui.png"),
    },
    {
      title: "企业培训",
      url: "https://work.weixin.qq.com/kfid/kfc8cbb3383fe5e17cc",
      img: require("@/assets/serve/peixun.png"),
    },
    {
      title: "知识产权",
      url: "https://work.weixin.qq.com/kfid/kfc184e62d581ad5f34",
      img: require("@/assets/serve/zhishi.png"),
    },
    {
      title: "金融服务",
      url: "https://work.weixin.qq.com/kfid/kfc184e62d581ad5f34",
      img: require("@/assets/serve/jinrong.png"),
    },
    {
      title: "管理咨询",
      url: "https://work.weixin.qq.com/kfid/kfc11914429a6346b01",
      img: require("@/assets/serve/gli.png"),
    },
    {
      title: "企业采购",
      url: "https://work.weixin.qq.com/kfid/kfc11914429a6346b01",
      img: require("@/assets/serve/caig.png"),
    },
    {
      title: "其他",
      url: "https://work.weixin.qq.com/kfid/kfc11914429a6346b01",
      img: require("@/assets/serve/qta.png"),
    },
  ];

  const helpData = [
    {
      title: "意见反馈",
      type: "question",
      url: "/",
      img: require("@/assets/fank.png"),
    },
    {
      title: "帮助中心",
      type: "help",
      url: "/",
      img: require("@/assets/help.png"),
    },
    {
      title: "退出登录",
      type: "logout",
      url: "/",
      img: require("@/assets/logout.png"),
    },
  ];

  const { current } = useRef({
    infoData: "",
    hideInfo: false,
  });
  const [data, setData] = useState();
  const [dataCount, setDataCount] = useState();

  useEffect(() => {
    getStorageData("userInfo")
      .then((values) => {
        let userData = {};
        if (isEmpty(values)) {
          userData.user_id = USER_DEFAULT_ID;
          current.hideInfo = true;
          // loginOutHandler();
        } else {
          userData = values;
        }
        current.infoData = userData;
        setData(userData);
        getCount({
          user_id: userData?.user_id,
        })
          .then((res) => {
            console.log("res :>> ", res);
            setDataCount(res);
          })
          .catch(() => {});
      })
      .catch(() => {
        current.hideInfo = true;
        current.infoData = { user_id: USER_DEFAULT_ID };
      });
  }, []);

  useDidShow(() => {
    if (current.infoData?.user_id) {
      getCount({
        user_id: current.infoData?.user_id,
      })
        .then((res) => {
          setDataCount(res);
        })
        .catch(() => {});
    }
  });

  const helpClick = (values) => {
    const { type } = values;
    console.log("helpClick :>> ", values);
    if (type === "logout") {
      loginOutHandler();
    } else if (type === "question") {
      Taro.navigateTo({
        url: `/pages/question/index?type=feed`,
      });
    } else {
      toast("开发中，敬请期待。");
    }
  };

  const onOpenCustomer = (values) => {
    // const { type } = values;
    // console.log("helpClick :>> ", values);
    toast("开发中，敬请期待。");
  };

  return (
    <View className="user">
      <View
        className="user_top"
        onClick={() => {
          if (current.hideInfo) {
            return;
          }
          Taro.navigateTo({
            url: "/pagesWork/useEdit/index",
          });
        }}
      >
        <View className="user_top-lef">
          <View className="user_top-ava">
            <Image
              className="user_top-ava-img"
              src={require("@/assets/logo.png")}
            />
          </View>
          <View className="user_top-title">{data?.user_name || "未登录"}</View>
          <View className="user_top-title"></View>
        </View>
        <View className="user_top-lef">
          <Image
            className="user_top-edit-img"
            src={require("@/assets/edit.png")}
          />
          <Text className="user_top-edit">编辑资料</Text>
        </View>
        <View className="user_top_list">
          {!isEmpty(dataCount) &&
            topData.map((item) => {
              return (
                <View
                  key={item.url}
                  className="user_top_list-item"
                  onClick={() => {
                    if (current.hideInfo) {
                      return;
                    }
                    Taro.navigateTo({
                      url: item.url,
                    });
                  }}
                >
                  <View className="user_top_list-item-cent">
                    <Image className="user_top_list-item-img" src={item.icon} />
                    <View className="user_top_list-item-text">
                      {current.hideInfo ? 0 : dataCount[item.type]}
                    </View>
                  </View>
                  <View className="user_top_list-item-tit"> {item.title}</View>
                </View>
              );
            })}
        </View>
      </View>

      {current.hideInfo && (
        <View className="list_top-more">
          <LoginMore
            title="登录查看更多"
            text="登录解锁更多功能。"
            but="立即登录"
            bc="#fa7272"
          />
        </View>
      )}
      <TopTab />

      <YTitleTask
        showIcon={false}
        className="user_tas"
        title={<View className="user_tas-tit">其他服务 </View>}
      />
      <View className="user_ser">
        {serListData.map((item) => {
          return (
            <View
              key={item.title}
              className="user_ser-item"
              onClick={() => {
                onOpenCustomer(item);
              }}
            >
              <Image className="user_ser-item-img" src={item.img} alt="" />
              <View className="user_ser-item-text">{item.title}</View>
            </View>
          );
        })}
      </View>
      <YTitleTask
        showIcon={false}
        className="user_tas"
        title={<View className="user_tas-tit">帮助中心 </View>}
      />
      <View className="user_ser">
        {helpData.map((item) => {
          return (
            <View
              key={item.title}
              className="user_ser-help"
              onClick={() => {
                helpClick(item);
              }}
            >
              <View className="user_ser-help-img">
                <Image
                  className="user_ser-help-img-cen"
                  mode="aspectFit"
                  src={item.img}
                  alt=""
                />
              </View>
              <View className="user_ser-help-text">{item.title}</View>
            </View>
          );
        })}
      </View>
      {/* 版本 */}
      <View className="user_version">{APP_VERSION}</View>
    </View>
  );
};

const TopTab = (props) => {
  const serData = [
    { title: "名片", value: 0, url: "/", img: require("@/assets/7ae.png") },
    { title: "开票信息", value: 0, url: "/", img: require("@/assets/7ae.png") },
    { title: "企业培训", value: 0, url: "/", img: require("@/assets/7ae.png") },
    { title: "知识产权", value: 0, url: "/", img: require("@/assets/7ae.png") },
  ];

  return (
    <View className="user_gut">
      <ScrollView
        className="user_gut-scroll"
        scrollX // 横向
        showsHorizontalScrollIndicator={false} // 此属性为true的时候，显示一个水平方向的滚动条。
      >
        {serData.map((item, index) => {
          return (
            <View
              key={item.title}
              className="user_gut-item"
              style={index === 0 ? "marginLeft:20px" : ""}
            >
              <View className="user_gut-item-text">{item.title}</View>
              <View className="user_gut-item-info">{item.value}条内容</View>
              <Image className="user_gut-item-img" src={item.img} alt="" />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default User;
