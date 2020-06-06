//index.js
import {GetStatsData,GetProvinceStatsData,GetCityStatsByProvinceName,GetOverseaStatsData} from '../../api/index'

Page({
  data: {
    provinceData:[],
    isShowCity:false,
    cityData:[],
    overseaStats:[],
  },
  //事件处理函数

  onReady: async function () {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    const results = await Promise.all( [GetProvinceStatsData() , GetOverseaStatsData()] )
    const provinceData = results[0]
    const overseaStats = results[1]
    this.setData({
      provinceData,
      overseaStats
    })
    wx.hideLoading()
  },
  async handleTapProvince(event) {
    this.setData({isLoadingAreaData: true})
    console.log(event.currentTarget.dataset);
    
    wx.showLoading({
      title: '加载中',
    })
    const {provincename} = event.currentTarget.dataset;
    const result = await GetCityStatsByProvinceName(provincename)
    const cityData = result[0]
    this.setData({cityData,isShowCity:true})
    wx.hideLoading()
  },
  gobackProvince(){
    this.setData({ isLoadingAreaData: true})
    wx.showLoading({
      title: '加载中',
    })
    this.setData({isShowCity:false})
    wx.hideLoading()
  }
})
