//获取应用实例
var app = getApp()
// 获取前端值
var updateContent = {}
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  bindChange: function(e) {
    updateContent[e.currentTarget.id] = e.detail.value
  },
  update:function(){
    var oldPassword = updateContent["oldPassword"]
    var newPassword = updateContent["newPassword"]
    if(oldPassword == null || oldPassword == "" || newPassword == null || newPassword == ""){
      wx.showModal({
        title: '提示',
        content: '旧密码或新密码不能为空',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      app.doRequest("/user/password.wx","PUT",{"oldPassword":oldPassword,"newPassword":newPassword},
      function(result){
        if(result.statusCode == 200){
          try {
            wx.removeStorageSync('token')
          } catch (e) {
          }
          wx.showModal({
            title: '提示',
            content: '修改成功,请重新登录!',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '../../common/login/login'
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '修改失败',
            showCancel: false
          })
        }
      },function(result){

      })
    }
  }
})