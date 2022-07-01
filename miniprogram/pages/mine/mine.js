// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /* 用户授权 */
  async login() {
    // 用户授权获取信息
    const { userInfo } = await wx.getUserProfile({
      desc: '用于完善个人资料',
    })
    // console.log(userInfo)

    // 将信息交给后端，存储生成账号
    const { result: { data } } = await wx.cloud.callFunction({
      name: 'login',
      data: {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      }
    })

    // 将用户信息本地存储
    wx.setStorageSync('userInfo', data)

    this.setData({
      userInfo: data
    })
  },

  /*获取用户信息 */
  async getUserInfo() {
    // 用户是否登录
    const data = wx.getStorageSync('userInfo')
    if (data) {
      // 已登录，请求数据
      const userInfo = await wx.cloud.database().collection('userinfo').doc(data._id).get()
      // console.log(userInfo)
      // 同步数据
      this.setData({
        userInfo: userInfo.data
      })
    }
  },

  /*注销  */
  logout() {
    wx.clearStorage()
    this.setData({
      userInfo: null
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getUserInfo()

    // this.getTabBar().setData({
    //   current: 'mine'
    // });
    this.getTabBar().setData({
      // CURRENT_ACTIVE_TABBAR: 自定义常量, 当前页面对应的活跃 tabbar 项
      "tabbars.active": 1
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})