//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  doRequest:function(url,method,data,success,failur){
    var that = this
    var header = {};
    // header下需要传递的信息
    var token = wx.getStorageSync('token')
    if(token != null && token != ''){
      header = {"UToken":token}
    }
    wx.request({
      url: that.globalData.serviceURL+url,
      data: data,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function(res){
        console.log("请求成功："+res.statusCode+"|"+res.errMsg)
        success(res.data);
      },
      fail: function(res) {
        console.log("请求失败："+res.statusCode+"|"+res.errMsg)
        failur(res.data);
      }
    })
  },
  globalData:{
    userInfo:null,
    // serviceURL:"https://www.i-wangyunlong.com/wxapi"
    serviceURL:"http://www.i-wangyunlong.com:8080/wxapi"
  }
})