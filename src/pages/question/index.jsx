/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-08-10 17:56:04
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-12 17:24:44
 * @FilePath: \app-taro-project\src\pages\question\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect, useRef } from "react";
import Taro, { Current } from "@tarojs/taro";
import { View, Textarea, Picker } from "@tarojs/components";
import YTitleTask from "@/components/YTitleTask";
import YButton from "@/components/YButton";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import { getSetQue, getFeedback,getGov } from "./service";
import "./index.scss";
 
const Question = () => {
  const { current } = useRef({
    area: "",
  });
  const [params] = useState(Current.router.params);
  const [level, setLevel] = useState();
  const [langPicker, setLangPicker] = useState([ {name:'部门智能分配'}]);

  const eventChannel = Current.page.getOpenerEventChannel();

  useEffect(() => {
    // 问题反馈
    if (params?.type === "feed") {
      Taro.setNavigationBarTitle({
        title: `问题反馈`,
      });
    }
    getStorageData("userInfo")
    .then((values) => {
      current.infoData = values;
      onGovData(values)
    })
    .catch(() => {});

  }, []);

  const onGovData = (values) => {
    getGov({
      user_id: values?.user_id,
    })
      .then((res) => {
        console.log('部门列表 :>> ', res);
        setLangPicker([{name:'部门智能分配'},...res])
      })
      .catch(() => {});
  };


  const cliTip = () => {
    console.log("current :>> ", current);
    if (isEmpty(current?.area)) {
      toast("请填写问题内容。");
      return;
    }
    getStorageData("userInfo").then((values) => {
      if (params?.type === "feed") {
        getFeedback({
          user_id: values?.user_id,
          content: current?.area,
        })
          .then(() => {
            toast("问题反馈成功");
            setTimeout(() => {
              Taro.navigateBack();
              eventChannel.emit("QuestionPage", "刷新");
            }, 800);
          })
          .catch(() => {});
      } else {
        getSetQue({
          user_id: values?.user_id,
          question: current?.area,
        })
          .then(() => {
            toast("问题发布成功");
            setTimeout(() => {
              Taro.navigateBack();
              eventChannel.emit("QuestionPage", "刷新");
            }, 800);
          })
          .catch(() => {});
      }
    });
  };

  return (
    <View className="question">
      <Picker
        className="question_pick"
        mode="selector"
        rangeKey="name"
        range={langPicker}
        onChange={(e) => {
          const values = langPicker[e.detail.value];
          console.log('langPicker :>> ', values);
          current.level = values?.name;
          setLevel(values?.name);
        }}
      >
        <YTitleTask
          showIcon={false}
          className="question_pick-tas"
          infoWith={74}
          title={<View className="question_pick-li">找部门: </View>}
          right={
            level?
            <View className="question_pick-right">
              {level}
            </View>
            :
            <View className="question_pick-right" style={{ fontSize:12,color:"#777" }}>
                请选择相关部门(不选将智能分配)
            </View>
           
          }
        />
      </Picker>
      <View className="question_tip">
         <View className="question_tip-icon">*</View>默认不选择指定部门，系统将智能分配给对应部门。
      </View>
      <YTitleTask
        style={{ marginTop: 10 }}
        showIcon={false}
        className="question_tas"
        title={<View className="question_tas-tit">问题内容 </View>}
      />
      <View className="question_text"  style={{marginTop:0}}>
        <Textarea
          style="font-size:16px;height:100px;"
          // value={!isEmpty(codeData) ? codeData : ""}
          className="question_text-cent"
          placeholder="请简单提出您的问题"
          onInput={(e) => {
            current.area = e.detail.value;
          }}
        />
      </View>

      <View className="question_button">
        <YButton
          yType="primary"
          onClick={() => {
            cliTip();
          }}
        >
          <View className="question_button-t">立即发布</View>
        </YButton>
      </View>
    </View>
  );
};

export default Question;
