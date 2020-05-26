// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    //用于存储当前商品的信息
    details_data:{},
    //代表当前被选中的选项
    activeTap:"detail",
    //记录当前商品的数量
    numToCart:1
  },
  //添加商品数量事件
  addNum:function () {
    //每次点击加号,将当前data中当前商品数量的值加1
    this.setData({
      numToCart:++this.data.numToCart
    });
  },
  //添加商品到小车中
  addProductToCart:function(e) {
    //添加商品到购物小车中需要从本地存储中获取到商品的信息
    // carts:[
    //   {
    //     id:"guazi",
    //     num:1,
    //     checked:true,
    //     data:{...}//商品的详情
    //   }
    // ]
    //查找本地存储中是否有商品的信息
    let carts = wx.getStorageSync('carts')||[];
    //获取到当前商品的id
    // console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    //获取当前商品在cart中的位置
    let index = carts.findIndex(function(v,i){return v.id === id});
    if(index === -1){ //表明在本地缓存中没找到该商品
      //构造一个cartsItem对象
      let cartItem = {
        id:id,//商品id
        num:this.data.numToCart,//商品数量
        checked:true,//默认被点击
        data:this.data.details_data//商品的详细信息
      }
      //将将构造好的数据存入到本地缓存中
      carts.push(cartItem);
      //修改当前购物小车上商品的数量
      this.setData({
        num:cartItem.num
      });
    }else{//表明找到了
      //缓存中现有的小车的数量+每次加到小车中的数量
      carts[index].num = carts[index].num + this.data.numToCart;
      //同时修改data上当前商品的数量
      this.setData({
        num:carts[index].num 
      });
    }
    //将数据存会本地缓存
    wx:wx.setStorageSync('carts', carts)
  },
  // 选项卡父元素点击事件
  handleTopTabchange:function (e) {
    //获取到事件源的数据
    console.log(e.target.dataset.tap);
    //将获取到的数据设置到data中
    this.setData({
      activeTap:e.target.dataset.tap
    });
  },
  // //选项卡点击事件
  // handleTabchange:function (e) {
  //   //通过e.currentTarget.dataset.tap我们可以拿到我们点击对应标签所传过来的信息
  //   // console.log(e.currentTarget.dataset.tap);
  //   //对data上的activeTap属性重新赋值
  //   this.setData({
  //     activeTap:e.currentTarget.dataset.tap,
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //在页面加载的时候可以通过形参options获取到上一个页面通过url方式传过来的数据
    console.log(options)
    // 通过require请求到商品信息
    let details_data = require("../../data/details-data");
    console.log(details_data);
    // 遍历获取到的对象,如果属性名与传入的值相同,则将对应的属性值存储到data中
    for(let key in details_data){
      if(key === options.id){
        this.setData({
          details_data:details_data[key],
        });
      }
    }
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
    //页面刷新的时候从本地缓存中获取到当前商品的数量
    let carts = wx.getStorageSync('carts')||[];
    // console.log(carts);
    //获取当前商品的id
    let id = this.data.details_data.id;
    // console.log(id);
    // 获取到当前商品对应的本地存储购物车中的下标
    let index = carts.findIndex(function (v,i) {
      return v.id == id
    });
    //如果index不为-1则表示找到了
    if(index != -1){
      //获取到对应的商品的数量
      let num = carts[index].num;
      // console.log(num);
      //将商品数量设置到data中
      this.setData({
        num
      });
    }
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