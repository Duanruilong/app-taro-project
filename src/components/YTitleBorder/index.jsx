/*
 * @Author: duanruilong
 * @Date: 2022-10-26 11:39:50
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-08-17 10:09:17
 * @Description:
 */
// import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

const YTitleBorder = props => {
  const {  className = '' } = props
  return (
    <View
      className={`y-title_border ${className}`}
    >
      <View className={'y-title_border-text'}>
        {props.title}
      </View>
    </View>
  )
}

export default YTitleBorder
