// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用于存储请求到的分类页面的数据，初始为空数组
    cate_detail:[],
    //用于记录当前被选中的分类项,初始为空
    selectcate:{},
    
  },
  //点击分类列表事件
  tapCatagoryList:function(e) {
    //获取到点击对应分类列表所传来的参数
    console.log(e.currentTarget.dataset.cate);
    //将获取到的参数设置到data中
    this.setData({
      selectcate:e.currentTarget.dataset.cate
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //在分类页面加载的时候通过require请求分类页面的数据
    let cate_detail = require("../../data/cate-detail.js");
    //在页面加载的过程中就将获取到的数据设置到data中,是的在页面渲染的时候能够获取到相应的数据
    this.setData({
      cate_detail,
      //默认第一项为果味
      selectcate:cate_detail[0]
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