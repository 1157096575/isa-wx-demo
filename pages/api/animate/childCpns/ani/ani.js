// pages/api/animation/childCpns/ani/ani.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    text: '',
    animation: null,
    timer: null,
    duration: 0,
    textWidth: 0
  },
  pageLifetimes: {
    show: function() {
      //setTimeout(()=>{
        this.destroyTimer()
        this.setData({
          timer: null
        })
        this.initAnimation(this.data.text)
      //}, 200)
      
    },
    hide: function() {
      // 页面被隐藏
      this.destroyTimer()
      this.setData({
        timer: null
      })
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      this.destroyTimer()
      this.setData({
        timer: null
      })
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function() {
    // 在组件实例进入页面节点树时执行
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
    this.destroyTimer()
    this.setData({
      timer: null
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    destroyTimer() {
      if (this.data.timer) {
        clearTimeout(this.data.timer);
      }
    },
     /**
     * 开启公告字幕滚动动画
     * @param  {String} text 公告内容
     * @return {[type]} 
     */
    initAnimation(text) {
      if(!this.data.text){
        this.setData({
          text: '文字1文字2文字3文字4文字5文字6文字7文字8文字9文字10文字11文字12文字13文字14文字15 文字1文字2文字3文字4文字5文字6文字7文字8文字9文字10文字11文字12文字13文字14文字15 '
        })
      }
      
      let that = this
      this.data.duration = 10000
      this.data.animation = wx.createAnimation({
        duration: this.data.duration,
        timingFunction: 'linear'   
      })
      let query = wx.createSelectorQuery().in(this)
      query.select('.content-box').boundingClientRect()
      query.select('#text').boundingClientRect()
      query.exec((rect) => {
        console.log(rect)
        that.setData({
          wrapWidth: rect && rect[0] && rect[0].width ? rect[0].width : 0,
          textWidth: rect && rect[1] && rect[1].width ? rect[1].width : 0
        }, () => {
          this.startAnimation()
        })
      })
    },
    // 定时器动画
    startAnimation() {
      console.log('startAnimation', this.data.duration)
      const resetAnimation = this.data.animation.translateX(0).step({ duration: 0 })

      this.setData({
        animationData: resetAnimation.export()
      })
      // this.data.animation.option.transition.duration = this.data.duration

      let x = - (this.data.textWidth / 2 )
      console.log(x) //////////////////////////////?删了安卓会停顿
      const animationData = this.data.animation.translateX(x).step({ duration: this.data.duration })
     // setTimeout(() => {
        this.setData({
          animationData: animationData.export()
        })
      //}, 100)
      // console.log(animationData, this.data.duration, +new Date())
        this.data.timer=setTimeout(() => {
          clearTimeout(this.data.timer)
          // this.data.timer = null;
          this.startAnimation() 
          // console.log('setTimeout', this.data.duration, +new Date())
        }, this.data.duration)
    
    },
  }
})
