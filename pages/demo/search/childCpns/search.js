const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholderTxt:{
      type: String,
      value: '搜索'
    },
    focus: {
      type: Boolean,
      value: false
    },
    searchBoxWrapStyle:{
      type: String,
      value: ''
    },
    searchBoxStyle:{
      type: String,
      value: ''
    },
    searchBoxPostion:{
      type: String,
      value: 'fixed'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    customHeaderBarHeight : app.globalData.customHeaderBarHeight || 64,
    searchKey:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 删除搜索字段
    removeSearchKeyFn(e) {
      this.setData({
        searchKey: ''
      })
      this.triggerEvent('removeSearchKeyFn');
    },
    // 输入
    bindInputSearchFn(e) {
      this.setData({
        searchKey: e.detail.value
      });
      this.triggerEvent('inputSearchFn', e.detail);
    },
    // 确认
    bindconfirmFn(){
      this.triggerEvent('confirmFn');
    }
  }
})
