const app = getApp();
let {
  windowWidth,
  windowHeight
} = wx.getSystemInfoSync();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationFlag: true,
    x: (app.globalData.moveX >= 0) ? app.globalData.moveX: windowWidth-50,
    y: app.globalData.moveY ? app.globalData.moveY : windowHeight - 220
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

      this.setData({ animationFlag: false});
      this.setData({
        x: app.globalData.moveX >= 0 ? app.globalData.moveX : windowWidth-50,
        y: app.globalData.moveY ? app.globalData.moveY : windowHeight - 500
      },function(){
        this.setData({ animationFlag: true });
      })
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
  onShareAppMessage () {

  },
  onShareMoveStart(e) {
    if (e && e.changedTouches && e.changedTouches.length > 0 && e.changedTouches[0].clientY){
      this.y = e.changedTouches[0].clientY - 30;
      this.x = e.changedTouches[0].clientX - 30;
    }
    
  },
  onShareMoving(e) {
    if (e && e.changedTouches && e.changedTouches.length > 0 && e.changedTouches[0].clientY && (e.changedTouches[0].clientY) < -100) {
      this.setData({
        x: this.x,
        status: false,
        y: this.y,
      })
    }
  },
  onShareMoveEnd(e) {
    if (e && e.changedTouches && e.changedTouches.length > 0 && e.changedTouches[0].clientY){
      if ((e.changedTouches[0].clientY) < -100) {
        this.setData({
          x: this.x,
          status: true,
          y: this.y,
        })
        return;
      }
      let sysAveWidth = windowWidth / 2;
      let currentP = {
        x: 0,
        y: (e.changedTouches[0].clientY - 30) > 0 ? Math.abs(e.changedTouches[0].clientY - 30) : 0,
      }
      if (e.changedTouches[0].clientX > sysAveWidth) {
        currentP.x = windowWidth - 60;
      }

      this.setData({
        x: currentP.x,
        y: currentP.y,
        status: true
      })
      app.globalData.moveX = currentP.x;
      app.globalData.moveY = currentP.y;
    }
  }
})