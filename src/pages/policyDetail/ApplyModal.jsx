/*
 * @Author: duanruilong
 * @Date: 2022-08-17 11:24:03
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-26 11:29:14
 * @Description:  申请弹窗
 */
import { useState } from "react";
import Taro, { Current } from "@tarojs/taro";
import { View, Image, Textarea } from "@tarojs/components";
import YButton from "@/components/YButton";
import TMask from "@/components/tinker/TMask";
import YTitleBorder from "@/components/YTitleBorder";
import closeImg from "@/assets/close.png";
import { isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import "./index.scss";

const ApplyModal = ({ data,onClose, onConfirm }) => {
 
  return (
    <TMask visible>
      <View className="policy_msk">
        <Image
          className={"policy_msk-close"}
          src={closeImg}
          mode="aspectFill"
          onClick={() => {
            onClose();
          }}
        />
        <View className="policy_msk-top">申请政策</View>
        <View className="policy_msk-tas">
          <YTitleBorder title="政策名称：" />
          <View className="policy_msk-text">{data.title}</View>
        </View>
        <View className="policy_msk-tas">
          <YTitleBorder title="申请政策所需材料：" />
          <View className="policy_msk-text">{data.apply_material||'暂无'}</View>
        </View>
        <View className="policy_msk-tas">
          <YTitleBorder title="相关部门联系方式：" />
          <View className="policy_msk-text">{data.apply_phone||'暂无'}</View>
        </View>
        <View className="policy_msk-b">
          <YButton
            yType="default"
            onClick={() => {
              onConfirm();
            }}
          >
            <View className="policy_msk-b-c">确定申请该政策</View>
          </YButton>
        </View>
      </View>
    </TMask>
  );
};
export default ApplyModal;
