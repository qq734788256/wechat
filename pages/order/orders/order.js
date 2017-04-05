// pages/order/order.js
//获取应用实例
var app = getApp()
Page({
  data:{
    pageNo:1,
    pageSize:10,
    orders:{},
    scrollHeight:0,
    modelInfo:false
  },onPullDownRefresh: function() {
    // Do something when pull down.
     console.log('刷新');
     wx.stopPullDownRefresh();
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
     console.log('下一页');
  },
  onLoad:function(options){
    var that = this
    wx.getSystemInfo({
      success:function(res){
        console.info(res.windowHeight);
          that.setData({
            scrollHeight:res.windowHeight
          });
        }
    });
    // 页面初始化
    app.doRequest("/login.wx","GET","",
    function(result){
      // 执行成功
      that.setData({
        pageNo:that.pageNo + 1
      })
    },function(result){
      // 执行失败
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
  },modalOk:function(){
    console.log("取消")
    this.setData({
      modelInfo:true
    })
    console.log("取消。。")
  }
})