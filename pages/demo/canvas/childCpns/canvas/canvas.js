const app = getApp();
import {
  isaCanvasBev
} from '../../../../../components/behaviors/isaCanvas2d.js'
Component({
  behaviors: [isaCanvasBev],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    img1: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/eaf81a4c510fd9f99f419f8a222dd42a2934a4fb.jpg',
    img2: 'https://seopic.699pic.com/photo/50075/5724.jpg_wh1200.jpg',
    img3: 'https://seopic.699pic.com/photo/50011/8952.jpg_wh1200.jpg',
    img4: 'https://seopic.699pic.com/photo/50080/9948.jpg_wh1200.jpg',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(n = 1) {
      // this.drawFn(1, this.saveImageToPhotosAlbum) 
      this.drawFn(n)
    },
    async drawFn( n = 1, fn) {
      // const img2Url = await this.downloadFileFn(this.data.img2);
      // const img1Url = await this.downloadFileFn(this.data.img1);
      // const img3Url = await this.downloadFileFn(this.data.img3);
      // const img4Url = await this.downloadFileFn(this.data.img4);

      const img2Url = await this.getImageInfo(this.data.img2);
      const img1Url = await this.getImageInfo(this.data.img1);
      const img3Url = await this.getImageInfo(this.data.img3);
      const img4Url = await this.getImageInfo(this.data.img4);
      console.log(img1Url,img2Url, img3Url,img4Url)
      let ctx = await this.ctxFn(n)
      let bgColor = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0"); // 随机色
      let color = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0");
      await this.drawRoundSquare(ctx, 0, 0, 350 * n, 575 * n, 10 * n, bgColor); // canvas矩形
      await this.drawRoundSquareImg(ctx, img1Url.tempFilePath, 12 * n, 436 * n, 300 * n, 138 * n, 10 * n, 0.5)
      await this.drawRoundSquare(ctx, 12 * n, 464 * n, 330 * n, 32 * n, 16 * n, color); // 圆角矩形
      await this.drawCirle(ctx, 28 * n, 480 * n, 15 * n, '#fff');
      await this.drawCicleImgFn(ctx, img1Url.tempFilePath, 28 * n, 480 * n, 14 * n);
      await this.drawCicleImgFn(ctx, img2Url.tempFilePath, 58 * n, 480 * n, 14 * n);
      await this.drawRoundTopSquareImg(ctx, img2Url.tempFilePath, 10 * n, 10 * n, 330 * n, 300 * n, 10 * n)
      await this.drawNormalImage(ctx, img4Url.tempFilePath, 16 * n, 508 * n, 20 * n, 20 * n, 0.6);
      await this.drawNormalImage(ctx, img3Url.tempFilePath, 16 * n, 540 * n, 20 * n, 20 * n, 0.2);
      this.draWTextNormal(ctx, '文字文字文字文字文字文字文字文字文字文字1', 80 * n, 486 * n, '#fff', 14 * n, 'left', 220 * n, 'normal');
      this.draWTextNormal(ctx, '文字文字文字2', 240 * n, 450 * n, '#111', 12 * n, 'left', 110 * n, 'normal');
      this.draWTextNormal(ctx, '文字文字文字文字文字文字文字文字文字文字文字文字3', 44 * n, 526 * n, color, 12 * n, 'left', 180 * n, 'normal');
      this.draWTextNormal(ctx, '文字文字文字文字文字文字文字文字文字文字文字文字4', 44 * n, 556 * n, color, 12 * n, 'left', 250 * n, 'normal');
      // console.log(this.getTextWidth(ctx, '不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字', 22*n, 'bold'))
      this.drawUncertainText(ctx, '不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字不确定多少文字', 16 * n, 530 * n, 22 * n, "rgba(255,255,255,0.5)", 318 * n, 30 * n, 'bold');

      this.canvasToTempFilePath(this, fn, n)

    },

    /**
     * 导出图片
     * @param {*} _this this
     * @param {Number} fn 
     * @param {*} n  缩放
     */
    canvasToTempFilePath(_this, fn, n = 1) {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 350 * n,
        height: 575 * n,
        destWidth: 350 * n,
        destHeight: 575 * n,
        canvas: this.data.canvas,
        success(res) {
          let tempFilePath = res.tempFilePath
          fn && fn(tempFilePath, _this);
          if (!fn) {
            _this.triggerEvent('hideLoading')
          }
        },
        fail(res) {
          _this.triggerEvent("saveImageFailFn")
        }
      }, _this)
    }
  }
})