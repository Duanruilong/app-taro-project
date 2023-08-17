/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-08-16 14:21:00
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-17 17:04:12
 * @FilePath: \app-taro-project\src\components\YInputSearch\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import  { useState, useReducer } from "react";
import { View, Image ,Input} from "@tarojs/components";
import { debounce } from "@/utils/utils";
import imgSearch from "./search.png";
import imgClose from "./close_act.png";
import "./index.scss";

function reducer(state, action) {
  return { ...state, ...action };
}

/**  * @Author: duanruilong  * @Date: 2022-04-07 16:28:14  * @Desc:  YInputSearch */

const YInputSearch = props => {
  const {
    className = "",
    style,
    placeholder,
    initialValue,
    onChange,
    onClearClick,
    clear,
    ...rest
  } = props;

  const [{ value }, dispatch] = useReducer(reducer, {
    value: initialValue
  });

  const request = debounce(value => {
    onChange && onChange(value);
  }, 500);

  const onInput = e => {
    const searchValue = e.detail?.value || undefined;
    dispatch({
      value: searchValue
    });
    request(searchValue);
  };

  const handleClearValue = async e => {
    // e.detail.value = undefined;
    dispatch({
      value: ''
    });
    onInput && onInput(e);
    onClearClick();
  };

  return (
    <View className={`y-input-search ${className}`} style={style}>
      <Image className={"y-input-search-icon"} src={imgSearch} />
        <Input
          className="y-input-search-input"
          placeholder={placeholder}
          type={"text"}
          value={value || ""}
          onInput={onInput}
          {...rest}
        />
        { value && (
        <Image
          className={"y-input-cloison"}
          src={imgClose}
          onClick={handleClearValue}
        />
      )}
    </View>
  );
};

export default YInputSearch;
