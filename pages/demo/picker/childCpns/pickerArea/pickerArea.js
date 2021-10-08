const util = require('../../../../../utils/util.js');
const $api = require("../../../../../api/index.js")
const areaControllerApi = {};
import { isPlainObject } from '../cusPicker/tool'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollType: {
      type: String,
      value: 'normal'// "link": scroll间联动  "normal": scroll相互独立
    },
    listData: {
      type: Array,
      value: [],
      observer: function(newVal) {
        if (newVal.length === 0 || this._compareDate()) return
        const tempArr = [...new Array(newVal.length).keys()].map(() => 0)
        this.data.lastValue = this.data.tempValue = tempArr
        this.setData({
          tempValue:tempArr, 
        })
        this._setDefault()
      }
    },
    defaultPickData: {
      type: Array,
      value: [],
      observer: function(newVal) {
        if (newVal.length === 0 || this._compareDate()) return
        this._setTempData()
        this._setDefault()
      }
    },
    choosedIndexArr_area:{
      type: Array,
      value: []
    },
    keyWordsOfShow: {
      type: String,
      value: 'name'
    },
    isShowPicker: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        if (newVal) {
          this._openPicker()
        } else {
          this._closePicker()
        }
      }
    },
    titleText: {// 标题文案
      type: String,
      value: '选择区域'
    },
    titleTab: {// 标题 类型
      type: Array,
      optionalTypes: [String],
      value: ['层级一-省', '层级二-市', '层级三-区']
    },
    cancelText: {// 取消按钮文案
      type: String,
      value: '取消'
    },
    sureText: {// 确定按钮文案
      type: String,
      value: '完成'
    },
    pickerHeaderStyle: String, // 标题栏样式 view
    sureStyle: String, // 标题栏确定样式  text
    cancelStyle: String, // 标题栏取消样式 text
    titleStyle: String, // 标题栏标题样式  view
    maskStyle: String, // 设置蒙层的样式（详见picker-view） view
    indicatorStyle: String, // 设置选择器中间选中框的样式（详见picker-view） view
    chooseItemTextStyle: String// 设置picker列表文案样式 text
  },

  /**
   * 组件的初始数据
   */
  data: {
    columnsData: [],
    value: [],
    backData: [],
    height: 0,
    isOpen: false,
    isUseKeywordOfShow: false,
    scrollEnd: true, // 滚动是否结束
    lastValue: [], // 上次各个colum的选择索引
    tempValue: [],
    isFirstOpen: true,
    onlyKey: '',
    defaultPickDataTemp: '',
    listDataTemp: '',
    listData_area:[],
    provinceList: [],
    cityList:[],
    countyList: [],
    province:[],
    city:[],
    county:[]
  },
  attached: function() {
    this.provinceListApi()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 省API
    provinceListApi: function () {
      $api.getList()
      .then(res => {
        let mydata = res || [];
        mydata.forEach(o => {
          o.children = []
        })
        this.setData({
          listData_area: mydata,
          provinceList: mydata,
          province:[0]
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
    cityListApi: function (provinceId, provinceIndex) {
      if(this.data.listData_area[provinceIndex].children && this.data.listData_area[provinceIndex].children.length > 0){
        this.setData({cityList: this.data.listData_area[provinceIndex].children})
        this.countyListApi(this.data.listData_area[provinceIndex].children[0].id, provinceIndex, 0)
        return;
      }
      $api.getList({provinceId})
      .then(res => {
        let mydata = res || [];
        mydata.forEach(o => {
          o.children = []
        })
        this.setData({
          ['listData_area[' + provinceIndex + '].children']: mydata,
          cityList:mydata,
          city: [0]
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
      if(this.data.listData_area[provinceIndex].children[cityIndex].children && this.data.listData_area[provinceIndex].children[cityIndex].children.length > 0){
        this.setData({countyList: this.data.listData_area[provinceIndex].children[cityIndex].children})
        return;
      }
      $api.getList({cityId})
      .then(res => {
        let mydata = res || [];
        this.setData({
          ['listData_area[' + provinceIndex + '].children[' + cityIndex + '].children']: mydata,
          countyList : mydata,
          county:[0]
        })
      }).catch(res => {
        wx.showToast({
          title: res && res.message ? res.message : "加载失败",
          icon: 'none'
        });
      })
    },
    // 当滚动选择开始时候触发事件 _province
    _bindpickstart_province(e){

    },
    //滚动选择时触发change事件 _province
    _bindChange_province(e){
      let index = e.detail.value[0];
      this.setData({
        province: e.detail.value
      })
      this.cityListApi(this.data.provinceList[index].id, index)
    },
    //当滚动选择结束时候触发事件 _province
    _bindpickend_province(e){
    },
    // 当滚动选择开始时候触发事件 _city
    _bindpickstart_city(e){

    },
    //滚动选择时触发change事件 _city
    _bindChange_city(e){
      let index = e.detail.value[0];
      this.setData({
        city: e.detail.value
      })

      this.countyListApi(this.data.cityList[index].id, this.data.province[0], index)
    },
    //当滚动选择结束时候触发事件 _city
    _bindpickend_city(e){

    },
    // 当滚动选择开始时候触发事件 _county
    _bindpickstart_county(e){
    },
    //滚动选择时触发change事件 _county
    _bindChange_county(e){
      this.setData({
        county: e.detail.value
      })
    },
    //当滚动选择结束时候触发事件 _county
    _bindpickend_county(e){

    },
    _openPicker() {
      this.setData({
        isOpen: true
      })
      
      if(this.data.provinceList.length == 0 || this.data.listData_area.length == 0){
        this.provinceListApi()
        return;
      }
      let choosedIndexArr_area= this.properties.choosedIndexArr_area || []
      if(choosedIndexArr_area.length == 3 && this.data.provinceList.length > 0){
        this.setData({
          province: [choosedIndexArr_area[0]],
          city: [choosedIndexArr_area[1]],
          county: [choosedIndexArr_area[2]]
        })
        this.cityListApi(this.data.provinceList[choosedIndexArr_area[0]].id, choosedIndexArr_area[0])
      }
    },
    _closePicker() {
      this.setData({
        isOpen: false
      })
    },
    sure(e) {
      let provinceIndex = this.data.province[0];
      let cityIndex = this.data.city[0];
      let countyIndex = this.data.county[0];
      let choosedData = [this.data.provinceList[provinceIndex], this.data.cityList[cityIndex],this.data.countyList[countyIndex]];
      this.triggerEvent('sure', {
        choosedData,
        choosedIndexArr: [provinceIndex,cityIndex,choosedData]
      })
      this._closePicker()
    },
    cancle() {
      this.triggerEvent('cancle')
      this._closePicker()
    }
  }
})
