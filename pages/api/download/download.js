// pages/api/download/download.js
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

  downloadFn(){
    // let url = "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/eaf81a4c510fd9f99f419f8a222dd42a2934a4fb.jpg";
    let url ="http://ppt.1ppt.com/uploads/soft/2003/1-200310151232.zip";
    let fileName = 'xxx';
    this.downloadFile(url, fileName);
  },
  downloadFile(url, fileName) {
    //wx.env.USER_DATA_PATH + '/abc.txt'
    // wx.env.USER_DATA_PATH 真机上是 wxfile://usr
    //真实路径：手机\内部存储\tencent\MicroMsg\wxanewfiles\xxxx\abc.txt
  
    let suffix = ".jpg";
    if (url) {
      let fileUrl = url.substring(0, url.lastIndexOf("?")) || url;
      suffix = fileUrl.substring(fileUrl.lastIndexOf("."))
    }
  
    wx.downloadFile({
      url: url,
      success(res) {
        if (res.statusCode === 200) {
          //  wx.saveFile({
          //     tempFilePath: res.tempFilePath,
          //     success(res2) {
          //       console.log(127)
          //       console.log(res2)
          //     },
          //     fail(res2) {
          //       console.log(res2)
          //     }
          //   })

          //var savePath = wx.env.USER_DATA_PATH + "/abc.docx.jpg"
          var savePath = wx.env.USER_DATA_PATH + "/" + fileName + suffix;
          wx.getFileSystemManager()
            .saveFile({//下载成功后保存到本地
              tempFilePath: res.tempFilePath,
              filePath: savePath,
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: savePath,
                  success: () => {
                    //保存成功弹出提示，告知一下用户
                    wx.showToast({
                      title: '文件已保存到手机相册',
                      icon: 'none'
                    });
                  },
                  fail() {
                    wx.showModal({
                      title: '文件已保存到本地',
                      content: '位于tencent/MicroMsg/WeiXin下 \r\n将保存的文件重命名改为[ .docx ]后缀即可',
                      confirmColor: '#0bc183',
                      confirmText: '知道了',
                      showCancel: false
                    })
                    // wx.showToast({
                    //   title: '保存失败',
                    //   icon: 'none'
                    // });
                  }
                })
              },
              fail() {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                });
              }
            })
        }else{
          wx.showToast({
            title: '下载失败',
            icon: 'none'
          });
        }
      },
      fail() {
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        });
      }
    })
  }
})