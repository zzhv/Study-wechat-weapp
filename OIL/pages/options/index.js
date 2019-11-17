import xx from "../../tool/request.js"
import ss from "../../tool/show.js"
import {
  codes
} from "../../tool/codes.js"


Page({
  /**
   * 页面的初始数据
   */
  data: {
    cateItems: [],
    curNav: 1,
    curIndex: 0
  },
  switchRightTab: function(e) {
    let id = e.target.dataset.id,
      index = e.target.dataset.index;
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    xx.xGet({
      url: 'Options/GetCateitems',
      success: res => {
        this.setData({
          cateItems: res.data.data
        },()=>{
          wx.hideLoading()
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading() //showLoading 只能用此语句关闭
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})