/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-05-19 16:32:11
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-05-25 16:26:07
 * @FilePath: \taro-rn-appd:\fanx\zqt-weapp\src\utils\utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Taro from "@tarojs/taro";


/**
 * 判断是否为字符串
 */
export function isString(source) {
    return (
      typeof source === "string" ||
      (!!source &&
        typeof source === "object" &&
        Object.prototype.toString.call(source) === "[object String]")
    );
  }

/* isEmpty */
export function isEmpty(value) {
    // null 或者 未定义，则为空
    if (value === null || value === undefined) {
      return true;
    }
    // 传入空字符串，则为空
    if (typeof value === "string") {
      return value === "";
    }
    // 传入数组长度为0，则为空
    if (value instanceof Array) {
      return !value.length;
    }
    // 传入空对象，则为空
    if (value instanceof Object) {
      return Object.keys(value).length === 0;
    }
    return false;
  }

  
export const getStorageData = async key => {
  let result;
  try {
    const { data } = await Taro.getStorage({ key });
    result = data;
  } catch (error) {
    console.log(error);
  }
  return result;
};