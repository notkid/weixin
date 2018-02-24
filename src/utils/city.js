import BDMapWX from './map'
const cityBank = []

function init () {
  try {
    const BDMap = new BDMapWX({
      ak: 'UnMeMmKOwfL2jYjTq1VU3TAgCIsqb6Gf'
    })
    console.log(BDMap.getWXLocation())
    const fail = (data) => console.log(data, '1212')
    const success = (data) => console.log(data, '121212')
    BDMap.getWXLocation(
      'gcj02',
      success,
      fail
    )
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
