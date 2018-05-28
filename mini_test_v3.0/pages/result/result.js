// pages/result/result.js
var A, B, C;

function getResult(a,b,c) {
  var arr = [a, b, c];
  var max = Math.max(a,b,c);//取出最大值
  console.log("max" + max);
  var result = "";

  var obj = ["听觉", "视觉", "动觉"];

  arr.forEach(function (item, index, array) {//数组遍历
    if (item == max) {
      result = result + obj[index];
    }
  }
  );
  if (result.length > 2) {//判断结果的长度是否大于2
    result = result + "均衡型";
  }
  else {
    result = result + "型";
  }
  return result;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testTip: "测试结果",
    btn_restart_text: '重新测试'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("page3 is loading");
    console.log(options);
    console.log(options.A)
    //获取url中的传值并赋值

    A = options.A;
    B = options.B;
    C = options.C;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("page3 is readying");
    console.log("page= " + getCurrentPages());
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("page3 is showing");
    var result = getResult(A, B, C);//计算结果
    this.setData(//初始化页面数据
      {
        A: A,
        B: B,
        C: C,
        result: result
      }
    )
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
    console.log("page3 is unloading.");

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

  },
  restart: function(e){//重新测试按钮点击事件

     wx.navigateBack({//跳转到开始页面
       delta:1
     })
  }
})