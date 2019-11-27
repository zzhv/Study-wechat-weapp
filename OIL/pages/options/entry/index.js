import xx from "../../../tool/request.js"
import ss from "../../../tool/show.js"
const apiHost = getApp().globalData.URL;

Component({
  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    //性别单选框
    radioItems: [{
        name: '女',
        value: '0'
      },
      {
        name: '男',
        value: '1',
        checked: true
      }
    ],
    // 时间选择框
    date: "2016-09-01",
    time: "12:01",
    //选择框
    array: ['博士', '硕士', '本科', '专科', '高中', '初中', '小学'],
    sarray: [{
        id: "博士",
        name: "博士"
      },
      {
        id: "本科",
        name: "本科"
      },
    ],
    index: 2,
    //最后提交的
    FormData: {
      sex: 1,
      education: 2
    },
    loading: false,
    rules: [{
        name: 'staffName',
        rules: {
          required: true,
          message: '员工姓名必填'
        },
      },
      {
        name: 'mobile',
        rules: [{
          required: true,
          message: '手机号必填'
        }, {
          mobile: true,
          message: '手机号格式不对'
        }],
      }, {
        name: 'idcard',
        rules: {
          required: true,
          message: 'xx必填'
        },
      }, {
        name: 'address',
        rules: {
          required: true,
          message: '住址必填'
        },
      }
    ],
  },
  methods: {
    // 选择与上传照片
    chooseImage: function(e) {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          const tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
            url: apiHost + 'account/addStaff', //仅为示例，非真实的接口地址
            header: {
              Authorization: 'Bearer ' + wx.getStorageSync("token")
            },
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success(res) {
              const data = res.data
              //do something
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片)
              that.setData({
                files: that.data.files.concat(res.tempFilePaths)
              });
            }
          })
        }
      })
    },
    previewImage: function(e) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
      })
    },
    EducationFormat(value) {
      this.data.array.forEach((x) => {
        console.log(x);
      })
    },
    //选择列表
    bindPickerChange: function(e) {
      this.EducationFormat(e.detail.value);
      this.setData({
        index: e.detail.value,
        ['FormData.education']: this.data.array[e.detail.value]
      })
    },
    //生日
    bindBirthdayChange: function(e) {
      this.setData({
        date: e.detail.value,
        ['FormData.birthday']: e.detail.value
      })
    },
    //入职日期
    bindJoinDateChange: function(e) {
      this.setData({
        date: e.detail.value,
        ['FormData.joinDate']: e.detail.value
      })
    },
    //单选框
    radioChange: function(e) {
      var radioItems = this.data.radioItems;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
      }
      this.setData({
        radioItems: radioItems,
        ['FormData.sex']: e.detail.value
      });
    },
    //表单输入
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
          //提交表单内容（后台需检测内容是否违规）
          xx.xPost({
            url: "account/AddStaff",
            data: `"${JSON.stringify(this.data.FormData).replace(/\"/g, "")}"`,
            success: res => {
              console.log(res);
              if (res.data.errcode === 87014) {
                this.setData({
                  error: "添加失败，请修改不当内容后再提交!"
                })
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