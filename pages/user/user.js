// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用于存储用户个人信息
    userMessage:{},
    //获取用户的地址信息
    address:{},
    //用户购物车信息
    carts:[],
    //应支付的总金额
    tatalPrice:0
  },
  //获取用户数据回调
  getUserInfo:function(e){
    // console.log(e.detail.userInfo);
    let userMessage = e.detail.userInfo;
    // 将获取到的用书数据信息存储到本地存储和data中
    wx.setStorageSync('userMessage', userMessage);
    this.setData({
      userMessage
    });
  },
  // 付款按钮
  pay:function(){
    wx.showModal({
      content:"暂不支持支付",
      success:function (res){
        if(res.confirm){
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //每次显示页面的时候都从本地存储中获取用户信息
    let userMessage = wx.getStorageSync('userMessage') || {};
    //获取用户的地址信息
    let address = wx.getStorageSync('address') || {};
    //获取用户购物车信息
    let carts = wx.getStorageSync('carts') || [];
    //设置一个变量用于计算购物车总价
    let totalPrice = 0;
    //遍历获取到的购物车数组,计算出所有被选中的商品的总价
    carts.map(function (e) {
      if(e.checked === true){//如果当前商品被选中
        totalPrice += e.num * e.data.price
      }
    });
    //将计算好的总价存入到data中
    this.setData({
      totalPrice
    });
    //将获取到的用户信息设置到data中
    //将获取到的用户地址信息设置到data中
    this.setData({
      userMessage,address,carts
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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