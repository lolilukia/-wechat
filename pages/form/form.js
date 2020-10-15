const app = getApp()
const config = require('../../utils/config.js');
Page({
  data: {
    actid: 0,
    realname: '',
    matename: '',
    stunum: '',
    matenum: '',
    college: '汽车学院',
    matecollege: '汽车学院',
    project: [
      { name: 0, value: '男' },
      { name: 1, value: '女' },
    ],
    mate_proj: [
      { name: 0, value: '男' },
      { name: 1, value: '女' },
    ],
    array: ['汽车学院', '铁道与城市轨道交通研究院', '经济与管理学院', '交通运输工程学院', '中德学院', '机械工程学院', '电子与信息工程学院', '软件学院', '材料科学与工程学院', '艺术与传媒学院', '中德工程学院'],
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
    mate_index: 0,
    gender: '',
    mategender: ''
  },
  onLoad: function(options) {
    var that = this;
    that.setData({
      actid: options.actid,
      stunum: options.stunum
    })
  },
  bindPickerChange: function (e) {
    var that = this;
    that.setData({
      index: e.detail.value,
      college: that.data.array[e.detail.value]
    })
  },
  bindMateChange: function (e) {
    var that = this;
    that.setData({
      mate_index: e.detail.value,
      matecollege: that.data.array[e.detail.value]
    })
  },
  radioChange: function (e) {
    var that = this;
    that.setData({
      gender: e.detail.value
    })
  },
  mateChange: function (e) {
    var that = this;
    that.setData({
      mategender: e.detail.value
    })
  },
  submitBind: function (e) {
    var that = this;
    if (that.data.realname == '' || that.data.gender == '') {
      wx.showToast({
        title: '请填写必填项',
        icon: 'loading',
        duration: 1000
      })
      return;
    }
    wx.request({
      url: config.api_url + '?r=special/sign',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        act_id: that.data.actid,
        stunum: that.data.stunum,
        name: that.data.realname,
        college: that.data.college,
        gender: that.data.gender,
        mate_num: that.data.matenum,
        mate_name: that.data.matename,
        mate_college: that.data.matecollege,
        mate_gender: that.data.mategender
      },
      success: function (result) {
        if(result.data.state.indexOf('success') != -1){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          });
          setTimeout(function () {
            wx.navigateBack({
            });
          }, 1000);
        }
      }
    })
  },
  inputName: function (e) {
    this.setData({
      realname: e.detail.value
    });
  },
  mateName: function (e) {
    this.setData({
      matename: e.detail.value
    });
  },
  mateNum: function (e) {
    this.setData({
      matenum: e.detail.value
    });
  },
})