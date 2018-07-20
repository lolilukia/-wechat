Page({
  data:{
    stunum: '',
    count: 0,
    records: [],
    act_info: ''
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      stunum: options.stunum
    });
    wx.request({
      url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=sign/find&stunum=' + that.data.stunum,
      method: 'GET',
      success: function (result) {
        that.setData({
          count: result.data.count,
        });
        if (that.data.count != 0) {
          that.setData({
            records: result.data.records,
            act_info: '共参加' + that.data.count + '场活动'
          });
        }
      }
    })
  }
})