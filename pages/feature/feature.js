const util = require('../../utils/util.js')
Page({
  data: {
    feature_date: '',
    name: '',
    finish: '',
    detail: '',
    url: '',
    actid: 0
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      actid: options.act_id
    });
    wx.request({
      url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=feature/detail&id=' + options.act_id,
      method: 'GET',
      success: function (result) {
        if (result.data.state.indexOf('success') != -1) {
          console.log(result.data);
          that.setData({
            name: result.data.name,
            feature_date: result.data.act_time,
            detail: result.data.detail,
            url: result.data.url
          });
          if (result.data.finished == 0){
            that.setData({
              finish: '报名中',
            })
          }
          else{
            that.setData({
              finish: '已结束',
            })
          }
        }
        else {
          console.log(result.data);
        }
      }
    });
  },
  pressSign: function () {
    var that = this;
    if(that.data.finish == '已结束')
    {
      wx.showToast({
        title: '活动已结束',
        icon: 'loading',
        duration: 1000
      })
      return;
    }
    else{
      wx.navigateTo({
        url: '../form/form?actid=' + that.data.actid,
      })
    }
  }
})