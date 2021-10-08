const isaCanvasBev = Behavior({
  data: {
    canvas:''
  },

  methods: {
    /**
     * 获取图片信息
     * @param {*} url 
     */
    getImageInfo(url){
      return new Promise( resolve => {
        wx.getImageInfo({
          src: url, 
          success(res) {
            if (res && res.path) {
              let tempFilePath = res.path
              resolve({ tempFilePath })
            } else {
              resolve('')
            }
          },
          fail(res) {
            console.log(res)
            resolve('')
          }
        })
      })
    },
    /**
     * 下载
     * @param {*} url 
     */
    downloadFileFn(url){
      return new Promise( resolve => {
        wx.downloadFile({
          url, 
          success(res) {
            if (res && res.statusCode === 200) {
              let tempFilePath = res.tempFilePath
              resolve({ tempFilePath })
            } else {
              resolve('')
            }
          },
          fail(res) {
            resolve('')
          }
        })
      })
    },
    /**
     * 创建canvas上下文
     * @param {*} n 
     */
    ctxFn(n=1){
      return new Promise((resolve) => {
        let ctx = ''
        const query = wx.createSelectorQuery().in(this)
        query.select('#canvasId')
          .fields({ node: true, size: true })
          .exec(res => {
            this.data.canvas = res[0].node
            this.data.canvas.width = 350 * n
            this.data.canvas.height = 575 * n
            ctx = this.data.canvas.getContext('2d')
            resolve(ctx)
          })
      })
    },
    /**
     * 图片
     * @param {*} ctx 
     * @param {*} url 
     * @param {*} x 
     * @param {*} y 
     * @param {*} w 
     * @param {*} h 
     */
    async drawNormalImage(ctx, url, x, y, w, h, alpha) {
      await ctx.save()
      await this.drawImageFn(ctx, url, x, y, w, h, alpha)
      await ctx.restore()
    },
    /**
     * 圆角直角矩形图片
     */
    async drawRoundTopSquareImg(ctx,url, x, y, w, h, r, alpha) {
      await ctx.save()
      await ctx.beginPath()
      await ctx.moveTo(x+r, y)
      await ctx.arcTo(x, y, x + w, y, r)
      await ctx.arcTo(x + w, y, x + w, y + h, r)
      await ctx.arcTo(x + w, y + h, x, y + h, 1)
      await ctx.arcTo(x, y + h, x, y, 1)
      await ctx.arcTo(x, y, x + w, y, r)
      await ctx.closePath();
      await ctx.save()
      await ctx.clip()
      await this.drawImageFn(ctx, url,  x , y , w, h, alpha)
      await ctx.restore()
    },
    /**
     * 圆角矩形图片
     */
    async drawRoundSquareImg(ctx,url, x, y, w, h, r, alpha) {
      await ctx.save()
      await ctx.beginPath()
      await ctx.moveTo(x+r, y)
      await ctx.arcTo(x, y, x + w, y, r)
      await ctx.arcTo(x + w, y, x + w, y + h, r)
      await ctx.arcTo(x + w, y + h, x, y + h, r)
      await ctx.arcTo(x, y + h, x, y, r)
      await ctx.arcTo(x, y, x + w, y, r)
      await ctx.closePath();
      await ctx.save()
      await ctx.clip()
      await this.drawImageFn(ctx, url,  x , y , w, h, alpha)
      await ctx.restore()
    },
     /**
     * 圆图
     */
    async drawCicleImgFn(ctx, url, x, y, r, alpha) {
      await ctx.save()
      await ctx.beginPath()
      await ctx.arc(x, y, r, 0, 2 * Math.PI)
      await (ctx.strokeStyle="#fff");
      await ctx.stroke()
      await ctx.clip()
      await this.drawImageFn(ctx, url, x - r, y - r, 2 * r, 2 * r, alpha)
      await ctx.restore()
    },
    /**
     * 绘图
     * @param {*} ctx 
     * @param {*} url 
     * @param {*} x 
     * @param {*} y 
     * @param {*} w 
     * @param {*} h 
     */
    drawImageFn(ctx, url, x, y, w, h , alpha){
      return new Promise((resolve) => {
        let img = this.data.canvas.createImage()
        img.src = url
        img.onload = (res) =>{
          ctx.globalAlpha = alpha || 1;
          ctx.drawImage(img, x, y, w, h);
          ctx.globalAlpha = 1;
          resolve(1)
        }
        img.onError = (res) => {
          resolve(1)
        }
      })
      
    },
    drawCirle(ctx, x, y, r, color) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      ctx.fillStyle = color;
      ctx.fill()
    },
    /**
     * canvas矩形
     * @param {*} ctx 
     * @param {*} x 
     * @param {*} y 
     * @param {*} w 
     * @param {*} h 
     * @param {*} r 
     * @param {*} color 
     */
    drawRoundSquare(ctx, x, y, w, h, r, color) {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();



      // ctx.save();
      // ctx.translate(x, y);
      //   //绘制圆角矩形的各个边  
      //   // drawRoundRectPath(cxt, width, height, radius);

      //   ctx.beginPath(0);
      //   //从右下角顺时针绘制，弧度从0到1/2PI  
      //   ctx.arc(w - r, h - r, r, 0, Math.PI / 2);

      //   //矩形下边线  
      //   ctx.lineTo(r, h);

      //   //左下角圆弧，弧度从1/2PI到PI  
      //   ctx.arc(r, h - r, r, Math.PI / 2, Math.PI);

      //   //矩形左边线  
      //   ctx.lineTo(0, r);

      //   //左上角圆弧，弧度从PI到3/2PI  
      //   ctx.arc(r, r, r, Math.PI, Math.PI * 3 / 2);

      //   //上边线  
      //   ctx.lineTo(w - r, 0);

      //   //右上角圆弧  
      //   ctx.arc(w - r, r, r, Math.PI * 3 / 2, Math.PI * 2);

      //   //右边线  
      //   ctx.lineTo(w, h - r);
      //   ctx.closePath();


      //   ctx.fillStyle = color || "#000"; //若是给定了值就用给定的值否则给予默认值  
      //   ctx.fill();
      //   ctx.restore();

    },
    /**
     * 普通文字
     * @param {*} ctx 
     * @param {*} txt 
     * @param {*} x 
     * @param {*} y 
     * @param {*} color 
     * @param {*} fontSize 
     * @param {*} pos  left center right 
     * @param {*} maxWidth 
     */
    draWTextNormal(ctx, txt, x, y, color, fontSize, pos, maxWidth, bold) {
      ctx.save()
      ctx.fontSize = fontSize;
      ctx.fillStyle = color;
      ctx.font = "normal normal " + (bold ? bold : "normal") + " " + fontSize + "px sans-serif";
      ctx.textAlign=pos;
      ctx.fillText(txt, x, y, maxWidth ? maxWidth : this.data.canvas.width);
      ctx.save()
    },
    
    /**
     * 获取文字的宽
     * @param {*} ctx 
     * @param {*} txt 
     * @param {*} fontSize 
     */
    getTextWidth(ctx, txt, fontSize, bold) {
      txt = txt + '';
      ctx.font = "normal normal " + (bold || "normal") + " " + fontSize + "px sans-serif";
      // ctx.font = "normal normal bold 22px sans-serif"
      return ctx.measureText(txt).width;
    },
    /**
     * 文字
     * @param {*} ctx 
     * @param {*} x 
     * @param {*} y
     * @param {*} fontSize 
     * @param {*} color 
     * @param {*} maxWidth 
     * @param {*} lineheight 
     */
    drawUncertainText(ctx, txt, x, y, fontSize, color, maxWidth, lineheight, bold) {
      let _textArr = this.getTextLine(ctx, txt, fontSize, maxWidth, bold);
      let textArr = _textArr || [];
      let _y = (y - lineheight * textArr.length) / 2 + lineheight * 3 / 4;
      textArr.forEach((o, i) => {
        ctx.save();
        ctx.fillStyle = color;
        ctx.font ="normal normal " + (bold ? bold : "normal") + " " + fontSize + "px sans-serif";
        ctx.textAlign= 'start';
        // ctx.fontSize = fontSize;
        
        
        if(textArr.length > 1){
          let _arr = o.split("");
          _arr.forEach((oo, ii) => {
            ctx.fillText(oo, x + ii * maxWidth / [textArr[0].length], _y + i * lineheight); // 一个字一个字的画
          })
        }else{
          ctx.fillText(o, x, _y + i * lineheight, maxWidth); // 一行一行的画
        }
      })
    },
    /**
     * 获取文本折行
     * @param {*} ctx 
     * @param {*} txt 
     * @param {*} fontSize 
     * @param {*} width 
     */
    getTextLine: function (ctx, txt, fontSize, maxWidth, bold) {
      ctx.fontSize = fontSize;
      let arrText = txt.split('');
      let line = '';
      let arrTr = [];
      for (let i = 0; i < arrText.length; i++) {
        var testLine = line + arrText[i];
        // var metrics = ctx.measureText(testLine);
        // console.log(metrics)
        var width = this.getTextWidth(ctx, testLine, fontSize, bold)

        // var width = metrics.width;
        if (width > maxWidth && i > 0) {
          arrTr.push(line);
          line = arrText[i];
        } else {
          line = testLine;
        }
        if (i == arrText.length - 1) {
          arrTr.push(line);
        }
      }
      return arrTr;
    },
    /**
     * 保存到相册
     * @param {*} tempFilePath 
     * @param {*} _this this
     */
    saveImageToPhotosAlbum(tempFilePath, _this){
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success: () => {
          _this.triggerEvent("saveImageSuccessFn")
        },
        fail: () => {
         _this.triggerEvent("saveImageFailFn")
        }
      })
    }
    
  }
})

export {
  isaCanvasBev
}