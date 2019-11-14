const app = getApp();
import xx from "../../tool/request.js"
import ss from "../../tool/show.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      realName: '',
      userName: ''
    },
    loading: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取并加载数据
    var uInfo = wx.getStorageSync('info');
    this.setData({
      userInfo: uInfo
    });
  },
  //跳转到修改密码
  navigateToChangePassword: () => {
    wx.navigateTo({
      url: '/pages/account/changePassword/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    xx.xGet({
      url: 'Account/Info',
      success: res => {
        if (res.data.code !== 200) {
          return false;
        }
        this.setData({
          userInfo: res.data.data
        });
        wx.setStorageSync('info', res.data.data);
        wx.stopPullDownRefresh();
      }
    })
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