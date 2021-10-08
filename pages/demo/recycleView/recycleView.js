// const createRecycleContext = require('miniprogram-recycle-view')
const createRecycleContext = require('../../../components/cus-recycle-view/index.js')
// fakeList

const rpx2px = (rpx) => (rpx / 750) * wx.getSystemInfoSync().windowWidth;

Page({
  _top: 0, // 下一个item的top值
  _windowWidth: undefined, // 屏幕宽度
  onShareAppMessage() {
    
  },
  data: {
    hasNext: true,
    triggered: false,
    height: null
  },
  onLoad(options) {
    this.setData({
      isLoading: true
    })

    this.ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: function (item, index) {
        return {
          width: item.width,
          height: item.height
        }
      }
    })

    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          height: res.windowHeight - 20
        })
        this._windowWidth = res.windowWidth;
        this.getData();
      },
    })
  },
  onReady() {

  },
  getData(initFlag) {
    this.setData({
      requestLoading: true
    })
    if(initFlag){ // 暂时先这么处理
      this.ctx.destroy()
      this.ctx = null;
      this.ctx = createRecycleContext({
        id: 'recycleId',
        dataKey: 'recycleList',
        page: this,
        itemSize: function (item, index) {
          return {
            width: item.width,
            height: item.height
          }
        }
      })
      this._top = 0
    }

    const $api = require("../../../api/index.js")
    wx.showLoading({
      title: '加载中',
    })
    $api.getList()
      .then(result => {
        const appendedDatas = []
        result.forEach(item => {
          // 以下代码实现一行两列
          const horizontalMargin = 15;
          const width = this._windowWidth - 2 * horizontalMargin; // 2为borderWidth
          const imageWidth = width - 2;
          const imageHeight = imageWidth * item.ratio;;
          const labelHeight = 20;
          const itemVerticalPadding = 10;
          const height = labelHeight + imageHeight + 2 * itemVerticalPadding;
          const left = horizontalMargin;
          const appendedData = {
            id: item.id,
            imageWidth: imageWidth,
            imageHeight: imageHeight,
            width: width,
            // width: rpx2px(700),
            height: height,
            left: left,
            top: this._top,
          };
          this._top += height;
          appendedDatas.push(appendedData)
        });
        console.log(appendedDatas)
          // if(initFlag){
          //   this.ctx.update( 0, appendedDatas, res => {
          //     console.log(res)
          //   })
          // }else{
            
          // }
          
          this.ctx.append(appendedDatas)
        
        this.setData({
          requestLoading: false
        })
        wx.hideLoading()
      })
  },
   // 触底
  bindscrolltolower(e) {
    console.log(e)
    if (!this.data.requestLoading) {
      clearTimeout(this.data.timer)
      if (this.data.hasNext) {
        this.getData()
      } else {
        wx.showToast({
          mask: true,
          title: '没有数据了',
          icon: 'none',
          duration: 500
        })
      }
    }else{
      console.log(78)
      this.data.timer = setTimeout(()=>{
        this.setData({
          requestLoading: false
        })
        if (this.data.hasNext) {
          this.getData()
        } else {
          wx.showToast({
            mask: true,
            title: '没有数据了',
            icon: 'none',
            duration: 500
          })
        }
        clearTimeout(this.data.timer)
      }, 500)
    }
  },
  // 自定义下拉刷新被触发
  refresherrefresh(e){
    console.log(e)
    if(!this.data.requestLoading){
      this.getData(true)
    }
    setTimeout(() => {
      this.setData({
        triggered: false
      })
    }, 1000)
  }
})
