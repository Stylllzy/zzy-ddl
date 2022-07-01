// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      '../../assets/images/1.jpg',
      '../../assets/images/2.jpg',
      '../../assets/images/3.jpg',
      '../../assets/images/4.jpg',
    ],
    current: 'homepage',
    scrollTop: 600,
    nowDate:''
  },

  handleChange ({ detail }) {
    this.setData({
        current: detail.key
    });
  },

  goToEdit() {
    wx.navigateTo({
      url: '/pages/dayedit/dayedit'
    })
  },
  formatDateTime() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h=h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y+'-'+m + '-' + d;
  },
  GetNumberOfDays(date1,date2){//获得天数
    //date1：开始日期，date2结束日期
    var a1 = Date.parse(new Date(date1));
    var a2 = Date.parse(new Date(date2));
    var day = parseInt((a2-a1)/ (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
    return day
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var nowDate = this.formatDateTime();
    var towDaysBetween = this.GetNumberOfDays('2021-12-11',nowDate);

    this.setData({
      nowDate: nowDate,
      towDaysBetween:towDaysBetween
    })
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
  //   this.getTabBar().setData({
  //     current: 'index'
  //  });
    this.getTabBar().setData({
      // CURRENT_ACTIVE_TABBAR: 自定义常量, 当前页面对应的活跃 tabbar 项
      "tabbars.active": 0,
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
