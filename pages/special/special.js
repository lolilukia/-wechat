const config = require('../../utils/config.js');
Page({
  data: {
    sps: [],
    act_id: ''
  },
  onLoad(options) {
    var that = this;
    that.setData({
      act_id: options.actid
    });
    wx.request({
      url: config.api_url + '?r=special/info&act_id=' + that.data.act_id,
      method: 'GET',
      success: function (result) {
        if (result.data.state.indexOf('success') != -1) {
          console.log(result.data);
          that.setData({
            sps: result.data.info
          });
        }
        else {
          console.log(result.data);
        }
      }
    });
  },
})