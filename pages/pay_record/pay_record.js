Page({
  data: {
    stunum: '',
    count: 0,
    records: [],
    pay_info: ''
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      stunum: options.stunum
    });
    wx.request({
      url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=recharge/find&stunum=' + that.data.stunum,
      method: 'GET',
      success: function (result) {
        that.setData({
          count: result.data.count,
        });
        if (that.data.count != 0) {
          that.setData({
            records: result.data.records,
            pay_info: '共充值' + that.data.count + '次'
          });
        }
        else{
          that.setData({
            pay_info: '本学期尚无充值记录'
          });
        }
      }
    });
  }
})