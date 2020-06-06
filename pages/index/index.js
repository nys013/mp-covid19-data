//index.js
import {GetStatsData,GetProvinceStatsData} from '../../api/index'

Page({
  data: {
    stats:{},
    isLoading:false,
    confirmInc: '',
    suspectedInc: '',
    seriousInc: '',
    deadInc: '',
    curedInc: '',
    provinceData:[],
  },
  //事件处理函数

  onReady: async function () {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    const results = await Promise.all( [GetProvinceStatsData() , GetStatsData()] )
    const provinceData = results[0]
    const stats = results[1]
    this.setData({
      stats,
      isLoading:false,
      confirmInc: this.getIncrease(stats.confirmedIncr),
      suspectedInc: this.getIncrease(stats.suspectedIncr),
      seriousInc: this.getIncrease(stats.seriousIncr),
      deadInc: this.getIncrease(stats.deadIncr),
      curedInc: this.getIncrease(stats.curedIncr),
      provinceData,
      isLoadingAreaData: false,
    })
    wx.hideLoading()
  },
  getIncrease(count){
    return count > 0 ? ('+' + count) : count
  },
})
