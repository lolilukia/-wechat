const app = getApp()

Page({
  data: {
    actid: 0,
    realname: '',
    matename: '',
    stunum: '',
    matenum: '',
    college: '汽车学院',
    matecollege: '',
    phoneNum: '',
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
    mateitem: 0
  },
  onLoad: function(options) {
    var that = this;
    that.setData({
      actid: options.actid
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      college: this.data.array[e.detail.value]
    })
  },
  bindMateChange: function (e) {
    this.setData({
      mate_index: e.detail.value,
      mate_college: this.data.array[e.detail.value]
    })
  },
  submitBind: function (e) {
    if (this.data.realname == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'loading',
        duration: 1000
      })
      return;
    }
    else if (this.data.phoneNum == '') {
      wx.showToast({
        title: '手机不能为空',
        icon: 'loading',
        duration: 1000
      })
      return;
    }
    else {
      var myreg = /^(((13[0-9]{1})|(14[5|7])|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (this.data.phoneNum.length != 11 || !myreg.test(this.data.phoneNum)) {
        wx.showToast({
          title: '手机号填写有误',
          icon: 'loading',
          duration: 1000
        })
        return;
      }
    }
    var that = this;
    wx.request({
      url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=special/sign',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        act_id: that.data.actid,
        name: that.data.realname,
        college: that.data.college,
        phone: that.data.phoneNum,
        mate_name: that.data.matename,
        mate_college: that.data.matecollege
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
  inputPhone: function (e) {
    this.setData({
      phoneNum: e.detail.value
    });
  }
})