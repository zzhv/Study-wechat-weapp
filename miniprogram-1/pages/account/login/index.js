const app = getApp();
import xx from "../../../tool/request.js"
import ss from "../../../tool/show.js"

Page({
  data: {
    userName: 'Admin',
    password: '123456',
    loading: false
  },
  //username
  bindUserNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  //passord
  bindPasswordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //设置按钮loding状态
  setLoading: function(e) {
    this.setData({
      loading: !this.data.loading
    })
  },
  //微信登录 暂时不弄
  wxLogin: function() {
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: app.globalData.URL + 'Account/WxLogin',
            method: 'get',
            data: {
              code: res.code
            },
            success: function(ers) {
              console.log(ers.data);
            }
          })
        } else {
          wx.showToast({
            title: res.message,
            duration: 1500,
            icon: 'none'
          })
        }
      }
    })
  },
  //普通登录
  normalLogin: function() {
    //开始loding
    this.setLoading();
    wx.request({
      url: app.globalData.URL + 'Account/NormalLogin',
      method: 'post',
      data: {
        UserName: this.data.userName,
        Password: this.data.password
      },
      success: (res) => {
        let data = res.data;
        if (data.code === 200) {
          let token = data.data.token;
          if (token) {
            wx.setStorageSync("token", token);
            this.userInfo();
            wx.switchTab({
              // url: '/pages/home/home',
              url: '/pages/me/index',
            })
          }
        } else {
          ss.showNone(res.data.message);
          // 结束loding
          this.setLoading();
        }
      },
      fail() {
        ss.showNone("网络异常");
        this.setLoading();
      }
    })
  },
  //获取用户信息
  userInfo() {
    xx.xGet({
      url: 'Account/Info',
      success: res => {
        if (res.data.code !== 200) {
          return false;
        }
        //存起来
        //app.globalData.userInfo=res.data.data;
        wx.setStorageSync('info', res.data.data);
      }
    })
  },
  //LocalStorage里面有Token吗？
  doesTokenEmpty: function() {
    let token = wx.getStorageSync("token");
    if (token) {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //如果Token已过期
    if (options.tokenExpired) {
      wx.showToast({
        title: '身份已过期，请重新登录',
        duration: 1500,
        icon: 'none'
      })
    } else if (options.reLogin) {
      wx.showToast({
        title: '请重新登录',
      })
    }
    let token = wx.getStorageSync("token");
    if (token) {
      wx.switchTab({
        url: '/pages/me/index',
      })
    } else {
      return false;
    };
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