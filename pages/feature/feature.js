const util = require('../../utils/util.js');
const config = require('../../utils/config.js');
Page({
  data: {
    stunum: '',
    feature_date: '',
    sign_time: '',
    name: '',
    finish: '',
    detail: '',
    url: '',
    location: config.location,
    actid: 0,
    number: 0,
    sign: -1
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      actid: options.act_id,
      stunum: options.stunum
    });
    wx.request({
      url: config.api_url + '?r=feature/detail&id=' + options.act_id + '&stunum=' + options.stunum,
      method: 'GET',
      success: function (result) {
        if (result.data.state.indexOf('success') != -1) {
          //console.log(result.data);
          that.setData({
            name: result.data.name,
            feature_date: result.data.act_time,
            detail: result.data.detail,
            url: result.data.url,
            sign_time: result.data.sign_time,
            sign: result.data.sign
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
  copy: function (e) {
    var that = this;
    console.log(e);
    wx.setClipboardData({
      data: that.data.url,
      success: function (res) {
        wx.showToast({
          title: '链接复制成功',
        });
      }
    });
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
    if(that.data.finish == '已结束')
    {
      wx.showToast({
        title: '活动已结束',
        icon: 'loading',
        duration: 1000
      })
      return;
    }
    else if(that.data.sign == 1){
      wx.showModal({
        title: '提示',
        content: '该活动已报名',
        success: function (res) {
          console.log('has signed');
        }
      });
    }
    else{
      let now = Date.parse(new Date());
      let act_time = Date.parse(that.data.feature_date);
      let sign_time = Date.parse(that.data.sign_time);
      if(now < act_time && now > sign_time){
        wx.navigateTo({
          url: '../form/form?actid=' + that.data.actid
          + '&stunum=' + that.data.stunum,
        })
      }
      else{
        wx.showModal({
          title: '提示',
          content: '活动尚未开始报名',
          success: function (res) {
            console.log('time error');
          }
        });
      }
    }
  },
  pressInfo: function(){
    var that = this;
    wx.navigateTo({
      url: '../special/special?actid=' + that.data.actid,
    });
  }
})