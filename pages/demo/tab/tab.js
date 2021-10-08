// pages/demo/tab/tab.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist: [],
    scrollLeft: 0,
    currentTab: 0, //当前所在滑块的 index 
    requestLoading: false,
    toView: 'idx0',
    scrollWidth: 0,
    count: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.initNavlist()
  },
  initNavlist(){
    let l = Math.round(Math.random()*20);
    let navlist = [];
    for(let i = 0; i < l; i++){
      navlist.push('NAV-' + i)
    }
    this.setData({
      navlist
    }, () => {
      this.scrollWidthFn()
    })
  },
  scrollWidthFn() {
    let query = wx.createSelectorQuery().in(this)
    this.data.navlist.forEach(async(o,i) => {
      await query.select('#idx'+i).boundingClientRect()
    })
    let scrollWidth = 20;
    query.exec(res => {
      this.data.navlist.forEach((o,i) => {
        let w = res[i] && res[i].width ? res[i].width : 100;
        scrollWidth += w
      })
      console.log(scrollWidth)
      this.setData({
        scrollWidth
      })
    })
  },
   // 切换状态
   tab(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.currenttab,
      toView: 'idx' + e.currentTarget.dataset.currenttab,
      count: Math.floor(Math.random() * 1000) 
    }, () => {
      this.scrollWidthFn()
    });
  },
})