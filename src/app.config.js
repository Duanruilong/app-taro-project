/*
 * @Author: Drlong drl1210@163.com
 * @Date: 2023-08-09 10:53:12
 * @LastEditors: Drlong drl1210@163.com
 * @LastEditTime: 2023-09-13 17:20:04
 * @FilePath: \app-taro-project\src\app.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line no-undef
export default defineAppConfig({
  pages: [
    'pages/guide/index',
    'pages/index/index',
    'pages/search/index',
    'pages/list/index',
    'pages/user/index',
    "pages/login/index",
    "pages/sign/index",
    "pages/question/index",
    "pages/policyDetail/index",
    // "follow/index",
    // "apply/index",
    // "history/index",
    // "useEdit/index",
  ],
  subPackages: [
    {
      root: "pagesWork/",
      pages: [
        "webView/index",
        "useEdit/index",
        "follow/index",
        "apply/index",
        "history/index",
        "notice/index",
      ]
    }
  ],
  preloadRule: {
    "pages/index/index": {
      network: "all",
      packages: ["pagesWork"]
    }
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#8c8c8c",
    selectedColor: "#000000",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assets/index.png",
        selectedIconPath: "assets/index_sel.png"
      },
      {
        pagePath: "pages/search/index",
        text: "政策",
        iconPath: "assets/search.png",
        selectedIconPath: "assets/search_sel.png"
      },
      {
        pagePath: "pages/list/index",
        text: "信息",
        iconPath: "assets/list.png",
        selectedIconPath: "assets/list_sel.png"
      },
      {
        pagePath: "pages/user/index",
        text: "我的",
        iconPath: "assets/user.png",
        selectedIconPath: "assets/user_sel.png"
      }
    ]
  }
})
