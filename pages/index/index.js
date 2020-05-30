//index.js
import {GetStatsData,GetProvinceStatsData,GetCityStatsByProvinceName,GetOverseaStatsData} from '../../api/index'

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
    isLoadingAreaData:true,  //在宫格变化时样式很奇怪，所以通过这个判断显示隐藏，不让用户看到奇怪的
    isShowCity:false,
    cityData:[],
    overseaStats:[]
  },
  //事件处理函数

  onReady: async function () {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    const results = await Promise.all( [GetProvinceStatsData() , GetStatsData() , GetOverseaStatsData()] )
    const provinceData = results[0]
    const stats = results[1]
    const overseaStats = results[2]
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
      overseaStats
    })
    // wx.hideLoading()
  },
  getIncrease(count){
    return count > 0 ? ('+' + count) : count
  },
  async handleTapProvince(event) {
    this.setData({isLoadingAreaData: true})
    wx.showLoading({
      title: '加载中',
    })
    const {provincename} = event.currentTarget.dataset;
    const result = await GetCityStatsByProvinceName(provincename)
    const cityData = result[0]
    this.setData({cityData,isShowCity:true})
    // 为避免多次调用导致定时器过多而使内存泄露，要清除定时器
    clearTimeout(timeout)
    const timeout = setTimeout(()=>{
      this.setData({isLoadingAreaData: false})
      wx.hideLoading()
    },200)
  },
  gobackProvince(){
    this.setData({ isLoadingAreaData: true})
    wx.showLoading({
      title: '加载中',
    })
    this.setData({isShowCity:false})
    clearTimeout(timeout)
    const timeout = setTimeout(()=>{
      this.setData({isLoadingAreaData: false})
      wx.hideLoading()
    },300)
  }
})
