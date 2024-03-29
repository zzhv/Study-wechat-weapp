const app = getApp();
import xx from "../../tool/request.js"
import {
  codes
} from "../../tool/codes.js"
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }

    }
  },
  data: {
    time: '',
  },
  methods: {
    getTime: function() {
      xx.xGet({
        url: "Home/Time",
        success: res => {
          const {
            data
          } = res.data;
          if (res.data.code === codes.success) {
            this.setData({
              time: data
            })
          }
        }
      });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.getTime();
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
  }
})