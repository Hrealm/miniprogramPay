// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bannerClick: function () {
    wx.navigateTo({
      url: '../banner/banner',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  zcClick: function(){
    wx.navigateTo({
      url: '../zcfw/zcfw',
      success: function(){},
      fail:function(){},
      complete:function(){} 
    })
  },
  jrClick: function () {
    wx.navigateTo({
      url: '../jrfw/jrfw',
      success: function () { },
      fail: function () { },
      complete: function () { } 
    })
  },
  kpClick: function () {
    wx.navigateTo({
      url: '../kpfw/kpfw',
      success: function () { },
      fail: function () { },
      complete: function () { } 
    })
  },
  ydQuery: function () {
    wx.navigateTo({
      url: '../ydcx/ydcx',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  zxInquiry: function () {
    wx.navigateTo({
      url: '../zxxj/zxxj',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  contact: function () {
    wx.makePhoneCall({
      phoneNumber: '020-39922019',
    })
  },
  abMore: function () {
    wx.navigateTo({
      url: '../about/about',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})