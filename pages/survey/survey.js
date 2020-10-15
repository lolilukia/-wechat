const app = getApp()
const config = require('../../utils/config.js');
Page({
  data: {
    year: -1,
    aim: -1,
    willingness: -1,
    teaching: -1,
    activity: '',
    stunum: '',
    text: '',
    yearsexp: [
      { name: 0, value: '一年以下', checked: false},
      { name: 1, value: '1-3年', checked: false},
      { name: 2, value: '3-5年', checked: false},
      { name: 3, value: '五年以上', checked: false},
    ],
    purpose: [
      { name: 0, value: '锻炼身体', checked: false},
      { name: 1, value: '提高羽毛球水平', checked: false},
      { name: 2, value: '找约球的小伙伴', checked: false},
    ],
    willing: [
      { name: 0, value: '是', checked: false},
      { name: 1, value: '否', checked: false},
    ],
    hope: [
      { name: 0, value: '选某个教练进行训练', checked: false},
      { name: 1, value: '分层级/项目跟不同教练训练', checked: false},
    ],
  },
  onLoad: function(options)
  {
    var that = this;
    that.setData({
      stunum: options.stunum
    });
    wx.request({
      url: config.api_url + '?r=survey/investigate&stunum=' + that.data.stunum,
      method: 'GET',
      success: function (result) {
        if(result.data.survey == 1){
          that.data.yearsexp[result.data.year].checked = "true";
          let poses = result.data.purpose.split(',');
          for(var i = 0; i < poses.length; i++){
            if(poses[i] != "") that.data.purpose[parseInt(poses[i])].checked = "true";
          }
          that.data.willing[result.data.willing].checked = "true";
          that.data.hope[result.data.hope].checked = "true";
          that.setData({
            yearsexp: that.data.yearsexp,
            purpose: that.data.purpose,
            willing: that.data.willing,
            hope: that.data.hope,
            text: result.data.advise
          });
          that.setData({
            year: result.data.year,
            aim: result.data.purpose,
            willingness: result.data.willing,
            teaching: result.data.hope,
            activity: result.data.advise
          });
        }
      }
    })
  },
  radioChange: function (e) {
    this.setData({
      year: e.detail.value
    })
  },
  checkboxChange: function (e) {
    this.setData({
      aim: e.detail.value.join(",")
    })
  },
  willChange: function (e) {
    this.setData({
      willingness: e.detail.value
    })
  },
  hopeChange: function (e) {
    this.setData({
      teaching: e.detail.value
    })
  },
  bindInput: function (e) {
    this.setData({
      activity: e.detail.value
    })
  },
  submitBind: function (e) {
    var that = this;
    if((that.data.year == -1) || (that.data.aim == -1) || 
    (that.data.willingness == -1) || (that.data.teaching == -1)){
      wx.showModal({
        title: '提示',
        content: '请填写相应选项',
        success: function (res) {
          if (res.confirm) {
            console.log('confirm')
          } else if (res.cancel) {
            console.log('cancel')
          }
        }
      });
    }
    else{
      wx.request({
        url: config.api_url + '?r=survey/survey',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          stunum: that.data.stunum,
          yearsexp: that.data.year,
          purpose: that.data.aim,
          willing: that.data.willingness,
          hope: that.data.teaching,
          advise: that.data.activity
        },
        success: function (result) {
          if (result.data.state.indexOf('add') != -1 || result.data.state.indexOf('update') != -1) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1500
            });
            setTimeout(function () {
              wx.navigateBack({
              });
            }, 1000);
          }
          else {
            console.log(result.data.state);
          }
        }
      });
    }
  }
})