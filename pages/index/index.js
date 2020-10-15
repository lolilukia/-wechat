//index.js  
const util = require('../../utils/util.js');
const config = require('../../utils/config.js'); 
var app = getApp()
Page({
  data: {
    teach_type: config.teach_name,
    act_type: config.act_name,
    teach_date: '',
    act_date: '',
    teach_sign_date: '',
    act_sign_date: '',
    teach_state: config.no_sign,
    act_state: config.no_sign,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    stunum: '',
    acts: [],
    imgUrl: ['../../images/fun.png', '../../images/challenge.jpeg']
  },
  onLoad: function () {
    var that = this;
    var date = new Date(new Date(new Date().toLocaleDateString()).getTime());
    var weekday = date.getDay();
    var teach_start = config.teach_sign_time.slice(0, 5);
    var act_start = config.act_sign_time.slice(0, 5);
    if(weekday == config.teach_weekday){
      that.setData({
        teach_date: util.formatDate(date)
        + ' ' + config.teach_time,
        teach_sign_date: util.formatDate(new Date(
          date.getTime() - config.day_time)) + ' ' + teach_start
      });
    }
    else if(weekday < config.teach_weekday){
      that.setData({
        teach_date: util.formatDate(new Date(date.getTime() + (
          config.teach_weekday - weekday) * config.day_time))
          + ' ' + config.teach_time,
        teach_sign_date: util.formatDate(new Date(
          date.getTime() + (config.teach_weekday - weekday - 1) 
          * config.day_time)) + ' ' + teach_start
      });
    }
    else{
      that.setData({
        teach_date: util.formatDate(new Date(date.getTime() + (
          7 - weekday + config.teach_weekday) * config.day_time))
          + ' ' + config.teach_time,
        teach_sign_date: util.formatDate(new Date(
          date.getTime() + (6 - weekday + config.teach_weekday) 
          * config.day_time)) + ' ' + teach_start
      });
    }
    if(weekday == config.act_weekday){
      that.setData({
        act_date: util.formatDate(date)
        + ' ' + config.act_time,
        act_sign_date: util.formatDate(new Date(
          date.getTime() - config.day_time)) + ' ' + act_start
      });
    }
    else if(weekday < config.act_weekday){
      that.setData({
        act_date: util.formatDate(new Date(date.getTime() + (
          config.act_weekday - weekday) * config.day_time))
          + ' ' + config.act_time,
        act_sign_date: util.formatDate(new Date(date.getTime() + 
        (config.act_weekday - weekday - 1) * config.day_time)) 
        + ' ' + act_start  
      });
    }
    else{
      that.setData({
        act_date: util.formatDate(new Date(date.getTime() + (
          7 - weekday + config.act_weekday) * config.day_time))
          + ' ' + config.act_time,
        act_sign_date: util.formatDate(new Date(
          date.getTime() + (6 - weekday + config.act_weekday) 
          * config.day_time)) + ' ' + act_start
      });
    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'stuNum',
      success: function (res) {
        that.setData({
          stunum: res.data
        });
        wx.request({
          url: config.api_url + '?r=feature/find&stunum=' + that.data.stunum,
          method: 'GET',
          success: function (result) {
            if (result.data.state.indexOf('success') != -1) {
              //console.log(result.data);
              that.setData({
                acts: result.data.activity
              });
            }
          }
        });
        wx.request({
          url: config.api_url + '?r=activity/order&stunum=' 
          + that.data.stunum + '&type=0',
          method: 'GET',
          success: function (result) {
            //console.log(result.data);
            if (result.data.state.indexOf('success') != -1) {
              if (result.data.is_sign == 'false') {
                that.setData({
                  teach_state: config.no_sign
                });
              }
              else {
                that.setData({
                  teach_state: config.signed
                });
              }
            }
          }
        });
        wx.request({
          url: config.api_url + '?r=activity/order&stunum=' 
          + that.data.stunum + '&type=1',
          method: 'GET',
          success: function (result) {
            //console.log(result.data);
            if (result.data.state.indexOf('success') != -1) {
              if (result.data.is_sign == 'false') {
                that.setData({
                  act_state: config.no_sign
                });
              }
              else {
                that.setData({
                  act_state: config.signed
                });
              }
            }
          }
        });
      }
    });
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ 
      currentTab: e.detail.current
    });
  },
  swichNav: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } 
    else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      if(that.data.currentTab == 1){
        that.setData({
          winHeight: that.data.winHeight*1.1
        });
      }
    }
  },
  getDaily: function (index){
    var that = this;
    var dataset = index.currentTarget.dataset;
    var id = dataset.id;
    wx.getStorage({
      key: 'stuNum',
      success: function (res) {
        that.setData({
          stunum: res.data
        });
        wx.navigateTo({
          url: '../daily/daily?stunum=' + that.data.stunum
          + '&type=' + id,
        });
      }
    });
  },
  getFeature: function (e){
    var that = this;
    if (that.data.acts[e.currentTarget.dataset.id - 1].detail == null) {
      wx.showToast({
        title: '报名尚未开始',
        icon: 'loading',
        duration: 1000
      })
    }
    else {
      wx.navigateTo({
        url: '../feature/feature?act_id=' + e.currentTarget.dataset.id.trim() + '&stunum=' + that.data.stunum,
      });
    }
  }
}) 