/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-08-10 17:56:04
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-15 17:49:31
 * @FilePath: \app-taro-project\src\pages\question\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useRef } from "react";
import Taro, { Current } from "@tarojs/taro";
import { View,Textarea } from "@tarojs/components";
import YTitleTask from "@/components/YTitleTask";
import YButton from "@/components/YButton";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import { getSetQue } from "./service";
import "./index.scss";

const Question = () => {
  const { current } = useRef({
    area: "",
  });

  const eventChannel = Current.page.getOpenerEventChannel();

  const cliTip = () => {
    console.log("current :>> ", current);
    if (isEmpty(current?.area)) {
      toast("请填写问题内容。");
      return
    }
    getStorageData("userInfo").then((values) => {
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
    });
  };

  return (
    <View className="question">
      <YTitleTask
        style={{ marginTop:10 }}
        showIcon={false}
        className="question_tas"
        title={<View className="question_tas-tit">问题 </View>}
      />
      <View className="question_text">
        <Textarea
          style="font-size:16px;height:100px;"
          // value={!isEmpty(codeData) ? codeData : ""}
          className="question_text-cent"
          placeholder="请简单提出您的问题"
          onInput={e => {
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
