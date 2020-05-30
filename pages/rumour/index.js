
import { GetRumourData } from "../../api/index";

Page({
  data: {
    isLoading: true,
    rumourList: [],
  },
  async onLoad(){
    wx.showLoading({title: '加载中'})
    const res = await GetRumourData()
    const rumourList = res.map((item) => {
      item.type = this.getType(item.rumorType*1)
      return item
    })
    this.setData({rumourList},()=>{
      wx.hideLoading()
    })
  },
  getType(type){
    switch(type){
      case 0:return "谣言"
      case 1:return "真相"
      case 2:return "尚无定论"
      default:return "未求证"
    }
  }
})
