//获取应用实例
var app = getApp()
// 获取前端值
var inputContent = {}
Page({
  data:{
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.getStorage({
      key: 'token',
      success: function(res){
        if(res != null){
          //跳转到index界面
          wx.switchTab({
            url: '../../user/info/info'
          })
        }
      },
      fail: function(res) {
      },
      complete: function(res) {
      }
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
  userNameInput: function(e) {
    inputContent[e.currentTarget.id] = e.detail.value
  },
  passwordInput: function(e) {
    inputContent[e.currentTarget.id] = e.detail.value
  },
  login: function(){
    // 登录
    console.log("执行登录");
    console.log("login info : [" + inputContent["userName"] +"]--["+inputContent["password"]+"]");
    var userName = inputContent["userName"]
    var password = inputContent["password"]
    if(password == null || password == "" || userName == null || userName == ""){
      wx.showModal({
        title: '提示',
        content: '用户名或密码不能为空',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      // 发送登录请求
      console.log("开始发送登录请求...");
      app.doRequest("/login.wx",'POST',
      {"userName":userName,"password":password},
      function(result){
        console.log("返回状态码："+ result.statusCode)
        if(result.statusCode == 200){
          console.log("登录成功....")
          console.log("用户信息持久化到本地...")
          wx.setStorage({
            key:"token",
            data:result.token
          })
          wx.setStorage({
            key:"user",
            data:result.userName
          })
          console.log("用户信息持久化完成，准备跳转至首页...")
          //跳转到index界面
          wx.switchTab({
            url: '../../user/info/info'
          })
        } else {
          wx.showModal({
          title: '提示',
          content: result.message,
          showCancel: false
        })
        }
        
      },function(result){
        console.log("登录失败")
      });
    }
  }
})