// pages/demo/picker/picker.js
import {formatYmd} from '../../../utils/formatDate.js'
const $api = require("../../../api/index.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow_time: false,
    titleTab_time: ['日期', '时间'],
    listData_time: [],
    defaultPickData_time: [],
    picker_time_data: [],
    isShow_area: false,
    titleTab_area: ['请选择省', '请选择市', '请选择区'],
    listData_area: [],
    defaultPickData_area: [],
    picker_area_data: [],
    choosedIndexArr_area:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  pickerShow(e){
    console.log(e)
    this.setData({
      isShow_time: true
    })
  },
    /**
   * 点击预约时间
   */
  pickerTimeShow() {
    this.getOrderTime(true)
  },
  getOrderTime(f = false) {
    let today = new Date();
    let hour = today.getHours()
    let listData_time = [
      {
        id: '1',
        name: hour < 21 ? formatYmd(new Date(), '-') : formatYmd(new Date(new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000)), '-'),
        children: getChildren('1', hour) 
      },
      {
        id: '2',
        name: hour < 21 ? formatYmd(new Date(new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000)), '-') : formatYmd(new Date(new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000 * 2)), '-'),
        children: getChildren('2')
      },
      {
        id: '3',
        name: hour < 21 ? formatYmd(new Date(new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000 * 2)), '-') : formatYmd(new Date(new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000 * 3)), '-'),
        children: getChildren('3') 
      },
      {
        id: '4',
        name: hour < 21 ? formatYmd(new Date(new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000 * 3)), '-') : formatYmd(new Date(new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000 * 3)), '-'),
        children: getChildren('4') 
      }
    ]
    function getChildren(pid, hour) {
      let arr = [];
      for (let i = 9; i < 22; i++) {
        arr.push({
          id: pid + '-' + (i - 9 + 1),
          name: i + ":00-" + (i + 1) + ":00"
        })
      }
      if (hour && hour < 21) {
        arr.splice(0, hour - 8)
      }
      return arr
    }
    let sendStartTime = this.data.defaultPickData_time.length == 2 && this.data.defaultPickData_time[0].name && this.data.defaultPickData_time[1].name ? +new Date(this.data.defaultPickData_time[0].name.replace(/-/g, '/') + ' ' + this.data.defaultPickData_time[1].name.split('-')[0]) : '';

    let defaultPickData_time = this.data.defaultPickData_time.length == 0 || (sendStartTime && sendStartTime < +new Date()) ? [{ id: listData_time[0].id, name: listData_time[0].name }, { id: listData_time[0].children[0].id, name: listData_time[0].children[0].name }] : this.data.defaultPickData_time;
    // defaultPickData_time = [{id:'0',name:'2020-11-5'},{id:'0-1',name:'08:00-09:00'}]
    this.setData({ listData_time, defaultPickData_time, isShow_time: f })
    if (!f) {
      this.setData({
        time: `${defaultPickData_time[0].name} ${defaultPickData_time[1].name}`,
        picker_time_data: defaultPickData_time
      })
    }
  },
  /**
   * 选择取件时间 确定
   * @param {*} e 
   */
  sureCallBack_time(e) {
    let picker_time_data = e.detail.choosedData
    this.setData({
      isShow_time: false,
      picker_time_data,
      defaultPickData_time: picker_time_data
    }, () => {
      this.btnDisabeldFn();
    })
    this.setData({ time: `${picker_time_data[0].name} ${picker_time_data[1].name}` })
  },
  /**
   * 选择取件时间 取消
   */
  cancleCallBack_time() {
    this.setData({
      isShow_time: false,
    })
  },
    /**
   * 点击选择地区
   */
  pickerAreaShow() {
    if (this.data.listData_area.length == 0) {
      this.provinceListApi()
    }
    this.setData({ isShow_area: true })
  },
  /**
   * 选择地区 确定
   * @param {*} e 
   */
  sureCallBack_area(e) {
    let picker_area_data = e.detail.choosedData
    let choosedIndexArr = e.detail.choosedIndexArr
    this.setData({
      isShow_area: false,
      picker_area_data,
      defaultPickData_area: picker_area_data,
      choosedIndexArr_area:choosedIndexArr,
      area: `${picker_area_data[0].name}-${picker_area_data[1].name}-${picker_area_data[2].name}`
    }, () => {
      this.btnDisabeldFn();
    })
  },
  /**
   * 选择地区 取消
   */
  cancleCallBack_area() {
    this.setData({
      isShow_area: false,
    })
  },
  /**
   * 地区临时索引
   * @param {*} e 
   */
  exportAreaTempValue(e) {
    let { tempValue = [] } = e.detail;
    // defaultPickData_area
    if (tempValue[1] == -1) {
      tempValue[1] = 0
    }
    if (tempValue[2] == -1) {
      tempValue[2] = 0
    }
    this.setData({ defaultPickData_area: [] })
    if (this.data.listData_area[tempValue[0]].children.length == 0) {
      this.cityListApi(this.data.listData_area[tempValue[0]].id, tempValue[0])
      return;
    }
    if (this.data.listData_area[tempValue[0]].children[tempValue[1]].children.length == 0) {
      this.countyListApi(this.data.listData_area[tempValue[0]].children[tempValue[1]].id, tempValue[0], tempValue[1])
      return;
    }

  },
  // 省API
  provinceListApi () {
    $api.getList()
      .then(res => {
        let mydata = res || [];
          mydata.forEach(o => {
            o.children = ''
          })
          this.setData({
            listData_area: mydata
          });
          if (mydata.length > 0) {
            this.cityListApi(mydata[0].id, 0)
          }
      }).catch(res => {
        wx.showToast({
          title: res && res.message ? res.message : "加载失败",
          icon: 'none'
        });
      })
  },
  // 市API
  cityListApi (provinceId, provinceIndex) {
    $api.getList({provinceId}).then(res => {
      let mydata = res || [];
      mydata.forEach(o => {
        o.children = ''
      })
      this.setData({
        ['listData_area[' + provinceIndex + '].children']: mydata
      })
      if (mydata.length > 0) {
        this.countyListApi(mydata[0].id, provinceIndex, 0)
      }
    }).catch(res => {
      wx.showToast({
        title: res && res.message ? res.message : "加载失败",
        icon: 'none'
      });
    })

  },
  // 区县API
  countyListApi: function (cityId, provinceIndex, cityIndex) {
    $api.getList({cityId}).then(res => {
      let mydata = res || [];
      this.setData({
        ['listData_area[' + provinceIndex + '].children[' + cityIndex + '].children']: mydata,
        defaultPickData_area: [{ id: this.data.listData_area[provinceIndex].id }, { id: this.data.listData_area[provinceIndex].children[cityIndex].id }, { id: mydata[0].id }]
      })
    }).catch(res => {
      wx.showToast({
        title: res && res.message ? res.message : "加载失败",
        icon: 'none'
      });
    })
  },
  btnDisabeldFn(){

  }
})