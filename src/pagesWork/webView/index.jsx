/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:16:27
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-06 17:29:17
 * @Description:文件查看
 */
import { useState, useEffect } from "react";
import Taro, { Current } from "@tarojs/taro";
import { View, WebView } from "@tarojs/components";
import "./index.scss";

const WebViewPage = () => {
  const [params] = useState(Current.router.params);
  console.log("params :>> ", params);
  // const workUrl='https://work.weixin.qq.com/kfid/'
  useEffect(() => {
    if (params?.type==='back') {
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    }
  }, []);

  return (
    <View className="webview">
      <WebView src={params?.url ||''} />
    </View>
  );
};

export default WebViewPage;
