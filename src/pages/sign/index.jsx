/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:16:27
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-04 14:56:49
 * @Description:账号注册
 */
import Taro from "@tarojs/taro";
import { useState, useRef, useEffect } from "react";
import { View, Input, ScrollView, Image, Text } from "@tarojs/components";
import YButton from "@/components/YButton";
import YTitleBorder from "@/components/YTitleBorder";
import TMask from "@/components/tinker/TMask";
import { toast } from "@/utils/tools";
import { loginHandler } from "@/utils/loginHandler";
import selectNo from "@/assets/select_no.png";
import selectItem from "@/assets/select_yes.png";
import close_b from "@/assets/close_b.png";
import rightImg from "@/assets/right.png";
import {  isEmpty } from "@/utils/utils";
import { Register, getList } from "./service";

import "./index.scss";

const Sign = () => {
  const { current } = useRef({
    user_name: "",
    id_code: "",
    contact_name: "",
    contact_phone: "",
    password: "",
    value5: "",
    value6: "",
    value7: "",
  });

  const [popupData, setPopupData] = useState([]);
  const [showBottom, setShowBottom] = useState(false);
  const [popList, setPopList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [check, setCheck] = useState(false);
  const [listValue, setListValue] = useState({});

  useEffect(() => {
    onGetList({ key: "" });
  }, []);

  const onLog = () => {
    console.log("提交--current :>> ", current);
    const {
      user_name,
      contact_phone,
      contact_name,
      id_code,
      password,
      value5,
      value6,
      value7,
    } = current;
    if (isEmpty(user_name)) {
      return toast("请输入企业名称");
    }
    if (isEmpty(contact_phone)) {
      return toast("请输入手机号");
    }
    if (isEmpty(contact_name)) {
      return toast("请输入联系人");
    }
    if (isEmpty(id_code)) {
      return toast("请输入社会信用码");
    }
    // if (!checked) {
    //   return toast("请阅读并同意用户协议和隐私协议");
    // }

    if (isEmpty(popList)) {
      return toast("请选择产业领域");
    }
    const param = {
      user_name,
      id_code,
      contact_name,
      contact_phone,
      password,
    };
    if (value5) {
      popList.push("退役军人创业");
    }
    if (value6) {
      popList.push("大学生创业");
    }
    if (value7) {
      popList.push("留学生创业");
    }
    param.tags = popList.join(",");

    Register({
      ...param,
    })
      .then((res) => {
        toast("注册成功，请登录");
        loginHandler({ ...res });
      })
      .catch(() => {});
  };

  const onGetList = (param) => {
    getList({ ...param })
      .then((res) => {
        console.log("res :>> ", res);
        setPopupData(res.split(","));
      })
      .catch(() => {});
  };

  const onSearchClick = (values) => {
    console.log("values :>> ", values);
    onGetList({ key: values });
  };

  const onSearchClear = (values) => {
    console.log("onSearchClear :>> ", values);
  };

  const onPopClick = (values) => {
    console.log("onPopClick :>> ", values);
    const newPop = popList && popList.length > 0 ? [...popList] : [];
    if (popList && popList.length > 0 && popList.includes(values)) {
      toast("已经存在内容，请选择其他内容！");
    } else {
      newPop.push(values);
      setPopList(newPop);
      current.popListNew = newPop;
    }
  };

  // 删除tag
  const onPopClose = (values) => {
    const popListNew = [...popList];
    console.log(values, "删除tag :>> ", popListNew);
    popListNew.splice(values, 1);
    current.popListNew = popListNew;
    setPopList(popListNew);
  };

  // 查看
  // const cliLook = (values) => {
  //   Taro.downloadFile({
  //     url: values?.pdf,
  //     success: function (res) {
  //       var filePath = res.tempFilePath;
  //       Taro.openDocument({
  //         filePath: filePath,
  //         success: () => {
  //           console.log("打开文档成功");
  //           toast("打开文档成功");
  //         },
  //       });
  //     },
  //   });
  // };

  // console.log("listValue :>> ", listValue);
  return (
    <View className="sign">
      <View className="sign_center">
        <View className="sign_center-tit">账号注册</View>
        <View className="sign_center-tas">
          <YTitleBorder title="企业名称：" />
          <Input
            className="sign_center-input"
            name={"user_name"}
            placeholder="输入企业名称"
            type="text"
            // value={listValue?.["user_name"]}
            onInput={(e) => {
              console.log('onInput :>> ', listValue);
              const newData = { ...listValue };
              newData["user_name"] = e.detail.value;
              current.user_name = e.detail.value;
              setListValue(newData);
            }}
          />
        </View>
        <View className="sign_center-tas">
          <YTitleBorder title="社会信用码：" />
          <Input
            className="sign_center-input"
            name={"id_code"}
            placeholder="输入社会信用码"
            type="text"
            // value={listValue?.["id_code"]}
            onInput={(e) => {
              console.log('onInput :>> ', listValue);
              const newData = { ...listValue };
              newData["id_code"] = e.detail.value;
              current.id_code = e.detail.value;
              setListValue(newData);
            }}
          />
        </View>
        <View className="sign_center-tas">
          <YTitleBorder title="联系人：" />
          <Input
            className="sign_center-input"
            name={"contact_name"}
            placeholder="输入联系人"
            type="text"
            // value={listValue?.["contact_name"]}
            onInput={(e) => {
              const newData = { ...listValue };
              newData["contact_name"] = e.detail.value;
              current.contact_name = e.detail.value;
              setListValue(newData);
            }}
          />
        </View>
        <View className="sign_center-tas">
          <YTitleBorder title="联系电话：" />
          <Input
            className="sign_center-input"
            name={"contact_phone"}
            placeholder="输入手机号"
            type="number"
            // value={listValue?.["contact_phone"]}
            maxlength={11}
            onInput={(e) => {
              const newData = { ...listValue };
              newData["contact_phone"] = e.detail.value;
              current.contact_phone = e.detail.value;
              setListValue(newData);
            }}
          />
        </View>
        <View className="sign_center-tas">
          <YTitleBorder title="登陆密码：" />
          <Input
            className="sign_center-input"
            name={"phone"}
            placeholder="输入登陆密码"
            type="text"
            value={listValue?.["password"]}
            onInput={(e) => {
              const newData = { ...listValue };
              newData["password"] = e.detail.value;
              current.password = e.detail.value;
              setListValue(newData);
            }}
          />
        </View>
        <View className="sign_center-tas">
          <YTitleBorder title="是否退役军人创业：" />
          <YRoad
            onChange={(e) => {
              console.log("e :>> ", e);
              current.value5 = e;
              
            }}
          />
          <Text className="sign_center-tas-info">&nbsp;是</Text>
        </View>
        <View className="sign_center-tas">
          <YTitleBorder title="是否大学生创业：" />
          <YRoad
            onChange={(e) => {
              console.log("e :>> ", e);
              current.value6 = e;
            }}
          />
          <Text className="sign_center-tas-info">&nbsp;是</Text>
        </View>
        <View className="sign_center-tas">
          <YTitleBorder title="是否留学生创业：" />
          <YRoad
            onChange={(e) => {
              console.log("e :>> ", e);
              current.value7 = e;
            }}
          />
          <Text className="sign_center-tas-info">&nbsp;是</Text>
        </View>

        <View
          className="sign_center-tas"
          style={{ width: "100%", justifyContent: "space-between" }}
          onClick={() => {
            setShowBottom(true);
          }}
        >
          <View className="sign_center-tas-lef">
            <YTitleBorder title="产业领域：" />
            {popList && popList.length > 0 ? null : (
              <View className="sign_center-tas-lef-text">请选择产业领域</View>
            )}
          </View>
          <Image className={"sign_center-tas-image"} src={rightImg} />
        </View>
        <View className="sign_center-tas-pop">
          {popList && popList.length > 0
            ? popList.map((item, index) => {
                return (
                  <View
                    className="sign_popup-item"
                    key={index}
                    onClick={() => onPopClick(item)}
                  >
                    <View className="sign_popup-item-text">{item}</View>
                  </View>
                );
              })
            : null}
        </View>

        <View className="sign_center-button">
          <YButton
            yType="default"
            onClick={() => {
              onLog();
            }}
          >
            <View className="sign_center-button-text">注 册</View>
          </YButton>
        </View>
        <View className="sign_center-button">
          <YButton
            yType="grey"
            onClick={() => {
              Taro.navigateBack();
              // Taro.navigateTo({ url: "/pages/login/index" });
            }}
          >
            <View className="sign_center-button-text" style={{ color: "#000" }}>
              去 登 录
            </View>
          </YButton>
        </View>
      </View>
      {/* Popup  */}
      {showBottom && (
        <TMask
          visible
          // onClose={() => {
          //   setShowBottom(false);
          //   setPopList(current.popListNew);
          // }}
        >
          <View className="sign_popup">
            <View className="sign_popup-title">选择产业领域</View>
            {/* <SearchBar
            placeholder="搜索最新政策"
            onSearch={(e) => onSearchClick(e)}
            onClear={(e) => onSearchClear(e)}
          /> */}
            <YTitleBorder title="已选择：" />
            <ScrollView
              className="sign_popup-scroll"
              style={{ height: 50 }}
              scrollY
              scrollWithAnimation
            >
              <View className="sign_popup-list">
                {popList && popList.length > 0 ? (
                  popList.map((item, index) => {
                    return (
                      <View className="sign_popup-item" key={index}>
                        <View className="sign_popup-item-text">{item}</View>
                        <Image
                          className="sign_popup-item-img"
                          mode="aspectFit"
                          src={close_b}
                          onClick={() => {
                            onPopClose(index);
                          }}
                        />
                      </View>
                    );
                  })
                ) : (
                  <View style={{ fontSize: 16, marginLeft: 10 }}>无</View>
                )}
              </View>
            </ScrollView>
            <View className="sign_popup-seg" />
            <YTitleBorder title="选择数据：" />
            <ScrollView
              className="sign_popup-scroll"
              style={{ height: 100 }}
              scrollY
              scrollWithAnimation
            >
              <View className="sign_popup-list">
                {popupData && popupData.length > 0 ? (
                  popupData.map((item, index) => {
                    return (
                      <View
                        className="sign_popup-item sign_popup-select"
                        key={index}
                        onClick={() => onPopClick(item)}
                      >
                        <View className="sign_popup-item-text">{item}</View>
                      </View>
                    );
                  })
                ) : (
                  <View style={{ fontSize: 16, marginLeft: 10 }}>无</View>
                )}
              </View>
            </ScrollView>
            <Image
              className="sign_popup-close"
              mode="aspectFit"
              src={close_b}
              onClick={() => {
                setShowBottom(false);
                setPopList(current.popListNew);
              }}
            />
          </View>
        </TMask>
      )}
    </View>
  );
};

const YRoad = (props) => {
  const { onChange } = props;
  const [check, setCheck] = useState(false);

  return (
    <View
      onClick={(e) => {
        setCheck(!check);
        onChange(!check);
      }}
      onStartShouldSetResponderCapture={(ev) => true}
    >
      <Image
        className="sign_center-tas-radio"
        mode="aspectFit"
        src={check ? selectItem : selectNo}
      />
    </View>
  );
};

export default Sign;
