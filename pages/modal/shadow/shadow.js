Page({
  data:{
    shadowFlag: true
  }, 
  hideShadow: function(){  
    this.setData({shadowFlag: true})  
  },  
  showShadow: function(){  
    this.setData({shadowFlag: false})  
  }
})