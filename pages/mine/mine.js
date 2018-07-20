const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    mine_info: '个人资料',
    rest_text: '',
    stunum: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this;
    wx.getStorage({
      key: 'stuNum',
      success: function (res) {
        that.setData({
          stunum: res.data
        })
        wx.request({
          url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=info/time&stunum=' + that.data.stunum,
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
          title: '信息获取失败',
          content: '请先填写个人资料',
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
            url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=info/time&stunum=' + that.data.stunum,
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
            title: '信息获取失败',
            content: '请先填写个人资料',
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
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
        title: '信息获取失败',
        content: '请先填写个人资料',
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
        title: '信息获取失败',
        content: '请先填写个人资料',
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
    wx.navigateTo({
      url: '../recharge/recharge',
    });
  },
  survey: function (e) {
    var that = this;
    if (that.data.stunum == '') {
      wx.showModal({
        title: '信息获取失败',
        content: '请先填写个人资料',
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
      wx.request({
        url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=survey/investigate&stunum=' + that.data.stunum,
        method: 'GET',
        success: function (result) {
          if (result.data.survey == 0) {
            wx.navigateTo({
              url: '../survey/survey?stunum=' + that.data.stunum,
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '你已填写过调查问卷',
              success: function (res) {
                if (res.confirm) {
                  console.log('confirm')
                } else if (res.cancel) {
                  console.log('cancel')
                }
              }
            })
          }
        }
      })
    }  
  }
})
