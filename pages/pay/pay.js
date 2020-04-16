// pages/pay/pay.js

//获取应用实例
const app = getApp()

// 倒计时
var micro_timer;
function count_down_wrap(that){
  var total_micro_second = that.data.time * 60 * 1000;  //默认5分钟总毫秒数
  count_down(that, total_micro_second);
}

function count_down(that,total_micro_second) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second)
  });
  if(total_micro_second <= 0){
    that.setData({
      clock: '00:00'
    });
    clearTimeout(micro_timer);
    return;
  }
  // 递归
  micro_timer = setTimeout(function () {
    total_micro_second -= 100;
    count_down(that, total_micro_second);  //递归
  }, 100)

}

// 时间格式输出，14:59
function date_format(micro_second){
  // 总秒数
  var second = Math.floor(micro_second / 1000);
  // 分钟
  var min = fill_zero_prefix(Math.floor(second / 60));
  // 秒
  var sec = fill_zero_prefix(Math.floor(second % 60));
  return `00 : ${min} : ${sec}`;
}

// 位数不足补零
function fill_zero_prefix(num){
  return num < 10 ? "0" + num : num;
}



Page({

  /**
   * 页面的初始数据
   */
  data: {
    clock: '00:00',
    time: 5,
    amount: '100',
    waybill: '202003031133',

    // wid: null,
    // sessionId: 0,
    // type: 0,
    _timeStamp: 0,
    _nonceStr: null,
    _package: null,
    _signType: null,
    _paySign: null,
    // _open: null,
    isClicked: false
  },


  // 确认支付
  comfirmPay: function(){
    
    // 添加loading 
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 100)
    // 3秒内禁止重复触发
    this.setData({
      isClicked: true
    })
    setTimeout(() => {
      this.setData({
        isClicked: false
      })
    }, 3000)

    if (this.data._timeStamp && this.data._nonceStr && this.data._package && this.data._signType && this.data._paySign){
      wx.requestPayment({
        'timeStamp': this.data._timeStamp,
        'nonceStr': this.data._nonceStr,
        'package': this.data._package,
        'signType': this.data._signType,
        'paySign': this.data._paySign,
        'success': res => {
          
          if(res.errMsg == 'requestPayment:ok'){

              this.setData({
                isClicked: true
              })
              wx.navigateTo({
                  url: '../paid/paid'
              });
          }
          
          
          console.log(res);
        },
        'fail': function (res) {
          // wx.showModal({
          //   title: '提示',
          //   content: res.errMsg,
          // })
        },
        'complete': function (res) {
          console.log(res)
        }
      })
    }else {
      wx.showModal({
        title: '支付失败',
        content: '请重新返回APP 选择微信支付！',
      })
    }





    /*请求开始
    wx.request({
      url: 'http://192.168.0.66:9010/20039',
      // url: 'https://trade.gdzxjy.net/20039',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        "hd": {
          "pi": 20039,
          "si": this.data.sessionId,
          "sq": 59
        },
        "bd": {
          "tid": 385, 
          "wid": this.data.wid,
          "dc": "", 
          "pte": 2,
          "ptid": "JSAPI", 
          "amt": this.data.amount,
          "code": '', 
          "pt": this.data.type ,
          "open": this.data._open
        }
      },
      success: res => {

        if (res.data.bd){
          // console.log(res)
          var obj = JSON.parse(res.data.bd)
          // console.log(obj)
          // this.setData({
          //   _timeStamp: obj.tsp,
          //   _nonceStr: obj.str,
          //   _package: obj.pkg,
          //   _signType: obj.st,
          //   _paySign: obj.sign
          // })
          wx.requestPayment({
            'timeStamp': obj.tsp,
            'nonceStr': obj.str,
            'package': obj.pkg,
            'signType': obj.st,
            'paySign': obj.sign,
            'success': res => {
              console.log(res);
            },
            'fail': function (res) {
              console.log(res)
            },
            'complete': function (res) {
              console.log(res)
            }
          })
        }else {
          wx.showModal({
            title: '提示',
            content: res.data.hd.rmsg,
          })
          return
        }

      },
      fail: e => {
        console.log(e)
      }
    })
    请求结束*/



  },


  // 返回APP失败回调
  launchAppError: function (e) {
    console.log(e.detail.errMsg)
    // console.log(e)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _amount, _sessionId, _wid, _type, open, _tid, sum, _servicesFee;

    // 获取APP传值支付金额、运单号
    if (options.amount && options.waybill && options.wid && options.type && options.tid) {
      _amount = decodeURIComponent(options.amount);    //待支付
      if (options.servicesFee){
        _servicesFee = decodeURIComponent(options.servicesFee); //服务费
      }
      let _waybill = decodeURIComponent(options.waybill);  //运单号
      _sessionId = decodeURIComponent(options.sessionId);
      _wid = decodeURIComponent(options.wid);   //运单ID
      _type = decodeURIComponent(options.type);   //支付类型，1信息费 2运费
      _tid = decodeURIComponent(options.tid);  //交易商/经纪人ID
      let _time = decodeURIComponent(options.time);

      if (_servicesFee && _servicesFee !== 'undefined' && _servicesFee !== 'null'){
        sum = parseFloat(_amount) + parseFloat(_servicesFee); //待支付+服务费
      }else{
        sum = parseFloat(_amount); //待支付
      }

      // console.log(_amount, _servicesFee, sum);

      this.setData({
        amount: sum,
        // wid: _wid,
        waybill: _waybill,
        // sessionId: _sessionId,
        // type: _type,
        time: _time
      })
    }else {
      wx.showModal({
        title: '提示',
        content: '请重新返回APP 选择微信支付！',
      })
    }

    if(app.globalData.openid){
      open = app.globalData.openid

      wx.request({
        // url: 'http://192.168.0.66:9010/20039',
        url: 'https://trade.gdzxjy.net/20039',
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: {
          "hd": {
            "pi": 20039,
            "si": _sessionId,
            "sq": 59
          },
          "bd": {
            "tid": _tid,
            "wid": _wid,
            "dc": "",
            "pte": 2,
            "ptid": "JSAPI",
            "amt": _amount,
            "code": '',
            "pt": _type,
            "open": open
          }
        },
        success: res => {

          if (res.data.bd) {
            var obj = JSON.parse(res.data.bd)
            console.log(obj)
            this.setData({
              _timeStamp: obj.tsp,
              _nonceStr: obj.str,
              _package: obj.pkg,
              _signType: obj.st,
              _paySign: obj.sign
            })
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.hd.rmsg,
            })
            return
          }

        },
        fail: e => {
          console.log(e)
        }
      })

      // this.setData({
      //   _open: app.globalData.openid
      // })
    }else {
      app.userInfoReadyCallback = res =>{
        open = JSON.parse(res.data.bd).open

        wx.request({
          // url: 'http://192.168.0.66:9010/20039',
          url: 'https://trade.gdzxjy.net/20039',
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          data: {
            "hd": {
              "pi": 20039,
              "si": _sessionId,
              "sq": 59
            },
            "bd": {
              "tid": _tid,
              "wid": _wid,
              "dc": "",
              "pte": 2,
              "ptid": "JSAPI",
              "amt": _amount,
              "code": '',
              "pt": _type,
              "open": open
            }
          },
          success: res => {

            if (res.data.bd) {
              var obj = JSON.parse(res.data.bd)
              console.log(obj)
              this.setData({
                _timeStamp: obj.tsp,
                _nonceStr: obj.str,
                _package: obj.pkg,
                _signType: obj.st,
                _paySign: obj.sign
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.hd.rmsg,
              })
              return
            }

          },
          fail: e => {
            console.log(e)
          }
        })

        // this.setData({
        //   _open: JSON.parse(res.data.bd).open
        // })
      }
    }

    // 倒计时 
    // count_down(this);
    count_down_wrap(this)

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
    // clearTimeout(micro_timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearTimeout(micro_timer)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.startPullDownRefresh()
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
