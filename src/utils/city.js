import BDMapWX from './map'
let cityBank = []
var homeIndex = 0

function init () {
  try {
    const BDMap = new BDMapWX({
      ak: 'UnMeMmKOwfL2jYjTq1VU3TAgCIsqb6Gf'
    })
    const value = wx.getStorageSync('citys')
    if (value) {
      // 缓存了
      console.log(value, 'from 缓存')
      cityBank = value
    } else {
      const fail = (data) => console.log(data)
      const success = (data) => {
        console.log(data, 'from outer succ')
        var weatherData = data.currentWeather[0]
        weatherData.fullData = data.originalData.results[0]
        //console.log(weatherData);
        //weatherData.xy=checkXY(weatherData.currentCity);
        cityBank.push(weatherData)
        homeIndex=0
        try {
            wx.setStorageSync('citys', cityBank)
            wx.setStorageSync('index', homeIndex)
        } catch (e) {    
        }
      }
      BDMap.weather({
          fail, 
          success 
      })
    }
    // console.log(BDMap.getWXLocation())
    // const fail = (data) => console.log(data, '1212')
    // const success = (data) => console.log(data, '121212')
    // BDMap.getWXLocation(
    //   'gcj02',
    //   success,
    //   fail
    // )
  } catch (e) {
    console.log(e, '121212')
  }
}

function getCities () {
  return cityBank
}

export default {
  init,
  getCities
}
