
import { GetTimelinePageData } from "../../api/index";


// // 监听滚动节流
// const loadMoreThrottle = throttle(func => func(), 300)

Page({
  data: {
    isBottom: false,
    pageNo: 1,
    pageSize: 6,
    eventList: []
  },
  onLoad(){
    this.getEventList()
  },
  async getEventList(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    const {pageNo,pageSize} = this.data
    const res = await GetTimelinePageData({pageNo,pageSize})
    console.log(res);
    const {list} = res
    if(list.length){
      let eventList = list.map((item) => {
        item.publishInfo = item.pubDateStr + " " +  item.infoSource
        return item
      })
      eventList = [...this.data.eventList,...eventList]
      this.setData({eventList},()=>{
        wx.hideLoading()
      })
    }else{
      this.setData({isBottom:true},()=>{
        wx.hideLoading()
      })
    }
  },
  handleScrollToLower(){
    if(!this.data.isBottom){
      let {pageNo} = this.data
      pageNo++
      this.setData({pageNo},()=>{
        this.data.pageNo
        this.getEventList()
      })
    }
  },
  copy(event){
    const {linkurl} = event.currentTarget.dataset
    wx.setClipboardData({data:linkurl})
    
  }
})
