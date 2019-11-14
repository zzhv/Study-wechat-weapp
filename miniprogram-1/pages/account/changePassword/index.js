import xx from "../../../tool/request.js"
import ss from "../../../tool/show.js"

Component({
  /**
   * 页面的初始数据
   */
  data: {
    changeFormData: {

    },
    loading: false,
    rules: [{
        name: 'oldPassword',
        rules: [{
          required: true,
          message: '原密码必填'
        }],
      },
      {
        name: 'newPassword',
        rules: [{
          required: true,
          message: '新密码必填'
        }],
      },
      {
        name: 'checkPassword',
        rules: [{
            required: true,
            message: '确认密码必填'
          },
          {
            equalTo: 'newPassword',
            message: '新密码与确认密码不一致'
          }
        ],
      }
    ]
  },
  methods: {
    formInputChange(e) {
      const {
        field
      } = e.currentTarget.dataset
      this.setData({
        [`changeFormData.${field}`]: e.detail.value
      })
    },
    //原密码
    // bindOldPasswordInput: function(e) {
    //   this.setData({
    //     oldPassword: e.detail.value,
    //     [`changeFormData.oldPassword`]: e.detail.value
    //   })
    //   console.log(this.data.changeFormData)
    // },
    // 设置按钮状态
    setLoading: function(e) {
      this.setData({
        loading: !this.data.loading
      })
    },
    // 确定修改密码
    submitForm() {
      this.setLoading();
      //检查表单
      this.selectComponent('#changeForm').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
            this.setData({
              error: errors[firstError[0]].message
            })
          }
        } else {
          xx.xPost({
            url: 'account/changePassword',
            data: this.data.changeFormData,
            success: res => {
              if (res.data.code === 200) {
                //清空信息
                wx.clearStorageSync();
                //重新登录
                wx.reLaunch({
                  url: '/pages/account/login/index?reLogin=true',
                });
              } else {
                ss.showNone(res.data.message)
              }
            }
          })
        }
      })
      this.setLoading();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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