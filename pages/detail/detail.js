Page({
  data: {
    names: []
  },
  onLoad(options) {
    var that = this;
    wx.request({
      url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=activity/applicant&date=' + options.date,
      method: 'GET',
      success: function (result) {
        if (result.data.state.indexOf('success') != -1) {
          console.log(result.data);
          that.setData({
            names: result.data.names
          });
        }
        else {
          console.log(result.data);
        }
      }
    });
  },
})