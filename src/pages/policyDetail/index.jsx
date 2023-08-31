/*
 * @Author: duanruilong
 * @Date: 2022-08-30 16:29:48
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-31 16:29:16
 * @Description: 政策详情
 */

// import { WebView } from 'react-native-webview';
import Taro, { Current } from "@tarojs/taro";
import { useState, useEffect, useRef } from "react";
import { View, Text, WebView } from "@tarojs/components";
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
  const [shWebView, setShWebView] = useState(false);

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

  console.log("params :>> ", params);

  return (
    <View className="policy">
      <View className="policy_cent-title">{data?.title}</View>
      <View className="policy_cent-clik">
        <View className="policy_cent-info">{data?.create_time}</View>
        <View className="policy_cent-tag">{data?.tags}</View>
      </View>
      <View className="policy_cent-clik">
        {!current.hideInfo && (
          <View className="policy_cent-but">
            <YButton
              yType="primary"
              disabled={params?.type === "dis"}
              onClick={() => {
                cliTip();
              }}
            >
              <View className="policy_cent-but-t">我要申请</View>
            </YButton>
          </View>
        )}
        <View className="policy_cent-but" style={{ marginLeft: 40 }}>
          <YButton
            yType="primary"
            onClick={() => {
              // cliLook(data);
              toast("开始下载文档，在状态栏中查看");
              setShWebView(true);
              setTimeout(() => {
                setShWebView(false);
              }, 2000);
            }}
          >
            <View className="policy_cent-but-t">下载附件</View>
          </YButton>
        </View>
      </View>
      <View
        className="policy_cent-cont"
        onClick={() => {
          // cliLook(data);
          Taro.setClipboardData({
            data: data?.pdf,
          });
        }}
      >
        * 具体内容下载附件查看，如果下载附件失败可点击
        <Text className="policy_cent-cont-t"> &nbsp;复制附件地址</Text>
        ，打开浏览器下载查看附件
      </View>
      {/* <WebView
        style={{ height: windowHeight - 220, width: 350 }}
        src={data?.pdf}
      /> */}
      {shWebView && (
        <WebView
          src={decodeURIComponent(data?.pdf)}
          // style={{ height: windowHeight - 220, width: 350 }}
        />
      )}
    </View>
  );
};

export default PolicyDetail;
