const util = require('../../utils/util.js')
const config = require('../../utils/config.js'); 
Page({
  data:{
    daily_date: '',
    daily_act: '',
    sign_time: '',
    daily_type: '',
    location: config.location,
    number: config.teach_num,
    stunum: '',
    signup: false,
    total: 0,
    order: 0,
    view: false,
    names: [],
    check: false,
    type: -1
  },
  onLoad: function (options){
    var that = this;
    var date = new Date(new Date(new Date().toLocaleDateString()).getTime());
    var weekday = date.getDay();
    var teach_start = config.teach_sign_time.slice(0, 5);
    var act_start = config.act_sign_time.slice(0, 5);
    that.setData({
      type: options.type
    });
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
      if(options.type == 0){
        wx.request({
          url: config.api_url + '?r=coach/judge&stunum=' + that.data.stunum,
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
        url: config.api_url + '?r=activity/order&stunum=' + that.data.stunum
        + '&type=' + options.type,
        method: 'GET',
        success: function (result) {
          if (result.data.state.indexOf('success') != -1) {
            //console.log(result.data);
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
        }
      });
    }
    if(options.type == 0){
      if(weekday == config.teach_weekday){
        that.setData({
          daily_type: config.teach_name,
          daily_date: util.formatDate(date),
          daily_act: config.teach_time,
          sign_time: util.formatDate(new Date(
            date.getTime() - config.day_time)) + ' ' + teach_start,
          number: config.teach_num
        });
      }
      else if(weekday < config.teach_weekday){
        that.setData({
          daily_type: config.teach_name,
          daily_date: util.formatDate(new Date(date.getTime() + (
            config.teach_weekday - weekday) * config.day_time)),
          daily_act: config.teach_time,  
          sign_time: util.formatDate(new Date(
            date.getTime() + (config.teach_weekday - weekday - 1) 
            * config.day_time)) + ' ' + teach_start,
          number: config.teach_num  
        });
      }
      else{
        that.setData({
          daily_type: config.teach_name,
          daily_date: util.formatDate(new Date(date.getTime() + (
            7 - weekday + config.teach_weekday) * config.day_time)),
          daily_act: config.teach_time,
          sign_time: util.formatDate(new Date(
            date.getTime() + (6 - weekday + config.teach_weekday) 
            * config.day_time)) + ' ' + teach_start,
          number: config.teach_num  
        });
      }
    }
    else{
      if(weekday == config.act_weekday){
        that.setData({
          daily_type: config.act_name,
          daily_date: util.formatDate(date),
          daily_act: config.act_time,
          sign_time: util.formatDate(new Date(
            date.getTime() - config.day_time)) + ' ' + act_start,
          number: config.act_num  
        });
      }
      else if(weekday < config.act_weekday){
        that.setData({
          daily_type: config.act_name,
          daily_date: util.formatDate(new Date(date.getTime() + (
            config.act_weekday - weekday) * config.day_time)),
          daily_act: config.act_time,
          sign_time: util.formatDate(new Date(date.getTime() + 
          (config.act_weekday - weekday - 1) * config.day_time)) 
          + ' ' + act_start,
          number: config.act_num  
        });
      }
      else{
        that.setData({
          daily_type: config.act_name,
          daily_date: util.formatDate(new Date(date.getTime() + (
            7 - weekday + config.act_weekday) * config.day_time)),
          daily_act: config.act_time,
          sign_time: util.formatDate(new Date(
            date.getTime() + (6 - weekday + config.act_weekday) 
            * config.day_time)) + ' ' + act_start,
          number: config.act_num  
        });
      }
    }
  },
  imageZoomWidthUtil(originalWidth,originalHeight,imageHeight){
    let imageSize = {};
    if(imageHeight){
        imageSize.imageWidth = (imageHeight *originalWidth) / originalHeight;
        imageSize.imageHeight = imageHeight;
    }else{
        wx.getSystemInfo({  
            success: function (res) {  
                imageHeight = res.windowHeight;
                imageSize.imageWidth = (imageHeight *originalWidth) / originalHeight;
                imageSize.imageHeight = imageHeight;
            }  
        });
    }
    return imageSize;
  },
  imageLoad: function (e) {
    //获取图片的原始宽度和高度
    let originalWidth = e.detail.width;
    let originalHeight = e.detail.height;
    let imageSize = this.imageZoomWidthUtil(originalWidth,originalHeight,145);
    this.setData({imageWidth:imageSize.imageWidth,imageHeight:imageSize.imageHeight});  
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
      var t_start = Number(config.teach_sign_time.split(":")[0]);
      var a_start = Number(config.act_sign_time.split(":")[0]);
      console.log(today);
      if (((that.data.type == 0) && ((today < (config.teach_weekday - 1) || today > config.teach_weekday)))
      || ((that.data.type == 1) && ((today < (config.act_weekday - 1) || today > (config.act_weekday))))
      || ((that.data.type == 0) && (today == config.teach_weekday - 1) && (hours < t_start)) || 
      ((that.data.type == 1) && (today == config.act_weekday - 1) && (hours < a_start))) {
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
          url: config.api_url + '?r=activity/add',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            stunum: that.data.stunum,
            type: that.data.type
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
    var dateTime = util.formatSDate(that.data.daily_date);
    console.log(dateTime);
    wx.navigateTo({
      url: '../detail/detail?date=' + dateTime + '&type='
      + that.data.type,
    })
  },
  pressCancel: function () {
    var that = this;
    var date = new Date();
    var day = date.getDay();
    var hour = date.getHours();
    var can_cancel = null;
    if(that.data.type == 0) can_cancel = parseInt(config.teach_time.split(':')[0]);
    else can_cancel = parseInt(config.act_time.split(':')[0]);
    if((day == config.teach_weekday || day == config.act_weekday) && (hour >= can_cancel)){
      wx.showModal({
        title: '提示',
        content: '请在当天' + can_cancel + '点之前退报名',
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
              url: config.api_url + '?r=activity/cancel',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                stunum: that.data.stunum,
                type: that.data.type
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
})