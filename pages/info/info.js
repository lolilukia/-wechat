const config = require('../../utils/config.js');
Page({
  data: {
    realname: '',
    stunum: '',
    college: '汽车学院',
    // phoneNum: '',
    willing: '0',
    role: '',
    hiddenModal: true,
    array: ['汽车学院', '铁道与城市轨道交通研究院', '经济与管理学院', '交通运输工程学院', '中德学院', '机械与能源工程学院', '电子与信息工程学院', '软件学院', '材料科学与工程学院', '艺术与传媒学院', '中德工程学院'],
    objectArray: [
      {
        id: 0,
        name: '汽车学院'
      },
      {
        id: 1,
        name: '铁道与城市轨道交通研究院'
      },
      {
        id: 2,
        name: '经济与管理学院'
      },
      {
        id: 3,
        name: '交通运输工程学院'
      },
      {
        id: 4,
        name: '中德学院'
      },
      {
        id: 5,
        name: '机械工程学院'
      },
      {
        id: 6,
        name: '电子与信息工程学院'
      },
      {
        id: 7,
        name: '软件学院'
      },
      {
        id: 8,
        name: '材料科学与工程学院'
      },
      {
        id: 9,
        name: '艺术与传媒学院'
      },
      {
        id: 10,
        name: '中德工程学院'
      }
    ],
    index: 0,
    elements: ['否', '是'],
    objectElements: [
      {
        id: 0,
        name: '否'
      },
      {
        id: 1,
        name: '是'
      }
    ],
    item: 0,
  },
  onLoad: function(options) {
    var that = this;
    that.setData({
      stunum: options.stunum
    })
    if(that.data.stunum != '')
    {
      wx.request({
        url: config.api_url + '?r=bind/query&stunum=' + that.data.stunum,
        method: 'GET',
        success: function (result) {
          if (result.data.state.indexOf('success') != -1) {
            that.setData({
              realname: result.data.name,
              stunum: that.data.stunum,
              index: that.data.array.indexOf(result.data.college),
              phoneNum: result.data.phone,
              item: result.data.willing,
              role: result.data.coach == 0? '会员':'教练'
            });
          }
        }
      });
    }
  },
  inputName: function (e) {
    this.setData({
      realname: e.detail.value
    });
  },
  inputNumber: function (e) {
    this.setData({
      stunum: e.detail.value
    });
  },
  // inputPhone: function (e) {
  //   this.setData({
  //     phoneNum: e.detail.value
  //   });
  // },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      college: this.data.array[e.detail.value]
    })
  },
  pickerChange: function (e) {
    this.setData({
      item: e.detail.value,
      willing: e.detail.value
    })
  },
  listenerButton: function () {
    this.setData({
      hiddenModal: !this.data.hiddenModal
    })
  },
  listenerCancel: function () {
    this.setData({
      hiddenModal: true
    })
  },
  jumpCancel: function () {
    wx.navigateBack({
      
    });
  },
  submit: function (e) {
    if (this.data.realname == '' || this.data.stunum == '') {
      wx.showToast({
        title: '信息不能为空',
        icon: 'loading',
        duration: 1000
      })
      return;
    }
    // else {
    //   var myreg = /^(((13[0-9]{1})|(14[5|7])|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    //   if (this.data.phoneNum.length != 11 || !myreg.test(this.data.phoneNum)) {
    //     wx.showToast({
    //       title: '手机号填写有误',
    //       icon: 'loading',
    //       duration: 1000
    //     })
    //     return;
    //   }
    // }
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: config.api_url + '?r=bind/update',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              realname: that.data.realname,
              stunum: that.data.stunum,
              college: that.data.college,
              phoneNum: '',
              willing: that.data.willing
            },
            success: function (result) {
              that.setData({
                returnCode: result.data.state
              });
              console.log(that.data.returnCode)
              //已经填过
              if (that.data.returnCode.indexOf('update_success') != -1) {
                wx.setStorage({
                  key: 'stuNum',
                  data: that.data.stunum
                })
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 500
                });
                wx.navigateBack({ 
                });
              }
              else if (that.data.returnCode.indexOf('add_success') != -1) {
                wx.setStorage({
                  key: 'stuNum',
                  data: that.data.stunum
                });
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 1500
                });
                setTimeout(function (){
                  wx.navigateBack({
                  });
                }, 1000);
              }
              else {
                console.log(that.data.returnCode);
              }
            }
          })
        }
      }
    });
  },
})