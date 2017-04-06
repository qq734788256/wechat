// pages/order/order.js
var pageNo = 1
var pageSize = 10
//获取应用实例
var app = getApp()
Page({
  data:{
    orders:{},
    scrollHeight:0,
    modelInfo:true
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
    console.log("/order/list.wx?pageNo="+pageNo+"&pageSize="+pageSize)
    // 页面初始化
    app.doRequest("/order/list.wx?pageNo="+pageNo+"&pageSize="+pageSize,"GET","",
    function(result){
      if(result.statusCode == 200){
        // 执行成功
        pageNo = pageNo + 1
        that.setData({
          orders:result.orders
        })
      }
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
    console.log("hide")
  },
  onUnload:function(){
    // 页面关闭
    console.log("close")
    pageNo = 1
  },modalOk:function(){
    this.setData({
      modelInfo:true
    })
  }
})