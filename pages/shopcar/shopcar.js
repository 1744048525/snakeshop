// pages/shopcar/shopcar.js
//导入将异步代码改为同步代码的弹出框方法
import {asyncShowModal} from "../../asyncUtil/asyncUtil.js"
// console.log(asyncShowModal);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //购物车数据
    carts:{},
    //商品总价
    totalPrice:"0.00",
    allChecked:true,
  },
  //删除商品的方法
  delCarts:function (e) {
    //获取当前购物小车商品对应的下标
    let index = e.currentTarget.dataset.index;
    // console.log(index);
    //获取本地存储购物小车的数据
    let carts = wx.getStorageSync('carts');
    // console.log(carts);
    //根据下标删除对应项
    carts.splice(index,1);
    //将修改好的购物小车数据重新存入本地存储和data中
    this.changeCarts(carts);
     //改变商品总价
     this.changeTotalPrice();
  },
  //减少商品的方法
  minusCarts:async function (e) {
    // 获取当前被点击的购物车商品的下标
    let index = e.currentTarget.dataset.index;
    //获取本地存储中的购物车数据
    let carts = wx.getStorageSync('carts');
    if(carts[index].num -1 === 0){//当商品数量再减一次就为1的情况
      //通过promise实现
      let res = await asyncShowModal("您确定要删除该商品吗？");
      if(res.confirm){
        carts.splice(index,1);//从数组中截取掉下标为index的那一项
      }
    }else{
      //否则直接自减1
      carts[index].num--
    }
    //重新设置本地存储和data
    this.changeCarts(carts);
     //改变商品总价
     this.changeTotalPrice();
  },
  //添加商品数量方法
  addCarts:function(e){
    // console.log(e.currentTarget.dataset.index);
    // 获取当前被点击的购物车商品的下标
    let index = e.currentTarget.dataset.index;
    //获取本地存储中的购物车数据
    let carts = wx.getStorageSync('carts');
    // console.log(carts);
    // 通过下标找到对应的商品,并且修改其数量
    carts[index].num++;
    //重新设置本地存储和data
    this.changeCarts(carts);
    //改变商品总价
    this.changeTotalPrice();
  },
  // 每一项选中按钮的点击事件
  changeChecked:function(e) {
    //当前被点击项的下标
    // console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    // 获取本地存储的购物车信息
    let carts = wx.getStorageSync("carts");
    // console.log(carts)
    //找到对应下标的项,将其check属性取反
    carts[index].checked = !carts[index].checked;
    // 将修改后的carts属性重新添加到本地缓存,同时添加到data中
    //修改本地存储和data
    this.changeCarts(carts);
    // 从data中获取到修改后的carts
    let newcarts = this.data.carts;
    // console.log(carts);
    //改变全选按钮
    this.changeAllChecked(newcarts);
    //改变商品总价
    this.changeTotalPrice();
  },
  //改变商品总价的方法
  changeTotalPrice:function(){
    //获取本地存储的购物车信息
    let carts = wx.getStorageSync('carts');
    //定义一个变量,用于存储商品的总价
    let totalPrice = 0;
    //遍历购物小车数据
    carts.map(function (e) {
      //对每一项b被选中的商品总价进行累加操作
      if(e.checked === true){
        totalPrice += e.data.price * e.num;
      }
    });
    //总价设置到data中
    this.setData({
      totalPrice
    });
  },
  //全选按钮点击事件
  allChecked:function () {
    //获取本地存储的购物小车数据
    let carts = wx.getStorageSync('carts');
    // console.log(carts);
    //遍历获取到的购物小车数据,将每一项的checked属性都修改为true
    carts.forEach(function(e){
      e.checked = true
    });
    //将修改好的购物车数据重新设置回本地存储和data中
    this.changeCarts(carts);
    //同时将data中的全选属性也设置为true
    this.setData({
      allChecked:true,
    });
    //改变商品总价
    this.changeTotalPrice();
  },
  //改变全选按钮
  changeAllChecked:function (arr) {
    let flag = true;//定义一个标记,用于记录是否全选中,默认为全选中
    arr.map(function (v,i) {
      if(!v.checked){//如果有一项的checked属性为false(未选中)
        flag = false //将标记设置为false
      }
    })
    this.setData({//将data中allChecked设置为flag
      allChecked:flag
    });
  },
  //修改购物车数据
  changeCarts:function (carts) {
    wx.setStorageSync('carts', carts);
    //修改data
    this.setData({
      carts
    });
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
    //页面渲染的时候先从本地存储中将购物车信息获取到,并且将其设置到data中
    let carts = wx.getStorageSync('carts')||[];
    // console.log(carts);
    let flag = true;//定义一个标记,记录是否全选中,默认为全选
    // 判断carts中的每一项的checked属性是否都为true,如果有一项为false,则表示没有全选中
    carts.map(function (v,i) {
      if(!v.checked){//如果有一项的checked属性为false(未选中)
        flag = false;//将标记修改为false
      }
    });
    //将获取到的购物车数据存储到data中
    this.setData({
      allChecked:flag,//是否全选中重新赋值
      carts
    });
    //页面显示的时候获取商品的总价
    //定义一个变量,用于存储商品的总价
    let totalPrice = 0;
    //遍历购物小车数据
    carts.map(function (e) {
      //对每一项被选中的商品总价进行累加操作
      if(e.checked === true){
        totalPrice += e.data.price * e.num;
      }
    });
    //总价设置到data中
    this.setData({
      totalPrice
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