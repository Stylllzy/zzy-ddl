// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbars: {
      // tabbar所有的子项
      list: [{
        pagePath: "/pages/index/index",
        text: "主页",
        icon: "home-o"
      }, {
        pagePath: "/pages/mine/mine",
        text: "我的",
        icon: "smile-o"
      }],
      active: null
    },
    current: 'index',
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: 'homepage',
        selectedIconPath: 'homepage_fill',
      },
      {
        pagePath: "/pages/mine/mine",
        text: "我的",
        iconPath: 'mine',
        selectedIconPath: 'mine_fill'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // handleChange(e) {
    //   // console.log(e);
    //   let index=e.detail.key;
    //   this.setData({
    //     current: index
    //   })
    //   wx.switchTab({
    //     url: '/pages/'+e.detail.key+'/'+e.detail.key,
    //   })
    // }
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      // console.log(event.detail);
      const index = event.detail;
      // 活跃tabbar子项设置
      this.setData({
        "tabbars.active": index
      });
      // 页面路由
      wx.switchTab({
        url: this.data.tabbars.list[index].pagePath
      });
    },
  }
})
