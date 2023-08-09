import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  useRef
} from "react";
import Taro from "@tarojs/taro";
import { View, ScrollView, Image, Text } from "@tarojs/components";
import { isEmpty } from "@/utils/utils";
import loading from "./loading4.gif";
import "./index.scss";

/**
 *  @Author: duanruilong
 *  @Date: 2022-04-07 10:26:24
 *  @Desc:  YListView
 **/

const YListView = forwardRef((props, ref) => {
  const {
    renderList,
    renderInitLoading,
    request,
    extraParams = {},
    pnParams = false, // 翻页请求数据。默认不翻页
    onRefresh,
    classStyle,
    manual = false,
    boxHeight = 140, // 滚动区域动态计算高度
    ...rest
  } = props;

  const { windowHeight } = Taro.getSystemInfoSync();
  const { current } = useRef({
    params: { ...extraParams },
    pnParams: { pn: 1, ps: 20 }
  });
  const [refresherTriggered, setRefresherTriggered] = useState(false);
  const [data, setData] = useState();
  const [pullUping, setPullUping] = useState(false);
  const moreData = data && data.records && data.tc > data.records.length;
  const moreDataText = pullUping ? "加载中..." : moreData ? "上拉加载更多" : "";

  const getData = (opts, callback) => {
    current.params = pnParams
      ? { ...current.params, ...current.pnParams, ...opts }
      : { ...current.params, ...opts };
    request(current.params)
      .then(res => {
        if (res.pn && res.pn > 1) {
          setData({
            ...res,
            records: (data.records || []).concat(res.records || [])
          });
        } else {
          setData(res);
        }
        if (pnParams) {
          current.pnParams.pn = (res.pn || 1) + 1;
        }
        callback && callback(res);
      })
      .catch(() => {});
  };

  // 上拉加载更多
  const onPullUp = () => {
    // console.log(pullUping, "onPullUp----222 :>> ", moreData);
    if (!moreData || pullUping) {
      return;
    }
    setPullUping(true);
    getData({}, () => {
      setPullUping(false);
    });
  };

  // 下拉刷新
  const onScrollToUpper = () => {
    setRefresherTriggered(true);
    getData(pnParams ? { pn: 1 } : {}, () => {
      setTimeout(() => {
        setRefresherTriggered(false);
      }, 800);
    });
  };

  useEffect(() => {
    if (!manual) {
      getData();
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      load: (opts = {}, callBack) => {
        getData({ ...opts }, callBack);
      }
    }),
    []
  );

  return (
    <ScrollView
      style={{ height: windowHeight - boxHeight }}
      className={classStyle}
      scrollY
      refresherEnabled
      onScrollToUpper={onScrollToUpper}
      refresherThreshold={40}
      lowerThreshold={100}
      scrollWithAnimation
      onScrollToLower={onPullUp}
      refresherTriggered={refresherTriggered}
      refresherBackground={"#F3F5F8"}
      {...rest}
    >
      {refresherTriggered && (
        <View className={"y-list-view-load"}>
          <Image
            className={"y-list-view-load-img"}
            src={loading}
            mode="aspectFill"
          />
          刷新中...
        </View>
      )}
      {data && renderList(data)}
      <View className={"y-list-view-pul"}>
        {pullUping && !isEmpty(data.records) && data.records?.length > 0 && (
          <Image
            className={"y-list-view-load-img"}
            src={loading}
            mode="aspectFill"
          />
        )}
        <Text>{pullUping ? moreDataText : ""}</Text>
      </View>
    </ScrollView>
  );
});

export default YListView;
