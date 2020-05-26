// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用于存储用户地址
    address:{},
    //购物车信息
    carts:[],
    //付款合计
    tatalPrice:0
  },
  // 支付函数
  pay:function() {
    wx.showModal({
      content: '支付接口被屏蔽',
      success:function(res){
        if(res.confirm){//用户点击了确认按钮
          wx.switchTab({//跳转到有tabBar的页面
            url: '/pages/user/user',
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
    // 页面显示的时候,从本地存储中获取购物小车的信息
    let carts = wx.getStorageSync('carts') || [];
    //从缓存中获取用户地址信息
    let address = wx.getStorageSync('address') || {};
    // console.log(address);
    // console.log(carts);
    //定义一个变量用于记录总价
    let totalPrice = 0;
    //遍历购物小车数组,计算总价
    carts.map(function (e) {
      totalPrice += e.num * e.data.price;
    });
    // 将获取到的购物小车的数据设置到data中
    //将获取到的总价设置到data中
    //将获取到的用户地理位置信息添加到data中
    this.setData({
      carts,totalPrice,address
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