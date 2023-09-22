/*
 * @Author: duanruilong
 * @Date: 2022-08-30 16:29:48
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-21 15:20:19
 * @Description: 政策详情
 */

import Base64 from "base-64";
import Taro, { Current } from "@tarojs/taro";
import { useState, useEffect, useRef } from "react";
import { View, Image, WebView,RichText } from "@tarojs/components";
import YButton from "@/components/YButton";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import { USER_DEFAULT_ID } from "@/constants";
import { getInfo, getApply } from "./service";
import "./index.scss";

const PolicyDetail = () => {
  const [params] = useState(Current.router.params);
  const { windowHeight } = Taro.getSystemInfoSync();

  const { current } = useRef({
    value1: "",
    value2: "",
  });

  const [data, setData] = useState();
  const [showL, setShowL] = useState(true);
  const [shWebView, setShWebView] = useState();

  useEffect(() => {
    getStorageData("userInfo")
      .then((values) => {
        let userData = {};
        if (isEmpty(values)) {
          userData.user_id = USER_DEFAULT_ID;
          current.hideInfo = true;
        } else {
          userData = values;
        }
        current.infoData = userData;

        getStorageData("DAMAGE-ITEM").then((values) => {
          setData(values);
          getInfo({ user_id: userData?.user_id, policy_id: values?.policy_id })
            .then(() => {})
            .catch(() => {});
          setTimeout(() => {
            setShowL(false);
          }, 800);
        });
      })
      .catch(() => {
        current.hideInfo = true;
        current.infoData = { user_id: USER_DEFAULT_ID };
      });
  }, []);

  // 申请
  const cliTip = () => {
    console.log("current :>> ", current);
    getApply({ user_id: current.infoData?.user_id, policy_id: data?.policy_id })
      .then(() => {
        toast("申请政策成功！");
      })
      .catch(() => {});
  };

  // 下载文档
  const cliLook = (values) => {
    console.log("下载文档 :>> ", values);
    toast("正在下载文档，请稍等...");
    Taro.downloadFile({
      url: values?.pdf,
      success: function (res) {
        toast("下载文档成功");
      },
      catch: (e) => {
        console.log("下载文档 catch:>> ", e);
      },
    });
  };

  const webHeight = () => {
    if (data?.title.length < 20) {
      return data?.annex && (data?.annex).split(",").length > 3 ? 200 : 160;
    } else if (20 < data?.title.length >= 40) {
      return data?.annex && (data?.annex).split(",").length > 3 ? 220 : 10;
    } else if (data?.title.length > 40) {
      return data?.annex && (data?.annex).split(",").length > 3 ? 240 : 210;
    } else {
      return data?.annex && (data?.annex).split(",").length > 3 ? 230 : 190;
    }
  };

  console.log("data :>> ", data);
  const rat=`<h1>一、增值税小规模纳税人月销售额10 万元以下免征增值税政策</h1><img ossid=\"rc-upload-1695267995106-4\" src=\"https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/rc-upload-1695267995106-4.png\"><img ossid=\"rc-upload-1695267995106-7\" src=\"https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/rc-upload-1695267995106-7.png\"><img ossid=\"rc-upload-1695267995106-9\" src=\"https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/rc-upload-1695267995106-9.png\"><p><br></p>`
  return (
    <View className="policy">
      <View className="policy_cent-title">{data?.title}</View>
      <View className="policy_cent-clik">
        <View className="policy_cent-info">{data?.create_time}</View>
        {data?.tags && <View className="policy_cent-tag">{data?.tags}</View>}
        {!current.hideInfo && (
          <View className="policy_cent-but">
            <YButton
              yType="primary"
              disabled={params?.type === "dis"}
              onClick={() => {
                cliTip();
              }}
            >
              <View className="policy_cent-but-t">申 请</View>
            </YButton>
          </View>
        )}
      </View>
      {data?.annex && (
        <View className="policy_cent-clik">
          {(data?.annex).split(",").map((item, index) => {
            return (
              <View
                className="policy_cent-down"
                style={{ marginRight: 10, marginBottom: 2 }}
                key={item}
                onClick={() => {
                  // cliLook(data);
                  toast("开始下载，请在状态栏中查看");
                  setShWebView(item);
                  setTimeout(() => {
                    setShWebView();
                  }, 2000);
                }}
              >
                <Image
                  className="policy_cent-down-img"
                  src={require("@/assets/download.png")}
                />
                <View className="policy_cent-down-t">{`下载附件${
                  index + 1
                }`}</View>
              </View>
            );
          })}
        </View>
      )}
      
      <RichText  style={{ padding:10 }} nodes={data?.content} />
        {/* 在线预览 */}
        {/* 
          {showL ? (
            <View className={"policy_cent-load"}>
              <Image
                className={"policy_cent-load-img"}
                src={require("@/components/YListView/loading4.gif")}
                mode="aspectFill"
              />
              资源加载中...
            </View>
          ) : (
            <WebView
              style={{ height: windowHeight - webHeight(), width: 350 }}
              src={
                `https://ysxz.yqybarter.com:8035/onlinePreview?url=` +
                encodeURIComponent(Base64.encode(data?.pdf))
              }
            />
          )}
       */}
      {/* 下载附件 */}
       {/*
      {shWebView && (
        <WebView
          src={decodeURIComponent(shWebView)}
          // style={{ height: windowHeight - 220, width: 350 }}
        />
      )}
       */}

    </View>
  );
};

export default PolicyDetail;
