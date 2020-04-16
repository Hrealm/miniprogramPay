//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {

        wx.request({
          // url: 'http://192.168.0.66:9010/20040',
          url: 'https://trade.gdzxjy.net/20040',
          header: {
            'content-type': 'application/json'
          },
          method: 'POST', 
          data: {
            "hd": {
              "pi": 20040,
              "si": '',
              "sq": 59
            },
            "bd": {
              "tid": 385,
              "code": res.code
            }
          },
          success: res =>{
            // console.log(res.data.bd)
            if (res.data.bd){
              var obj = JSON.parse(res.data.bd)
              this.globalData.openid = obj.open
            }else{
              // 实盘未上线，暂不提示
              // wx.showModal({
              //   title: '提示',
              //   content: res.data.hd.rmsg,
              // })
              // return
            }
            
            // console.log(this.globalData.openid)
            
            if(this.userInfoReadyCallback){
              this.userInfoReadyCallback(res)
            }
          },
          fail: e => {
            console.log(e)
          }
        })


        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    code: null,
    openid: null
  }
})