//获取应用实例
var app = getApp()

Page({
  data:{
    wxuserInfo: {},
    userInfo: {}
  },
  onLoad:function(options){
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        wxuserInfo:userInfo
      })
    })
    // 页面初始化 options为页面跳转所带来的参数
    app.doRequest("/user/info.wx","GET","",function(result){
      console.log("返回状态码："+ result.statusCode)
      if(result.statusCode == 200){
        //更新数据
        that.setData({
          userInfo:result
        })
      } else if(result.statusCode == 502) {
        wx.clearStorageSync("token")
        wx.redirectTo({
          url: '../../common/login/login'
        })
      }
    },function(result){
      console.log("返回状态码："+ result.statusCode)
      wx.clearStorageSync("token")
      wx.redirectTo({
        url: '../../common/login/login'
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  redirectOrder:function(){
    wx.navigateTo({
      url: '../../order/orders/order'
    })
  },
  redirectPassword:function(){
    wx.navigateTo({
      url: '../../user/password/password'
    })
  }
})