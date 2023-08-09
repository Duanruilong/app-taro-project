/* eslint-disable @typescript-eslint/no-shadow */
/*
 * @Author: duanruilong
 * @Date: 2022-07-22 17:25:19
 * @LastEditors: duanruilong
 * @LastEditTime: 2022-08-16 11:38:37
 * @Description:组件
 */
import Taro from "@tarojs/taro";

let isToast = false;

let count = 0;

export function showLoading(option) {
  count++;
  if (isToast) {
    return;
  }
  if (count <= 1) {
    Taro.showToast({ title: "", icon: "loading", duration: 10000, ...option });
  }
}
export function hideLoading() {
  if (count > 0) {
    count--;
  }
  if (isToast) {
    return;
  }
  if (count === 0) {
    Taro.hideToast();
  }
}
export function showToast(option) {
  Taro.showToast(option);
  isToast = true;
  count = 0;
}
export function toast(title = "", options, callback) {
  showToast({
    title,
    icon: "none",
    mask: false,
    duration: 2000,
    ...options
  });

  const timer = setTimeout(() => {
    clearTimeout(timer);
    isToast = false;
    if (callback) {
      callback();
    }
  }, options?.duration || 2000);
  return false;
}

/**
 * 时间格式化
 * 入参
 * {number} {required} ：时间戳
 * {string} ：格式类型，默认yyyy-MM-dd hh:mm:ss
 */
export function formatDate(_date, _format = "yyyy-MM-dd hh:mm:ss") {
  if (!_date) {
    return "";
  }
  const date = new Date(_date);
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  let format = _format;
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      date
        .getFullYear()
        .toString()
        .substr(4 - RegExp.$1.length)
    );
  }
  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : `00${o[k]}`.substr(o[k].toString().length)
      );
    }
  });
  return format;
}
