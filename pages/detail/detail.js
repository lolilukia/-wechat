const config = require('../../utils/config.js');
Page({
  data: {
    names: []
  },
  onLoad(options) {
    var that = this;
    wx.request({
      url: config.api_url + '?r=activity/applicant&date=' + options.date
      + '&type=' + options.type,
      method: 'GET',
      success: function (result) {
        if (result.data.state.indexOf('success') != -1) {
          //console.log(result.data);
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