//index.js  
const util = require('../../utils/util.js') 
var app = getApp()
Page({
  data: {
    daily_date: '',
    daily_type: '',
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
    if(weekday == 2 || weekday == 4){
      that.setData({
        daily_date: util.formatDate(date)
      });
      if(weekday == 2){
        that.setData({
          daily_type: '教学场'
        });
      }
      else{
        that.setData({
          daily_type: '自由活动场'
        });
      }
    }
    else if(weekday == 1 || weekday == 3){
      that.setData({
        daily_date: util.formatDate(new Date(date.getTime() + 24 * 60 * 60 * 1000))
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
    else if(weekday == 0){
      that.setData({
        daily_date: util.formatDate(new Date(date.getTime() + 48 * 60 * 60 * 1000)),
        daily_type: '教学场'
      });
    }
    else if(weekday == 5){
      that.setData({
        daily_date: util.formatDate(new Date(date.getTime() + 96 * 60 * 60 * 1000)),
        daily_type: '教学场'
      });
    }
    else if(weekday == 6){
      that.setData({
        daily_date: util.formatDate(new Date(date.getTime() + 72 * 60 * 60 * 1000)),
        daily_type: '教学场'
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
    wx.getStorage({
      key: 'stuNum',
      success: function (res) {
        that.setData({
          stunum: res.data
        });
      }
    });
    wx.request({
      url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=feature/find',
      method: 'GET',
      success: function (result) {
        if (result.data.state.indexOf('success') != -1) {
          console.log(result.data);
          that.setData({
            acts: result.data.activity
          });
        }
        else {
          console.log(result.data);
        }
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
  getDaily: function (){
    var that = this;
    wx.navigateTo({
      url: '../daily/daily?stunum=' + that.data.stunum,
    });
  },
  getFeature: function (e){
    wx.navigateTo({
      url: '../feature/feature?act_id=' + e.currentTarget.dataset.id,
    });
  }
}) 