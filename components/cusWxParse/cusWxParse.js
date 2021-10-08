var WxParse = require('../wxParse/wxParse.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    html: {
      type: String,
      value: '' 
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  observers: {
    'html': function () {
      this.toHtmlFn();
    }
  },
  attached: function () {
    this.toHtmlFn();
  },
  methods: {
    toHtmlFn: function () {
      WxParse.wxParse('article', 'html', this.properties.html, this);
    }
  }
})