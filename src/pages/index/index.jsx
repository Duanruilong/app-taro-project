/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-23 09:57:43
 * @Description: 消息通知
 */
import { useState, useEffect, useRef } from "react";
import Taro from "@tarojs/taro";
import {
  View,
  Image,
  Swiper,
  ScrollView,
  SwiperItem,
} from "@tarojs/components";
import YTitleTask from "@/components/YTitleTask";
import YNoData from "@/components/YNoData";
import LoginMore from "@/components/LoginMore";
// import YSafeAreaView from "@/components/YSafeAreaView";
// import { toast } from "@/utils/tools";
import { getStorageData, isEmpty } from "@/utils/utils";
// import { loginOutHandler } from "@/utils/loginHandler";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";
import banner4 from "@/assets/banner4.jpg";
import { USER_DEFAULT_ID, USER_DEFAULT_TAG } from "@/constants";
import { getNewList, getOrderPay } from "./service";
import "./index.scss";

const Index = () => {
  const { current } = useRef({
    pnParams: { pn: 1, ps: 20 },
    hideInfo: false,
  });
  const [tagData, setTagData] = useState(["默认"]);
  const [swiperList, setSwiperList] = useState([]);
  const [data, setData] = useState();

  // 最新数据
  const getNewData = (opts) => {
    getNewList({ ...opts })
      .then((res) => {
        if (res && res.length > 4) {
          setSwiperList(res.slice(0, 4));
        } else {
          setSwiperList(res);
        }
      })
      .catch(() => {});
  };
  // 与我相关 。type ：1默认 2根据tag筛选
  const getOrderData = (opts) => {
    getOrderPay({
      ...opts,
    })
      .then((res) => {
        setData(res);
      })
      .catch(() => {});
  };

  useEffect(() => {
    // Taro.clearStorage(); //清理本地数据缓存
    getStorageData("userInfo")
      .then((values) => {
        console.log("values :>> ", values);
        let userData = {};
        if (isEmpty(values)) {
          // loginOutHandler();
          userData.user_id = USER_DEFAULT_ID;
          userData.tag = USER_DEFAULT_TAG;
          current.hideInfo = true;
        } else {
          userData = values;
        }
        current.infoData = userData;
        const tagNew = userData?.tag.split(",");
        setTagData(["默认", ...tagNew]);
        getNewData({ user_id: userData?.user_id });
        getOrderData({ user_id: userData?.user_id, type: 1 });
      })
      .catch(() => {
        current.hideInfo = true;
        current.infoData = { user_id: USER_DEFAULT_ID, tag: USER_DEFAULT_TAG };
      });

    // TODO:
    // Taro.switchTab({
    //   url: "/pages/user/index"
    // });
    // Taro.navigateTo({
    //   url: "/pages/useEdit/index",
    // });
  }, []);

  const onEditData = async (values) => {
    await Taro.setStorage({
      key: "DAMAGE-ITEM",
      data: values,
    });
    Taro.navigateTo({
      url: `/pages/policyDetail/index`,
    });
  };

  const showImgUrl = (values) => {
    if (values === 0) {
      return banner1;
    }
    if (values === 1) {
      return banner2;
    }
    if (values === 2) {
      return banner3;
    }
    if (values === 3) {
      return banner4;
    }
    return banner1;
  };

  const renderList = (data) => {
    console.log("data renderList:>> ", data);
    if (isEmpty(data)) {
      console.log("暂无数据 :>> ", data);
      return <YNoData desc={"暂无数据"} />;
    }

    if (data && data.length > 0) {
      return (
        <View>
          {data.map((item, index) => {
            return (
              <View
                key={Date.now() + index}
                className="index_list_list-item"
                onClick={() => {
                  onEditData(item);
                }}
              >
                <View className="index_list_list-item-cent">
                  <View className="index_list_list-item-cent-title">
                    {item.title}
                  </View>
                  <View className="index_list_list-item-cent-tags">
                    {item.tags}
                  </View>
                  <View className="index_list_list-item-cent-info">
                    {item.create_time}
                  </View>
                </View>
                <View className="index_list_list-item-img">
                  <Image
                    className="index_list_list-item-img-cent"
                    src={require("@/assets/index_list.png")}
                  />
                </View>
              </View>
            );
          })}
        </View>
      );
    }
  };

  return (
    <View className="index">
      <View className="index_banner" style={{ height: 160 }}>
        {swiperList && swiperList.length > 0 && (
          <Swiper
            className="index_banner-swipe"
            indicatorActiveColor="#05aa9c"
            indicatorColor="#e9e9e9"
            // previousMargin="24px"
            circular
            indicatorDots
            autoplay
            interval={3000}
          >
            {swiperList.map((item, index) => {
              return (
                <SwiperItem key={Date.now() + index}>
                  <View
                    className="index_banner-item"
                    onClick={() => {
                      onEditData(item);
                    }}
                  >
                    <Image
                      className="index_banner-img"
                      src={showImgUrl(index)}
                      alt=""
                    />
                    <View className="index_banner-item-text">
                      <View className="index_banner-item-tit">
                        {item.title}
                      </View>
                      <View className="index_banner-item-info">
                        {item?.create_time}
                      </View>
                    </View>
                    <View className="index_banner-item-new">
                      <Image
                        className="index_banner-item-new-img"
                        src={require("@/assets/new.png")}
                        alt="最新发布"
                      />
                      <View className="index_banner-item-new-text">
                        最新发布
                      </View>
                    </View>
                  </View>
                </SwiperItem>
              );
            })}
          </Swiper>
        )}
      </View>

      {current.hideInfo && (
        <View className="index_top-more">
          <LoginMore
            title="登录查看更多"
            text="登录解锁更多功能。"
            but="注册/登录"
            bc="#7472fa"
          />
        </View>
      )}

      <YTitleTask
        showIcon={false}
        className="index_top-tas"
        title={<View className="index_top-tit">特色服务 </View>}
      />
      <ServiceTab />
      <YTitleTask
        style={{ marginTop: 10 }}
        showIcon={false}
        className="index_top-tas"
        title={<View className="index_top-tit">与我相关 </View>}
      />
      <TagTab current={current} tagData={tagData} getOrderData={getOrderData} />
      <View className="index_list">{renderList(data)}</View>
    </View>
  );
};

const TagTab = (props) => {
  const { tagData, getOrderData, current } = props;
  const [ShowTag, setShowTag] = useState(0);

  return (
    <View className="index_tag">
      <ScrollView
        className="index_tag-scroll"
        scrollX // 横向
        showsHorizontalScrollIndicator={false} // 此属性为true的时候，显示一个水平方向的滚动条。
      >
        {tagData.map((item, index) => {
          return (
            <View
              key={Date.now() + index}
              className={`${
                ShowTag === index
                  ? " index_tag-item index_tag-item-active"
                  : "index_tag-item "
              }`}
              onClick={() => {
                setShowTag(index);
                getOrderData({
                  user_id: current.infoData?.user_id,
                  type: index === 0 ? 1 : 2,
                  tag: item,
                });
              }}
            >
              {item}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const ServiceTab = (props) => {
  const serData = [
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
  ];

  // 打开微信客服
  const onOpenCustomer = async (values) => {
    console.log("打开微信客服 :>> ", values);
    // toast("正在跳转客服，请稍等...");
    // console.log('打开微信客服 :>> ', values);
    // await Taro.openCustomerServiceChat({
    //   extInfo: {
    //     url: values?.url || "https://work.weixin.qq.com/kfid/kfc11914429a6346b01",
    //   }, //客服链接
    //   corpId: CORP_ID,
    //   showMessageCard: true,
    //   success: () => {},
    // });
  };

  return (
    <View className="index_sev">
      <ScrollView
        className="index_sev-scroll"
        scrollX // 横向
        showsHorizontalScrollIndicator={false} // 此属性为true的时候，显示一个水平方向的滚动条。
      >
        {serData.map((item, index) => {
          return (
            <View
              key={Date.now() + index}
              className="index_sev-item"
              style={
                index === 0
                  ? "marginLeft:20px"
                  : index + 1 === serData.length
                  ? "marginRight:20px"
                  : ""
              }
              onClick={() => {
                onOpenCustomer(item);
              }}
            >
              <Image className="index_sev-item-img" src={item.img} alt="" />
              <View className="index_sev-item-text">{item.title}</View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Index;
