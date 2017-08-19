// pages/order/order.js
var pageNo = 1
var pageSize = 10
//获取应用实例
var app = getApp()
Page({
  data:{
    orders:{},
    scrollHeight:0,
    showItem:0,
    noMore:true
  },onPullDownRefresh: function() {
     console.log('刷新');
     wx.stopPullDownRefresh();
  },
  onReachBottom: function() {
     console.log('下一页');
    //  var that = this
    //  app.doRequest("/order/list.wx?pageNo=1&pageSize="+pageSize+"&type="+that.data.showItem,"GET","",
    //  function(result){
    //   var orderList = that.data.orders;
    //   if(result.statusCode == 200){
    //     // 执行成功
    //     pageNo = pageNo + 1
    //     for(var i = 0; i < result.orders.length; i++){
    //       orderList.push(result.orders[i])
    //     }
    //     that.setData({
    //       orders:orderList
    //     })
    //   }
    // },function(result){
    //   // 执行失败
    // })
  },
  onLoad:function(options){
    var that = this
    wx.getSystemInfo({
      success:function(res){
          that.setData({
            scrollHeight:res.windowHeight
          });
        }
    });
    // 页面初始化
    app.doRequest("/order/list.wx?pageNo="+pageNo+"&pageSize="+pageSize+"&type="+that.data.showItem,"GET","",
    function(result){
      if(result.statusCode == 200){
        // 执行成功
        pageNo = pageNo + 1
        that.setData({
          orders:result.orders,
          noMore:result.haveNext
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
  },
  onUnload:function(){
    // 页面关闭
    pageNo = 1
  },
  modalOk:function(){
    this.setData({
      modelInfo:true
    })
  },
  selectItem:function(e){
    var that = this
    var oldType = that.data.showItem;
    that.setData({
        showItem: e.target.dataset.id    
    });
    var newType = that.data.showItem;

    if(oldType != newType){
      pageNo = 1;
      // 页面初始化
      app.doRequest("/order/list.wx?pageNo="+pageNo+"&pageSize="+pageSize+"&type="+newType,"GET","",
      function(result){
        if(result.statusCode == 200){
          // 执行成功
          pageNo = pageNo + 1
          that.setData({
            orders:result.orders,
          noMore:result.haveNext
          })
        }
      },function(result){
        // 执行失败
      })
    }
  }
})