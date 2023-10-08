/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-08-10 17:56:04
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-08 17:16:16
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
import { getSetQue, getFeedback } from "./service";
import "./index.scss";

const langPicker = ["默认", "系统优化", "建议", "问题"];

const Question = () => {
  const { current } = useRef({
    area: "",
  });
  const [params] = useState(Current.router.params);
  const [level, setLevel] = useState();

  const eventChannel = Current.page.getOpenerEventChannel();

  useEffect(() => {
    // 问题反馈
    if (params?.type === "feed") {
      Taro.setNavigationBarTitle({
        title: `问题反馈`,
      });
    }
  }, []);

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
      {params?.type === "feed" && (
        <Picker
          className="question_pick"
          mode="selector"
          range={langPicker}
          onChange={(e) => {
            const values = langPicker[e.detail.value];
            current.level = values;
            setLevel(values);
          }}
        >
          <YTitleTask
            showIcon={false}
            className="question_pick-tas"
            infoWith={74}
            title={<View className="question_pick-li">问题类型: </View>}
            right={
              <View className="question_pick-right">
                {level || "请选择问题类型"}
              </View>
            }
          />
        </Picker>
      )}

      <YTitleTask
        style={{ marginTop: 10 }}
        showIcon={false}
        className="question_tas"
        title={<View className="question_tas-tit">问题内容 </View>}
      />
      <View className="question_text">
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
