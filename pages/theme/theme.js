// pages/theme/theme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放对应页面的数据,初始为空对象
    pageData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   * 这里的options可以接收跳转到该页面传输过来的值
   */
  onLoad: function (options) {
    console.log(options);//{id: "guowei"} {id: "dianxin"} {id: "chaohuo"}
    // options是一个对象,里面存储的是url中的?后面的键值对,也就是上一个页面传输过来的值
    //在页面加载的时候根据传入的id值请求对应的数据文件
    let pageData = require("../../data/" + options.id + ".js");
    console.log(pageData);
    // 将请求到的数据存入到data中
    this.setData({
      pageData
    });
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