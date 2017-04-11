//获取应用实例
var app = getApp()
//logs.js
var util = require('../../../utils/util.js')

Page({
  data:{
    userInfo:{}
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    app.doRequest("/user/info.wx","GET","",function(result){
      // 成功
      console.log("返回状态码："+ result.statusCode)
      result.createTime = util.formatTime(new Date(result.createTime*1000),"yyyy-MM-dd hh:mm:ss")
      if(result.statusCode == 200){
        that.setData({
          userInfo:result
        })
      }
    },function(result){
      // 失败
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
  }
})