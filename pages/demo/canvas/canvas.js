const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {


  },

  saveCanvas() {
    this.selectComponent("#guideAuth").init();
    this.setData({
      saveLoading: true
    });
  },
  guideAuthNextStep() {
    wx.showLoading({
      mask: true,
      title: '图片生成中...'
    })
    this.setData({
      saveLoading: true
    })
    this.selectComponent("#isaCanvas").init();
  },
  saveImageFailFn() {
    this.setData({
      saveLoading: false
    });
    wx.hideLoading();
    wx.showToast({
      title: '保存失败',
      icon: 'none',
      duration: 2000
    })
  },
  saveImageSuccessFn() {
    wx.hideLoading();
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    })
    this.setData({
      saveLoading: false
    });
  },
  hideLoading() {
    wx.hideLoading();
    this.setData({
      saveLoading: false
    });
  }
})