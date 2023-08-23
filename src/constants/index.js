/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-22 16:32:07
 * @Description:
 */
// import { getStorageData } from "@/utils/utils";

// const useName = getStorageData("use-name");

export const APP_VERSION = "v1.0.0";

export const CORP_ID = "wwd12ceadc854c9a64"; // 客服企业ID

export const CORP_SECRET = "GBa5vGwe_d1CGaeaYFfTtolwF8dA-bcLmZ4DfdY4p7M"; // 客服企业SECRET

export const ENV = 'dev';

export const VERSION = '1.0.0';

export const LOGIN_CHANNEL = "login-channel"; // 登录频道

// export const USERS_KEY = `${NAME}-userid`;

export const LOGIN_PAGE = "/pages/login/index";

export const HOME_PAGE = "/pages/index/index";

export const SYSTEM = "REPRESENT";


// 默认用户信息
export const USER_DEFAULT_ID = "U426729141445162062";
export const USER_DEFAULT_TAG = "互联网,农业,中小微企业,房地产,教育行业";

// 性别
export const MAP_SEX = [
  {
    code: 1,
    value: "男"
  },
  {
    code: 2,
    value: "女"
  }
];

// 商品状态 0下架 1上架 2缺货
export const GOODS_STATUS = {
  0: {
    value: 0,
    text: "下架"
  },
  1: {
    value: 1,
    text: "上架 "
  },
  2: {
    value: 2,
    text: "缺货"
  }
};

// 商品打折状态 0没打折 1打折
export const GOODS_DISCOUNT_STATUS = {
  0: {
    value: 0,
    text: "没打折"
  },
  1: {
    value: 1,
    text: "打折中 "
  }
};

// 订单状态 0用户删除 1待支付 2已支付 3支付超时 4配送中 5已完成
export const ORDER_TYPE = {
  0: {
    value: 0,
    text: "用户删除"
  },
  1: {
    value: 1,
    text: "待支付"
  },
  2: {
    value: 2,
    text: "已支付"
  },
  3: {
    value: 3,
    text: "支付超时"
  },
  4: {
    value: 4,
    text: "配送中"
  },
  5: {
    value: 5,
    text: "已完成"
  }
};

// 货币类型,1人民币 2美元
export const MAP_UNIT = {
  1: "￥",
  2: "$"
};

/**
 * 搜索本地缓存
 */
export const SEARCH_LOCAL = "search-local";

export const COUNTRY = "cn";
