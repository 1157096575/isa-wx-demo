/**
 * 去抖
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate 
 * return function
 */
const debounce = (func, wait = 200, immediate) => {
  var timeout, result;
  var debounced = function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}

/**
 * 节流
 * @param {*} fn 
 * @param {*} gapTime 
 * return function
 */
const throttle = (fn, gapTime) => {
  if (gapTime === null || gapTime === undefined || gapTime === '') {
    gapTime = 1500
  }
  let _lastTime = null
  // 返回新的函数
  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn && fn.apply(this, arguments) //将this和参数传给原函数
      _lastTime = _nowTime
    }
  };
}

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
  removeSearchKeyFn(){

  },
  inputSearchFn : debounce(function(e){
    console.log(e)
  }),
  confirmFn(e){
    console.log(e)
  },
  clickFn: throttle( () =>{
    console.log('click')
  }),
})