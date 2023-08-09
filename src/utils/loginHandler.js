/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-05-25 16:31:26
 * @Description:
 */
import Taro from "@tarojs/taro";
import { SYSTEM, LOGIN_PAGE, HOME_PAGE } from "@/constants";
import http from "../utils/http";

const { post } = new http("sso", { ignoreErrorTips: true });

export function loginByWxCode(params) {
  return post("/user/login-by-wechatapp-code", params, { useMock: false });
}

let session = () => {
  const data = getUserId() || {};
  console.log("res--session :>> ", data);
  return data;
};

// let session = Taro.getStorageSync(SESSION_KEY);

export function loginHandler(data = {}) {
  console.log("loginHandler--> data :>> ", data);
  const { id_code, user_name, user_id, noHistory } = data;
  if (id_code || user_id) {
    Taro.setStorage({
      key: "use-name",
      data: user_name
    });
    Taro.setStorage({
      key: `${user_name}-user_id`,
      data: user_id
    });
    Taro.setStorage({
      key: `userInfo`,
      data: { ...data }
    });

    Taro.removeStorage({
      key: "clerk",
      success: function() {}
    });
    session = id_code;
  }
  if (!noHistory) {
    // Taro.reLaunch({ url: HOME_PAGE });
    Taro.switchTab({
      url: HOME_PAGE
    });
  }
}

export function loginOutHandler() {
  session = null;
  Taro.clearStorage(); //清理本地数据缓存
  Taro.reLaunch({ url: LOGIN_PAGE });
}

export async function getUserId() {
  let useName, dataId;
  await Taro.getStorage({
    key: "use-name"
  })
    .then(res => {
      if (res.data) {
        useName = res.data;
      }
    })
    .catch(() => {});
  if (useName) {
    await Taro.getStorage({
      key: `${useName}-user_id`
    })
      .then(res => {
        if (res.data) {
          dataId = res.data;
        }
      })
      .catch(() => {});
  }
  return dataId;
}

export async function updateSession() {
  const loginWx = await Taro.login();
  try {
    const res = await loginByWxCode({ code: loginWx.code, system: SYSTEM });
    session = res.id_code;
    // Taro.setStorage({
    //   key: SESSION_KEY,
    //   data: session
    // });
  } catch (e) {}
  return session;
}
