/*
 * @Author: duanruilong
 * @Date: 2022-08-30 16:29:48
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-23 09:57:18
 * @Description: 政策详情
 */

import Taro, { Current } from "@tarojs/taro";
import { useState, useEffect, useRef } from "react";
import { View } from "@tarojs/components";
import YButton from "@/components/YButton";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import { USER_DEFAULT_ID } from "@/constants";
import { getInfo, getApply } from "./service";
import "./index.scss";

const PolicyDetail = () => {
  const [params] = useState(Current.router.params);

  const { current } = useRef({
    value1: "",
    value2: "",
  });

  const [data, setData] = useState();

  useEffect(() => {
    getStorageData("userInfo").then((values) => {
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
    }).catch(() => {
      current.hideInfo = true;
      current.infoData = {user_id:USER_DEFAULT_ID};
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

  // 查看
  const cliLook = (values) => {
    console.log("打开文档 :>> ", values);
    toast("正在打开文档，请稍等...");
    // Taro.downloadFile({
    //   url: values?.pdf,
    //   success: function (res) {
    //     var filePath = res.tempFilePath;
    //     Taro.openDocument({
    //       filePath: filePath,
    //       success: () => {
    //         console.log("打开文档成功");
    //         toast("打开文档成功");
    //       },
    //     });
    //   },
    // });
  };

  console.log("params :>> ", params);
  return (
    <View className="policy">
      <View className="policy_cent-title">{data?.title}</View>
      <View className="policy_cent-info">{data?.create_time}</View>
      <View className="policy_cent-tag">{data?.tags}</View>
      <View className="policy_cent-cont">* 具体内容查看附件</View>

      <View className="policy_but">
        {!current.hideInfo && (
          <View className="policy_but-i">
            <YButton
              yType="primary"
              disabled={params?.type === "dis"}
              onClick={() => {
                cliTip();
              }}
            >
              <View className="policy_but-t">我要申请</View>
            </YButton>
          </View>
        )}

        <View className="policy_but-i">
          {data?.pdf && (
            <YButton
              yType="primary"
              onClick={() => {
                cliLook(data);
              }}
            >
              <View className="policy_but-t">查看附件</View>
            </YButton>
          )}
        </View>
      </View>
    </View>
  );
};

export default PolicyDetail;
