// 使用require获取到newest.js中的数据
let newest = require("../../data/newest")["newest"];
// console.log(newest);//得到的是一个数组,数组的每一项分别对应着一个最新新品的信息,我们要使用这获取到的数据,就需要将这些数据设置到data中。
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图的数据
    swiper_list:["../../image/b1.jpg","../../image/b2.jpg","../../image/b3.jpg"],
    // 精选主题图片数据
    // 此处更改了数据结构,增加了一个id属性,是为了区分点击的是不同的页面
    theme:[
      {
        id:"guowei",
        url:"../../image/s1.png"
      },{
        id:"dianxin",
        url:"../../image/s2.png"
      },{
        id:"chaohuo",
        url:"../../image/s3.png"
      }],
      newest:newest,//键名newest：获取到的变量newest
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