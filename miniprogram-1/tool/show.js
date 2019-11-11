function showNone(msg) {
  wx.showToast({
    title: msg,
    duration: 1500,
    icon: 'none'
  })
}

module.exports.showNone = showNone;