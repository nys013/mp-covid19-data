
import { GetWikiData } from "../../api/index";

Page({
  data: {
    isLoading: true,
    wikiList: []
  },
  async onLoad(){
    const res = await GetWikiData()
    const wikiList = res.result
    this.setData({wikiList})
  },
  // 点击复制链接触发
  copy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.linkurl,
      success(res) {
        wx.showToast({
          title: '链接已复制'
        })
      }
    })
  }
})
