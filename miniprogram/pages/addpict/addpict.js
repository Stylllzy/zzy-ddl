// pages/addpict/addpict.js
const db = wx.cloud.database();//初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: {}
  },

  // 上传图片
  upload() {
    // 1.选择图片
    wx.chooseImage({
      count: 1,//当前图片选择个数, 小程序最多支持一下选择9张
      sizeType: ['original', 'compressed'], //['源文件','压缩文件']
      sourceType: ['album', 'camera'],//文件来源  ['相册','摄像头牌照']
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片(图片临时路径)
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths) //tempFilePaths是数组
        wx.cloud.uploadFile({
          //cloudPath: 'example.png', // 上传至云端的路径
          //图片名字 先用时间戳代替了,看自己喜好
　　　　　　cloudPath: new Date().getTime()+'.png',
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            db.collection('pictures').add({
              data: {
                fileID: res.fileID
              }
            }).then(res => {
              console.log(res)
            }).catch(err => {
              console.error(err)
            })
          },
          fail: console.error
        })
      }
    })
  },

  // 获取图片 并且展示  先获取当前用户登录的openid再去对应的  拿数据
  getFile() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('pictures').where({
        _openid:res.result.openid
      }).get().then(res2=>{
        console.log(res2)
        this.setData({
          images: res2.data
        })
      })
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