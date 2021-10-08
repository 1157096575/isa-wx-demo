let ctx = null;
let canvas = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgScan: '',
    imgOri: '',
    canvas_h: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapFn(){
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      // sizeType: ['original'],
      // sourceType: ['camera'],
      success(res) {
        console.log(res)
        let imgOri = res.tempFilePaths[0];
        _this.setData({
          imgOri
        })
        wx.getImageInfo({
          src: imgOri,
          success: function (res1) {
            console.log(res1)
            const query = wx.createSelectorQuery()
            query.select('#photo_canvas')
              .fields({ node: true, size: true })
              .exec(res => {
                console.log(res)
                canvas = res[0].node
                ctx = canvas.getContext('2d')
                console.log(ctx, canvas)
                var towidth = 120; //按宽度120px的比例压缩  
                var toheight = Math.trunc(120 * res1.height / res1.width);
                _this.setData({
                  canvas_h: toheight
                })
                canvas.width = towidth
                canvas.height = toheight
                const img = canvas.createImage()
                console.log(img)
                img.src = imgOri
                console.log(img)
                img.onload = () =>{
                  console.log(57, img)
                  ctx.drawImage(img, 0, 0, res1.width, res1.height, 0, 0, towidth, toheight);
                    wx.canvasToTempFilePath({
                      canvas,
                      fileType: "jpg",
                      success: function (res2) {
                        console.log(res2)
                        _this.setData({
                          imgScan: res2.tempFilePath
                        })
                      },
                      fail(res2) {
                        console.log(res2)
                        _this.setData({
                          imgScan: imgOri
                        })
                      }
                    }, _this)
                }
                img.onunload = (res) => {
                  console.log('error', res)
                }
              })
            
          }
        })
      },
      fail(res) {

      }
    })
  }
})