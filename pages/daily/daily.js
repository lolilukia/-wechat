const util = require('../../utils/util.js') 
Page({
  data:{
    daily_date: '',
    sign_time: '',
    daily_type: '',
    stunum: '',
    signup: false,
    total: 0,
    order: 0,
    view: false,
    names: [],
    check: false,
    coach: false,
    coach_sign: false
  },
  onLoad: function (options){
    var that = this;
    var date = new Date(new Date(new Date().toLocaleDateString()).getTime());
    var weekday = date.getDay();
    if (weekday == 2 || weekday == 4) {
      that.setData({
        daily_date: util.formatDate(date),
        sign_time: util.formatTime(new Date(date.getTime() - 7 * 60 * 60 * 1000))
      });
      if (weekday == 2) {
        that.setData({
          daily_type: '教学场'
        });
      }
      else {
        that.setData({
          daily_type: '自由活动场'
        });
      }
    }
    else if (weekday == 1 || weekday == 3) {
      that.setData({
        daily_date: util.formatDate(new Date(date.getTime() + 24 * 60 * 60 * 1000)),
        sign_time: util.formatTime(new Date(date.getTime() + 17 * 60 * 60 * 1000))
      });
      if (weekday == 1) {
        that.setData({
          daily_type: '教学场'
        });
      }
      else {
        that.setData({
          daily_type: '自由活动场'
        });
      }
    }
    else if (weekday == 0) {
      that.setData({
        daily_date: util.formatDate(new Date(date.getTime() + 48 * 60 * 60 * 1000)),
        sign_time: util.formatTime(new Date(date.getTime() + 41 * 60 * 60 * 1000)),
        daily_type: '教学场'
      });
    }
    else if (weekday == 5) {
      that.setData({
        daily_date: util.formatDate(new Date(date.getTime() + 96 * 60 * 60 * 1000)),
        sign_time: util.formatTime(new Date(date.getTime() + 89 * 60 * 60 * 1000)),
        daily_type: '教学场'
      });
    }
    else if (weekday == 6) {
      that.setData({
        daily_date: util.formatDate(new Date(date.getTime() + 72 * 60 * 60 * 1000)),
        sign_time: util.formatTime(new Date(date.getTime() + 65 * 60 * 60 * 1000)),
        daily_type: '教学场'
      });
    }
    if(options.stunum == ''){
      wx.showModal({
        title: '信息获取失败',
        content: '请先填写个人资料',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
            });
          } else if (res.cancel) {
            wx.navigateBack({
            });
          }
        }
      });
    }
    else{
      that.setData({
        stunum: options.stunum
      });
      if(weekday == 2){
        wx.request({
          url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=coach/judge&stunum=' + that.data.stunum,
          method: 'GET',
          success: function (result) {
            if (result.data.state.indexOf('success') != -1) {
              if (result.data.coach == 1) {
                that.setData({
                  coach: true
                });
                if(result.data.sign == 1){
                  that.setData({
                    coach_sign: true
                  });
                }
              }
            }
            else {
              console.log(result.data);
            }
          }
        });
      }
      wx.request({
        url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=activity/order&stunum=' + that.data.stunum,
        method: 'GET',
        success: function (result) {
          if (result.data.state.indexOf('success') != -1) {
            console.log(result.data.is_sign);
            if (result.data.is_sign == 'false') {
              that.setData({
                signup: false,
                total: result.data.total
              });
            }
            else {
              that.setData({
                signup: true,
                total: result.data.total,
                order: result.data.order
              });
            }
          }
          else {
            console.log(result.data);
          }
        }
      });
    }
  },
  pressSign: function () {
    var that = this;
    if(that.data.signup == true)
    {
      wx.showModal({
        title: '提示',
        content: '你已报名当天的活动',
        success: function (res) {
          console.log('has sign');
        }
      });
    }
    else{
      var date = new Date();
      var today = date.getDay();
      var hours = date.getHours();
      var mins = date.getMinutes();
      if (today < 1 || today > 4 || (today == 1 && hours < 17) || (today == 3 && hours < 17) || (today == 2 && hours > 18) || (today == 4 && hours > 18)) {
        wx.showModal({
          title: '提示',
          content: '未到活动报名时间',
          success: function (res) {
            console.log('time error');
          }
        });
      }
      else {
        wx.request({
          url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=activity/add',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            stunum: that.data.stunum,
          },
          success: function (result) {
            if (result.data.state.indexOf('success') != -1) {
              that.setData({
                signup: true,
                order: result.data.detail,
                total: that.data.total + 1
              })
              wx.showModal({
                title: '报名成功',
                content: '排在第'+ that.data.order + '位',
                success: function (res) {
                  console.log('sign successfully');
                }
              });
            }
            else if (result.data.state.indexOf('insufficient') != -1){
              wx.showModal({
                title: '提示',
                content: '余额不足，请立即充值',
                success: function (res) {
                  console.log('insufficient');
                }
              });
            }
          }
        });
      }
    }
  },
  pressDetail: function () {
    var that = this;
    wx.navigateTo({
      url: '../detail/detail?date=' + that.data.daily_date,
    })
  },
  pressCancel: function () {
    var that = this;
    var date = new Date();
    var day = date.getDay();
    var hour = date.getHours();
    if((day == 2 || day == 4) && hour >= 17){
      wx.showModal({
        title: '提示',
        content: '请在当天五点之前退报名',
        success: function (res) {
          console.log('cancel error');
        }
      });
    }
    else{
      wx.showModal({
        title: '确认',
        content: '确定要退报名吗',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=activity/cancel',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                stunum: that.data.stunum,
              },
              success: function (result) {
                if (result.data.state.indexOf('success') != -1) {
                  that.setData({
                    signup: false,
                    total: that.data.total - 1
                  })
                }
              }
            });
          } else if (res.cancel) {
            console.log('fail to cancel')
          }
        }
      });
    }
  },
  pressCoach: function (){
    var that = this;
    if(that.data.coach_sign){
      wx.showModal({
        title: '提示',
        content: '你已进行教练签到',
        success: function (res) {
          console.log('already sign as coach');
        }
      });
    }
    else{
      wx.request({
        url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=coach/sign',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          stunum: that.data.stunum,
        },
        success: function (result) {
          if (result.data.state.indexOf('success') != -1) {
            that.setData({
              coach_sign: true
            });
            wx.showModal({
              title: '提示',
              content: '教练签到成功!',
              success: function (res) {
                console.log('sign as coach');
              }
            });
          }
        }
      });
    }
  }
})