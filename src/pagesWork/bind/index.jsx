/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-05-19 10:12:59
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-10-19 18:03:14
 * @FilePath: \taro-rn-appd:\fanx\zqt-weapp\src\pages\list\index.jsx
 * @Description: BindPages
 */

import { useRef } from "react";
import Taro,{useDidShow} from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import YNoData from "@/components/YNoData";
import YListView from "@/components/YListView";
import { getStorageData, isEmpty } from "@/utils/utils";
import { toast } from "@/utils/tools";
import { getList,getDelete } from "./service";
import "./index.scss";

const BindPages = () => {
  const listViewRef = useRef(null);
  const { current } = useRef({
    infoData: "",
  });

  const requestList = (param) => {
    listViewRef.current.load({
      ...param,
    });
  };

  useDidShow(() => {
    getStorageData("userInfo").then((values) => {
      current.infoData = values;
      requestList({ user_id: values?.user_id });
    });
  }, []);

  const onEditData = (values) => {
    getDelete({
      user_id: current.infoData?.user_id,
      id_code:values?.id_code
    })
      .then((res) => {
        console.log("res :>> ", res);
        toast("已取消该企业绑定关系");
        requestList({ user_id: current.infoData?.user_id });
    })
      .catch(() => {});
  };

  const renderList = (data) => {
    console.log("data renderList:>> ", data);
    if (isEmpty(data)) {
      console.log("暂无数据 :>> ", data);
      return <YNoData desc={"暂无数据"} />;
    }
    if (data && data.length > 0) {
      return data.map((item, index) => {
        return (
          <View
            key={Date.now() + index}
            className="bind_list-item"
            
          >
            <View className="bind_list-item-cent">
              <View className="bind_list-item-cent-title"> {item.user_name}</View>
              <View className="bind_list-item-cent-info">
              统一社会信用代码:{item.id_code }
              </View>
              <View className="bind_list-item-cent-info">
                联系人:{item.contact_name}
              </View>
              <View className="bind_list-item-cent-info">
                联系人电话:{item.contact_phone}
              </View>
              <View 
                className="bind_list-item-cent-but"
                onClick={() => {
                  onEditData(item);
                }}
              >
                取消该企业绑定
              </View>
            </View>
            <View className="bind_list-item-img">
              <Image
                className="bind_list-item-img-cent"
                src={require("@/assets/policy1.png")}
              />
            </View>
          </View>
        );
      });
    }
  };
  return (
    <View className="bind" >
      <YListView
        classStyle={"bind_list"}
        boxHeight={130}
        renderList={renderList}
        request={getList}
        ref={listViewRef}
        extraParams={{}}
        manual
        pnParams
      />
      <View 
        className="bind_but"
        onClick={() => {
          Taro.navigateTo({
            url: "/pagesWork/useEdit/index?type=bind",
          });
        }}
      >
        <View  className="bind_but-tex" >
        新增企业绑定
      </View>
      </View>
    </View>
  );
};

export default BindPages;
