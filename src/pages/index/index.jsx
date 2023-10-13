/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-13 10:13:00
 * @Description: 消息通知
 */
import { useState, useEffect, useRef } from "react";
import Taro,{useDidShow} from "@tarojs/taro";
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
import { toast } from "@/utils/tools";
import { getStorageData, isEmpty } from "@/utils/utils";
// import { loginOutHandler } from "@/utils/loginHandler";
import { USER_DEFAULT_ID, USER_DEFAULT_TAG } from "@/constants";
import { getNewList, getOrderPay,getBanner } from "./service";
import "./index.scss";

const Index = () => {
  const { current } = useRef({
    pnParams: { pn: 1, ps: 20 },
    hideInfo: false,
  });
  const [tagData, setTagData] = useState(["默认",'税收政策','银行政策']);
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

  // Banner
  const getBannerData = (opts) => {
    getBanner({
      ...opts,
    })
      .then((res) => {
        console.log('Banner :>> ', res);
        setSwiperList(res);
      })
      .catch(() => {});
  };

  // useEffect(() => {
  //   // TODOO:
  //   Taro.navigateTo({
  //     url: "/pages/guide/index",
  //   });
  // }, []);

  useDidShow(() => {
    // TODOO:
    // Taro.clearStorage(); //清理本地数据缓存
    // Taro.setStorage({
    //   key: `userInfo`,
    //   data: {
    //     contact_name: "龙大",
    //     contact_phone: "13012345678",
    //     id_code: "2023052677777",
    //     tag: "互联网,农业,中小微企业,房地产,教育行业,退役军人创业",
    //     user_id: "U426729141445162062",
    //     user_name: "云通政企有限公司",
    //   },
    // });
    // TODOO: end


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
        setTagData(["默认",'税收政策','银行政策', ...tagNew]);
        // getNewData({ user_id: userData?.user_id });
        getOrderData({ user_id: userData?.user_id, type: 1 });
        getBannerData({ user_id: userData?.user_id });
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
    //   url: "/pages/guide/index",
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
      return "https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/icon/banner4.jpg";
    }
    if (values === 1) {
      return "https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/icon/banner3.jpg";
    }
    if (values === 2) {
      return "https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/icon/banner2.jpg";
    }
    if (values === 3) {
      return "https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/icon/banner1.jpg";
    }
    return "https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/icon/banner4.jpg";
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
                  {item.tags && (
                    <View className="index_list_list-item-cent-tags">
                      {item.tags}
                    </View>
                  )}
                  <View className="index_list_list-item-cent-info">
                    {item.create_time}
                  </View>
                </View>
                <View className="index_list_list-item-img">
                  <Image
                    className="index_list_list-item-img-cent"
                    src={require("@/assets/policy1.png")}
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
      <View className="index_banner" style={{ height: 230 }}>
      
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
                      src={item?.icon||showImgUrl(index)}
                      alt=""
                    />
                    <View className="index_banner-item-text">
                      <View className="index_banner-item-tit">
                        {item.title.slice(0,20)}
                        {item.title.length>19?'...':''}
                      </View>
                      <View className="index_banner-item-info">
                        {item?.create_time}
                      </View>
                    </View>
                    <View className="index_banner-item-new">
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

        <View className="index_banner-top">
          云通政企
        </View>
      </View>
      
      {/*找政府 */}
      <ServiceTab current={current} />

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

  const typeValue=(values)=>{
    if (values===0) {
      return 1
    }
    if (values===1) {
      return 3
    }
    if (values===2) {
      return 4
    }
    return 2
    
  }

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
                  type: typeValue(index),
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
  const { current } = props;
  const serData = [
    {
      title: "找政府",
      info: "为企业提供全面、多元化服务",
      url: "pages/question/index",
      type:'url',
      img: require("./asset/gov.png"),
    },
    {
      title: "找政策",
      info: "惠企利民政策一键直达、助企服务",
      url: 'pages/search/index',
      type:'tab',
      img: require("./asset/gov1.png"),
    },
    {
      title: "找企业",
      info: "快速查找企业、全面解读企业信息",
      url: 'pages/enterprise/index',
      type:'tab',
      img: require("./asset/gov2.png"),
    },
    {
      title: "找帮助",
      info: "提供政策解读、疑惑答疑、法律援助等便捷服务",
      url: "pages/help/index",
      type:'url',
      img: require("./asset/gov3.png"),
    },
  ];

  // 跳转
  const onOpenCustomer = async (values) => {
    if (values?.type==='tab') {
      Taro.switchTab({
        url: values?.url
      });
    } else {
      Taro.navigateTo({
        url: values?.url
      });
    }
 
   
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
                if (current.hideInfo) {
                  toast("注册登录查看更多");
                  return;
                } else {
                  onOpenCustomer(item);
                }
              }}
            >
              <Image className="index_sev-item-img" src={item.img} alt="" />
              <View className="index_sev-item-center" 
                onClick={() => {
                  if (current.hideInfo) {
                    toast("注册登录查看更多");
                    return;
                  } else {
                    onOpenCustomer(item);
                  }
                }}
              >
                <View className="index_sev-item-text">
                  {item?.title}
                </View>
                <View className="index_sev-item-info">
                  {item?.info}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Index;
