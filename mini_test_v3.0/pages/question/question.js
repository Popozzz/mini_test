// pages/question/question.js
var fileData = getApp().globalData.question;//获取全局变量question数据
console.log(fileData);
var order=0;
var A=0, B=0, C=0;
var target=0;
var orderList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];//题目顺序
var answerList=[];//答案顺序

function clearStyle() {//清除样式
  this.setData({
    oneIsClick: '',
    twoIsClick: '',
    threeIsClick: ''
  });
};

function casualSort()//随机排序函数
{
  return Math.random() > 0.5 ? -1 : 1;
};
orderList.sort(casualSort);//题目随机
console.log(orderList.toString());

function getAnswer(a)//利用Ascll编码转换字符获取option相应的ABC属性
{
  return String.fromCharCode(64 + answerList[order][a]);//Ascll码65是大写字母A
}

//产生答案的随机顺序，保存在二维数组

for (var i = 0; i < 20; i++) {
  var arr = [1, 2, 3];  //1、2、3用于Ascll码的加减
  arr.sort(casualSort); //随机排序
  answerList.push(arr);
}

Page(
  {
    /**
     * 页面的初始数据
     */
    data: {
      question: '',
      button_text: "提交",
      hidden: 'hidden',//hidden样式关于'提交'按钮的隐藏与显示
      one: '',
      two: '',
      three: '',
      oneIsClick: '',
      twoIsClick: '',
      threeIsClick: ''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("page2 is loading");
        console.log(orderList.toString());
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      console.log("page2 is readying");
      console.log("page= "+getCurrentPages());
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      console.log("page2 is showing");
      //页面显示，初始化页面数据
      this.setData({
        question: (order + 1) + ". " + fileData[orderList[order]].question,
        one: fileData[orderList[order]].option[getAnswer(0)],
        two: fileData[orderList[order]].option[getAnswer(1)],
        three: fileData[orderList[order]].option[getAnswer(2)],
      });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      console.log("page2 is hidding");
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      console.log("page2 is unloading");
      //页面卸载时将题目答案全部重新初始化
      order = 0;
      A = 0, B = 0, C = 0;
      target = 0;
      answerList = [];

      orderList.sort(casualSort);//题目随机
      console.log(orderList.toString());

      //产生答案的随机顺序，保存在二维数组
      for (var i = 0; i < 20; i++) {
        var arr = [1, 2, 3];  //1、2、3用于Ascll码的加减
        arr.sort(casualSort); //随机排序
        answerList.push(arr);
      }
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
    next: function (e) {//答案选项点击事件
      var id = e.target.id;
      console.log(e.target.id);

      if (order == 19) {//是否到最后一题
        clearStyle.call(this);
      }

      //点击添加背景样式
      if (id == 'one') {
        this.setData({ oneIsClick: 'isClick' });
        target = 0;
      }
      if (id == 'two') {
        this.setData({ twoIsClick: 'isClick' });
        target = 1;
      }
      if (id == 'three') {
        this.setData({ threeIsClick: 'isClick' });
        target = 2;
      }

      if (order == 19) {
        return false;//到了最后一题，停止更新下一题
      }

      if(answerList[order][target] == 1)//根据点击的选项，添加到ABC变量中
      {
        A++;
      } else if (answerList[order][target] == 2)
      {
        B++;
      } else if (answerList[order][target] == 3)
      {
        C++;
      }

      console.log("list=" + orderList[order]);
      order++;//开始下一题
      console.log("A=" + A);
      console.log("B=" + B);
      console.log("C=" + C);

      var that = this;

      setTimeout(function () {
        var answer = getAnswer();
        that.setData({
          question: (order + 1) + ". " + fileData[orderList[order]].question,
          one: fileData[orderList[order]].option[getAnswer(0)],
          two: fileData[orderList[order]].option[getAnswer(1)],
          three: fileData[orderList[order]].option[getAnswer(2)],
          oneIsClick: '',
          twoIsClick: '',
          threeIsClick: ''
        });
        if (order > 18) {
          that.setData({
            hidden: ''
          });//去掉隐藏样式，显示提交按钮
        }
      }, 500);//点击后停顿0.5秒切换到下一个题目


      console.log("order=" + order);
    },
    done: function (e) {//提交事件

      if (answerList[order][target] == 1) {
        A++;
      } else if (answerList[order][target] == 2) {
        B++;
      } else if (answerList[order][target] == 3) {
        C++;
      }
      else {
        return false;//没有选择不能提交
      }
      wx.redirectTo({//使用redirectTo跳转页面，page2会被unloading，这样页面栈只剩下2，用户点击默认的返回按钮就会直接跳到开始页面
        url: '../result/result?A=' + A + '&B=' + B + '&C=' + C//利用url跨页面传值
      })
    }


  }
)