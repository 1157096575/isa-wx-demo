/**
 * 授权
 */
Component({
  properties: {
    scope:{
      type: String,
      value: 'writePhotosAlbum'
    }
  },
  data: {
    describe:'您需开启相册授权才可保存',
    guideAuthorizeModelFlag: false
  },
  methods: {
    init(){
      if(this.data.gettingSetting){
        return;
      }
      this.data.gettingSetting = true;
      wx.getSetting({
        success: res => {
          if (!res.authSetting[`scope.${this.properties.scope}`]) {
            wx.authorize({
              scope: `scope.${this.properties.scope}`,
              success: () => {
                this.data.gettingSetting = false;
                this.triggerEvent('nextStepFn'); //授权成功
              },
              fail: () => {
                this.setData({guideAuthorizeModelFlag: true});
                this.describeFn();
                this.data.gettingSetting = false;
              }
            })
          }else{
            this.triggerEvent('nextStepFn'); //已授权
            this.data.gettingSetting = false;
          }
        },
        fail: () => {
          this.data.gettingSetting = false;
        }
      })
    },
    describeFn(){
      let scope = this.properties.scope;
      let describe = ''
      switch(scope){
        case 'writePhotosAlbum':
          describe = '您需开启相册授权才可保存';
          break;
        case 'camera':
          describe = '您需开启摄像头授权才可拍照';
          break;
        default:
          describe = '您需开启授权';
          break;
      }
      this.setData({describe});
    },
    closeGuideAuthorizeModelFn() {
      this.setData({guideAuthorizeModelFlag: false});
    },
    openSetting() {
      this.closeGuideAuthorizeModelFn();
    },
    bindopensettingFn(res) {
      let f = res.detail && res.detail.authSetting && res.detail.authSetting[`scope.${this.properties.scope}`] ? res.detail.authSetting[`scope.${this.properties.scope}`] : false;
      if(!f){
        return;
      }
      this.triggerEvent('nextStepFn');
    }
  }
})
