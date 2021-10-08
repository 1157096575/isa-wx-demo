let log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  infoFn(){
    let str = (Math.random() + '').substr(5);
    this.infoLogFn(str)
  },
  warnFn(){
    let str = (Math.random() + '').substr(2);
    this.warnLogFn(str)
  },
  infoLogFn(str) {
    let s = str ? 'id:' + wx.getStorageSync('id') +' ' + str.substring(0, 450) : '';
    if (!log) return;
    log.info.apply(log, [s]);
  },
  warnLogFn(str) {
    let s = str ? 'id:' + wx.getStorageSync('id') + ' ' +  str.substring(0, 450) : '';
    if (!log) return;
    log.warn.apply(log, [s]);
  },
})