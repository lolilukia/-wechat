const app = getApp()
const config = require('../../utils/config.js');
Page({
  data: {
    mine_info: '个人资料',
    rest_text: '',
    stunum: '',
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'stuNum',
      success: function (res) {
        that.setData({
          stunum: res.data
        })
        wx.request({
          url: config.api_url + '?r=info/time&stunum=' + that.data.stunum,
          method: 'GET',
          success: function (result) {
            if (result.data.state.indexOf('success') != -1) {
              that.setData({
                rest_text: result.data.rest_time,
              });
            }
            else {
              console.log(result.data.state);
            }
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '以学号识别用户，请先填写个人资料',
          success: function (res) {
            if (res.confirm) {
              console.log('confirm')
            } else if (res.cancel) {
              console.log('cancel')
            }
          }
        })
      }
    })
  },
  onShow: function() {
    var that = this;
    if(that.data.stunum == ''){
      wx.getStorage({
        key: 'stuNum',
        success: function (res) {
          that.setData({
            stunum: res.data
          })
          wx.request({
            url: config.api_url + '?r=info/time&stunum=' + that.data.stunum,
            method: 'GET',
            success: function (result) {
              if (result.data.state.indexOf('success') != -1) {
                that.setData({
                  rest_text: result.data.rest_time,
                });
              }
              else {
                console.log(result.data.state);
              }
            }
          })
        },
        fail: function (res) {
          wx.showModal({
            title: '提示',
            content: '以学号识别用户，请先填写个人资料',
            success: function (res) {
              if (res.confirm) {
                console.log('confirm')
              } else if (res.cancel) {
                console.log('cancel')
              }
            }
          })
        }
      });
    }
    else{
      wx.request({
        url: config.api_url + '?r=info/time&stunum=' + that.data.stunum,
        method: 'GET',
        success: function (result) {
          if (result.data.state.indexOf('success') != -1) {
            that.setData({
              rest_text: result.data.rest_time,
            });
          }
          else {
            console.log(result.data.state);
          }
        }
      })
    }
  },
  modifyInfo: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../info/info?stunum=' + that.data.stunum,
    });
  },
  searchRecord: function(e) {
    var that = this;
    if(that.data.stunum == '')
    {
      wx.showModal({
        title: '提示',
        content: '以学号识别用户，请先填写个人资料',
        success: function (res) {
          if (res.confirm) {
            console.log('confirm')
          } else if (res.cancel) {
            console.log('cancel')
          }
        }
      });
    }
    else
    {
      wx.navigateTo({
        url: '../act_record/act_record?stunum=' + that.data.stunum,
      });
    }
  },
  searchRecharge: function (e) {
    var that = this;
    if (that.data.stunum == '') {
      wx.showModal({
        title: '提示',
        content: '以学号识别用户，请先填写个人资料',
        success: function (res) {
          if (res.confirm) {
            console.log('confirm')
          } else if (res.cancel) {
            console.log('cancel')
          }
        }
      });
    }
    else {
      wx.navigateTo({
        url: '../pay_record/pay_record?stunum=' + that.data.stunum,
      });
    }
  },
  recharge: function (e) {
    wx.showModal({
      title: '提示',
      content: '请前往公众号「捍卫嘉园」获取充值码',
      success: function (res) {
        if (res.confirm) {
          console.log('confirm')
        } else if (res.cancel) {
          console.log('cancel')
        }
      }
    });
  },
  survey: function (e) {
    var that = this;
    if (that.data.stunum == '') {
      wx.showModal({
        title: '提示',
        content: '以学号识别用户，请先填写个人资料',
        success: function (res) {
          if (res.confirm) {
            console.log('confirm')
          } else if (res.cancel) {
            console.log('cancel')
          }
        }
      });
    }
    else {
      wx.navigateTo({
        url: '../survey/survey?stunum=' + that.data.stunum,
      })
    }  
  },
  about: function(e){
    wx.navigateTo({
      url: '../about/about',
    })
  }
})
