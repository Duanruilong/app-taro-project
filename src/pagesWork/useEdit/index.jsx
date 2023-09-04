/*
 * @Author: duanruilong
 * @Date: 2022-10-26 15:55:30
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-04 10:41:56
 * @Description:修改个人信息
 */
import { useState, useEffect } from "react";
import { View, Input, Image } from "@tarojs/components";
import { getStorageData, isEmpty } from "@/utils/utils";
import { loginOutHandler } from "@/utils/loginHandler";
import { toast } from "@/utils/tools";
import YButton from "@/components/YButton";
import YTitleBorder from "@/components/YTitleBorder";
import SelectTag from "@/components/SelectTag";
import rightImg from "@/assets/right.png";
import { getEditInfo } from "./service";
import "./index.scss";

const UseEdit = () => {
  const [dataInfo, setDataInfo] = useState({});
  // const [butLoding, setButLoding] = useState(false);
  const [data, setData] = useState({});
  const [showBottom, setShowBottom] = useState(false);
  const [popList, setPopList] = useState([]);

  const getUserInfo = async () => {
    getStorageData("userInfo").then((values) => {
      if (!isEmpty(values)) {
        setDataInfo(values);
        setPopList(values["tag"].split(","));
      }
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const onSubmit = () => {
    console.log("onSubmit :>> ", data);
    if (isEmpty(data)) {
      // setTimeout(() => {
      //   setButLoding(false);
      // }, 600);
      return toast("最少修改一项内容");
    }
    getEditInfo({
      user_id: dataInfo?.user_id,
      ...data,
    })
      .then(() => {
        toast("修改成功，重新登陆");
        setTimeout(() => {
          loginOutHandler();
          // setButLoding(false);
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          // setButLoding(false);
        }, 600);
      });
  };

  return (
    <View className="useEdit">
      <View className="useEdit_center">
        <YTitleBorder title="联系人：" />
        <Input
          className="useEdit_center-input"
          name={"contact_name"}
          placeholder="输入联系人"
          type="text"
          value={dataInfo?.["contact_name"]}
          onInput={(e) => {
            const newData = { ...dataInfo };
            newData["contact_name"] = e.detail.value;
            setData(newData);
            setDataInfo(newData);
          }}
        />
      </View>
      <View className="useEdit_center">
        <YTitleBorder title="联系电话：" />
        <Input
          className="useEdit_center-input"
          name={"contact_phone"}
          placeholder="输入手机号"
          type="text"
          value={dataInfo?.["contact_phone"]}
          onInput={(e) => {
            const newData = { ...dataInfo };
            newData["contact_phone"] = e.detail.value;
            setData(newData);
            setDataInfo(newData);
          }}
        />
      </View>
      <View className="useEdit_center">
        <YTitleBorder title="企业名称：" />
        <Input
          className="useEdit_center-input"
          name={"user_name"}
          placeholder="输入企业名称"
          type="text"
          value={dataInfo?.["user_name"]}
          onInput={(e) => {
            const newData = { ...dataInfo };
            newData["user_name"] = e.detail.value;
            setData(newData);
            setDataInfo(newData);
          }}
        />
      </View>
      <View
        className="useEdit_center"
        onClick={() => {
          setShowBottom(true);
        }}
      >
        <View className="useEdit_center-tas-lef">
          <YTitleBorder title="产业领域：" />
          {popList && popList.length > 0 ? null : (
            <View className="useEdit_center-tas-lef-text">
              请选择产业领域
            </View>
          )}
        </View>
        <Image className={"useEdit_center-tas-image"} src={rightImg} />
      </View>
      <View className="useEdit_center-tas-pop">
        {popList && popList.length > 0
          ? popList.map((item, index) => {
              return (
                <View
                  className="useEdit_center-item"
                  key={index}
                >
                  <View className="useEdit_center-item-text">{item}</View>
                </View>
              );
            })
          : null}
      </View>
      <View className="useEdit-but">
        <YButton
          yType="default"
          // loading={butLoding}
          onClick={() => {
            // setButLoding(true);
            onSubmit();
          }}
        >
          <View className="useEdit-but-t">提 交</View>
        </YButton>
      </View>
      {/* {showBottom} */}
      {showBottom && (
        <SelectTag
          tagValue={dataInfo?.["tag"]}
          onChange={(e) => {
            console.log("onChange :>> ", e);
            const newData = { ...dataInfo };
            newData["tag"] = e.join(",");
            setData(newData);
            setDataInfo(newData);
          }}
          onClose={(e) => {
            setShowBottom(false);
            setPopList(e)
            const newData = { ...dataInfo };
            newData["tag"] = e.join(",");
            setData(newData);
            setDataInfo(newData);
          }}
        />
      )}
    </View>
  );
};
export default UseEdit;
