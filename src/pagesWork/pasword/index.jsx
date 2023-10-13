/*
 * @Author: duanruilong
 * @Date: 2022-10-26 15:55:30
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-12 16:51:48
 * @Description:修改个人密码
 */
import { useState, useEffect } from "react";
import { View, Input, Image } from "@tarojs/components";
import { getStorageData, isEmpty } from "@/utils/utils";
import { loginOutHandler } from "@/utils/loginHandler";
import { toast } from "@/utils/tools";
import YButton from "@/components/YButton";
import YTitleBorder from "@/components/YTitleBorder";
import { getEditInfo } from "./service";
import "./index.scss";

const UsePassword = () => {
  const [dataInfo, setDataInfo] = useState({});
  const [data, setData] = useState({});
  const [oldPle, setOldPle] = useState();
  const [newPle, setNewPle] = useState([]);

  const getUserInfo = async () => {
    getStorageData("userInfo").then((values) => {
      if (!isEmpty(values)) {
        setDataInfo(values);
      }
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const onSubmit = () => {
    console.log("onSubmit :>> ", data);
    if (isEmpty(oldPle)) {
      return toast("请输入用户旧密码验证");
    }
    if (isEmpty(newPle)) {
      return toast("请输入用户新密码");
    }
    getEditInfo({
      user_id: dataInfo?.user_id,
      old_password:oldPle,
      new_password:newPle,
    })
      .then(() => {
        toast("修改成功，重新登陆");
        setTimeout(() => {
          loginOutHandler();
        }, 2000);
      })
      .catch(() => {
      });
  };

  return (
    <View className="useEdit">
      <View className="useEdit_center">
        <YTitleBorder title={`用户名称：${dataInfo?.["contact_name"]}`} />
      </View>
      <View className="useEdit_center">
        <YTitleBorder title="旧密码：" />
        <Input
          className="useEdit_center-input"
          name={"contact_phone"}
          placeholder="输入用户旧密码"
          type="password"
          onInput={(e) => {
            setOldPle(e.detail.value);
          }}
        />
      </View>
      <View className="useEdit_center">
        <YTitleBorder title="新密码：" />
        <Input
          className="useEdit_center-input"
          name={"user_name"}
          placeholder="输入用户新密码"
          type="password"
          onInput={(e) => {
            setNewPle(e.detail.value);
          }}
        />
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
    </View>
  );
};
export default UsePassword;
