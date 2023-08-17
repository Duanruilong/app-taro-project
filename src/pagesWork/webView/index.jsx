/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:16:27
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-17 15:15:01
 * @Description:文件查看
 */
import { useState  } from "react";
import   { Current } from "@tarojs/taro";
import { View,WebView } from "@tarojs/components";
import "./index.scss";

const WebViewPage = (props) => {
const {url='https://xssq-1257939190.cos.ap-chengdu.myqcloud.com/zqt/User%20Agreement.pdf'}=props
const [params] = useState(Current.router.params);
 console.log('params :>> ', params);
  return (
    <View className="webview">
        <WebView src={url}   />
    </View>
  );
};
 

export default WebViewPage;
