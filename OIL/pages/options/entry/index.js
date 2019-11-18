import xx from "../../../tool/request.js"
import ss from "../../../tool/show.js"

Component({
  /**
   * 页面的初始数据
   */
  data: {
    FormData: {

    },
    loading: false,
    rules: [{
      name: 'staffName',
      rules: [{
        required: true,
        message: '员工姓名必填'
      }],
    }]
  },
  methods: {
    formInputChange(e) {
      const {
        field
      } = e.currentTarget.dataset
      this.setData({
        [`FormData.${field}`]: e.detail.value
      })
    },
    // 设置按钮状态
    setLoading: function(e) {
      this.setData({
        loading: !this.data.loading
      })
    },
    // 确定提交
    submitForm() {
      this.setLoading();
      //检查表单
      this.selectComponent('#addStaffForm').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
            this.setData({
              error: errors[firstError[0]].message
            })
          }
        } else {
          //检查内容
          console.log(`"${JSON.stringify(this.data.FormData).replace(/\"/g, "")}"`)
          xx.xPost({
            url: "account/CheckText",
            data: `"${JSON.stringify(this.data.FormData).replace(/\"/g, "")}"`,
            success: res => {
              console.log(res);
              if (res.data.errcode == 87014) {
                ss.showNone("注意言辞");
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