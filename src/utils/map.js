import wepy from 'wepy'

export default class BDMapWX {
  constructor(param) {
    this.ak = param['ak']
  }
  /**
   * 调用微信定位接口
   * @param {string} type 坐标类型
   * @param {Function} success 成功之后的回调
   * @param {Function} fail 失败之后的回调
   * @param {Function} complete 完成之后的回调
   */
  getWXLocation(type = 'gcj02', success = () => {}, fail = () => {}, complete = () => {}) {
    wepy.getLocation({
      type,
      success,
      fail,
      complete
    })
  }
  /**
   * 天气
   * @param {Object} param 检索配置
   */
  weather({coord_type = 'gcj02', success = () => {}, fail = () => {}, location = '', output = 'json', sn = '', timestamp = ''}) {
    const type = 'gcj02'
    const weatherParam = {
      coord_type,
      ak: this.ak,
      output,
      sn,
      timestamp
    }
    const locationSuccess = (data) => {
      weatherParam.location = `${data.longitude},${data.latitude}`
      wepy.request({
        url: 'https://api.map.baidu.com/telematics/v3/weather'，
        data: weatherParam,
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        success(data) {
          const res = data.data
          if (res && res.error === 0 && res.status === 'success') {
            const weatherArr = res.results
            const outputRes = {}
            success({
              originalData: res,
              currentWeather: [{
                // currentCity: weatherArr[0][""]
              }]
            })
          } else {
            fail({
              errMsg: res.message,
              statusCode: res.status
            })
          }
        },
        fail(data) {
          fail(data)
        }
      })
    }
    const locationFail = (data) => fail(result)
    const locationComplete = (data) => console.log(data)
    if (!location) {
      this.getWXLocation(type, locationSuccess, locationFail, locationComplete)
    } else {
      const longitude = location.split(',')[0]
      const latitude = location.split(',')[1]
      const errMsg = 'input location'
      locationSuccess({
        errMsg,
        latitude,
        longitude
      })
    }
  }
}
