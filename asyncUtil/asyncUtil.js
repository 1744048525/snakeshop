//此文件专门用来将异步代码改为同步代码
//showModal  content是弹出框的提示信息
let asyncShowModal = function asyncShowModal(content){
  return new Promise(function(resolve,reject){
    wx.showModal({
      content:content,
      //成功的回调
      success:function(res){
        if(res.confirm){//res.confirm为true说明成功了
          resolve(res);
        }else{
          reject(res);
        }
      }
    })
  })
}
//chooseAddress
let asyncChooseAddress = function asyncChooseAddress() {
  return new Promise(function (resolve,reject) {
    wx.chooseAddress({
      success:function(res){
        resolve(res);
      },
      fail:function(err){
        reject(err)
      }
    })
  });
}
//导出这个方法
export {
  asyncShowModal,asyncChooseAddress
}