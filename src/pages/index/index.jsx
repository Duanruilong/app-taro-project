/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-09 17:53:39
 * @Description: 消息通知
 */
import { useState, useEffect, useRef } from "react";
import Taro  from "@tarojs/taro";
import { View, Image, Swiper, SwiperItem } from "@tarojs/components";
// import YTitleTask from "@/components/YTitleTask";
// import YButton from "@/components/YButton";
import YSafeAreaView from "@/components/YSafeAreaView";
// import { toast } from "@/utils/tools";
import { getStorageData, isEmpty } from "@/utils/utils";
import { loginOutHandler } from "@/utils/loginHandler";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";
import banner4 from "@/assets/banner4.jpg";
// import logo from "@/assets/logo.png";
import { getNewList, getOrderPay } from "./service";
import "./index.scss";

const Index = () => {
  const { current } = useRef({
    pnParams: { pn: 1, ps: 20 },
  });
  const [data, setData] = useState();
  const [tagData, setTagData] = useState(["默认"]);
  const [ShowTag, setShowTag] = useState(0);

  const [swiperList, setSwiperList] = useState([]);

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
    Taro.setStorage({
      key: `userInfo`,
      data: { contact_name: "龙大",
      contact_phone: "13012345678",
      id_code: "2023052677777",
      tag: "互联网,农业,中小微企业,房地产,教育行业",
      user_id: "U426729141445162062",
      user_name: "云通政企有限公司" }
    });
    getStorageData("userInfo").then((values) => {
      if (isEmpty(values)) {
        loginOutHandler();
      } else {
        current.infoData = values;
        const tagNew = values?.tag.split(",");

        setTagData(["默认", ...tagNew]);
        getNewData({ user_id: values?.user_id });
        getOrderData({ user_id: values?.user_id, type: 1 });
      }
     
    });

    // TODO:
    // Taro.switchTab({
    //   url: "/pages/user/index"
    // });
    // Taro.navigateTo({
    //   url: "/pagesWork/useEdit/index",
    // });
  }, []);


  const onEditData = async (values) => {
    await Taro.setStorage({
      key: "DAMAGE-ITEM",
      data: values,
    });
    Taro.navigateTo({
      url: `/pagesWork/policyDetail/index`,
    });
  };

  const showImgUrl=(values)=>{
    if (values ===0) {
      return banner1
    }
    if (values ===1) {
      return banner2
    }
    if (values ===2) {
      return banner3
    }
    if (values ===3) {
      return banner4
    }
    return banner1
  }

  
  return (
    <YSafeAreaView className="index">
      <View className="index_banner" style={{ height: 150 }}>
        {
          swiperList && swiperList.length > 0 && 
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
                <SwiperItem key={item}>
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
                      <View className="index_banner-item-tit">{item.title}</View>
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
                      <View className="index_banner-item-new-text">最新发布</View>
                    </View>
                  </View>
                </SwiperItem>
              );
            })}
          </Swiper>
        }
       
      </View>
     <View className={"index-tit-r"}>消息通知</View>
    </YSafeAreaView>
  );
};

export default Index;
