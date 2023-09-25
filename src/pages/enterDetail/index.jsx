/*
 * @Author: duanruilong
 * @Date: 2022-08-30 16:29:48
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-25 16:40:01
 * @Description: 企业信息详情
 */

import Base64 from "base-64";
import Taro, { Current } from "@tarojs/taro";
import { useState, useEffect, useRef } from "react";
import { View, Image, WebView, RichText } from "@tarojs/components";
import YButton from "@/components/YButton";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import { USER_DEFAULT_ID } from "@/constants";
import { getInfo, getApply } from "./service";
import "./index.scss";

const EnterDetail = () => {
  const [params] = useState(Current.router.params);
  const { windowHeight } = Taro.getSystemInfoSync();
  const { current } = useRef({
    value1: "",
    value2: "",
  });

  const [data, setData] = useState();
  const ColoData = [
    "#e48935",
    "#cf7cdf",
    "#df7c7c",
    "#3ebbbf",
    "#503ebf",
    "#bf3e3e",
  ];

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
        });
      })
      .catch(() => {});
  }, []);

  // 申请
  // const cliTip = () => {
  //   console.log("current :>> ", current);
  //   getApply({ user_id: current.infoData?.user_id, enterDet_id: data?.enterDet_id })
  //     .then(() => {
  //       toast("申请政策成功！");
  //     })
  //     .catch(() => {});
  // };

  console.log("data :>> ", data);
  const mock =
    "华为技术有限公司，创立于1987年，总部位于广东省深圳市龙岗区。华为是全球领先的信息与通信技术（ICT）解决方案供应商，专注于ICT领域，坚持稳健经营、持续创新、开放合作，在电信运营商、企业、终端和云计算等领域构筑了端到端的解决方案优势，为运营商客户、企业客户和消费者提供有竞争力的ICT解决方案、产品和服务，并致力于实现未来信息社会、构建更美好的全联接世界。";
  return (
    <View className="enterDet">
      {/* top */}
      <View className="enterDet_top">
        <View className="enterDet_top-title">
          {data?.enterprise_name || "xxx有限公司"}
          {data?.operate_state && <View className="enterDet_top-type">{data?.operate_state}</View>}
        </View>
        {/* <View className="enterDet_top-tag">
          {data?.tag.split(",").map((item) => {
            return (
              <View key={item} className="enterDet_top-tag-item">
                {item}
              </View>
            );
          })}
        </View> */}
        <View className="enterDet_top-tag">
          {data?.tag &&
            data?.tag.split(",").map((item) => {
              return (
                <View key={item} className="enterDet_top-tag-items">
                  {item}
                </View>
              );
            })}
        </View>
        <View className="enterDet_top-brief">
          <View className="enterDet_top-brief-info">简介：</View>
          <View className="enterDet_top-brief-item">{data?.introduction || "暂无信息"}</View>
        </View>
        <View className="enterDet_top-brief">
          <View className="enterDet_top-brief-info">经营范围：</View>
          <View className="enterDet_top-brief-item">
            {data?.scope || "暂无信息"}
          </View>
        </View>
      </View>
      {/* time */}
      <View className="enterDet_time">
        <View className="enterDet_time-list">
          <View className="enterDet_time-list-info">营业期限</View>
          <View className="enterDet_time-list-item">
            {data?.enterprise_register_time || "暂无"}&nbsp;至&nbsp;
            {data?.allow_date || "无固定期限"}
          </View>
        </View>
        <View className="enterDet_time-list">
          <View className="enterDet_time-list-info">核准日期</View>
          <View className="enterDet_time-list-item">
            {data?.allow_date || "暂无"}
          </View>
        </View>
        <View className="enterDet_time-list">
          <View className="enterDet_time-list-info">登记机关</View>
          <View className="enterDet_time-list-item">
            {data?.registration_department || "暂无"}
          </View>
        </View>
      </View>
      {/* 电话 */}
      <View className="enterDet_time">
        <View className="enterDet_time-list">
          <View className="enterDet_time-list-info">电话</View>
          <View className="enterDet_time-list-item enterDet_time-list-col">
            {data?.enterprise_phone || "暂无信息"}
          </View>
        </View>
        <View className="enterDet_time-list">
          <View className="enterDet_time-list-info">邮箱</View>
          <View className="enterDet_time-list-item enterDet_time-list-col">
            {data?.enterprise_email || "暂无信息"}
          </View>
        </View>
        <View className="enterDet_time-list">
          <View className="enterDet_time-list-info">地址</View>
          <View className="enterDet_time-list-item enterDet_time-list-col">
            {data?.enterprise_address || "暂无信息"}
          </View>
        </View>
      </View>
      {/* 股东信息 */}
      <View className="enterDet_personnel">
        <View className="enterDet_personnel-title">工商股东信息</View>
        {!isEmpty(data?.shareholder)  ? data?.shareholder.map((item, index) => {
          return (
            <View key={item} className="enterDet_personnel-box">
              <View className="enterDet_personnel-cent">
                <View
                  className="enterDet_personnel-cent-logo"
                  style={{ backgroundColor: ColoData[index > 5 ? 2 : index] }}
                >
                  {item.name.slice(0, 1) || "企"}
                </View>
                <View className="enterDet_personnel-cent-title">
                  {item.name || "暂无信息"}
                  {false && (
                    <View className="enterDet_personnel-cent-tag">大股东</View>
                  )}
                </View>
              </View>
              <View className="enterDet_personnel-li">
                <View className="enterDet_personnel-list">
                  <View className="enterDet_personnel-list-info">持股比例</View>
                  <View className="enterDet_personnel-list-item">
                    {item?.ratio || "暂无信息"}
                  </View>
                </View>
                <View className="enterDet_personnel-list">
                  <View className="enterDet_personnel-list-info">
                    工商股东类型
                  </View>
                  <View className="enterDet_personnel-list-item">
                    {item?.type || "暂无信息"}
                  </View>
                </View>
              </View>
              <View className="enterDet_personnel-li">
                <View className="enterDet_personnel-list">
                  <View className="enterDet_personnel-list-info">
                    认缴出资额
                  </View>
                  <View className="enterDet_personnel-list-item">
                    {item?.quota || "暂无信息"}
                  </View>
                </View>
                {/* <View className="enterDet_personnel-list">
                  <View className="enterDet_personnel-list-info">
                    认缴出资日期
                  </View>
                  <View className="enterDet_personnel-list-item">
                    {data?.ddd || "暂无信息"}
                  </View>
                </View> */}
              </View>
            </View>
          );
        }):<View className="enterDet_personnel-cent" style={{marginTop:10}}>
        <View
          className="enterDet_personnel-cent-logo"
          style={{ backgroundColor: ColoData[3] }}
        >
          企
        </View>
        <View className="enterDet_personnel-cent-title">
          暂无信息
        </View>
      </View>}
      </View>
      {/* 主要人员 */}
      <View className="enterDet_personnel">
        <View className="enterDet_personnel-title">主要人员</View>
        {data?.key_personnel.split(";").map((item, index) => {
          return (
            <View key={item} className="enterDet_personnel-box">
              <View className="enterDet_personnel-cent">
                <View
                  className="enterDet_personnel-cent-logo"
                  style={{
                    backgroundColor: ColoData[index > 5 ? 2 : index + 1],
                  }}
                >
                  {item.split(",")[0].slice(0, 1) || "企"}
                </View>
                <View className="enterDet_personnel-cent-tit">
                  <View className="enterDet_personnel-cent-title">
                    {item.split(",")[0] || "暂无信息"}
                  </View>
                  <View className="enterDet_personnel-cent-tags">
                    {false && (
                      <View className="enterDet_personnel-cent-tag">
                        大股东
                      </View>
                    )}
                    {false && (
                      <View className="enterDet_personnel-cent-tag enterDet_personnel-cent-tag1">
                        疑似实控人
                      </View>
                    )}
                  </View>
                  <View className="enterDet_personnel-cent-info">
                    {item.split(",")[1]}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default EnterDetail;
