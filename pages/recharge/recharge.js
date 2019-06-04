Page({
  data: {
    rechargeText: '初次充值45元，之后30元/10次，点击图片长按保存，打开支付宝扫一扫选择相册图片，转账时请务必备注「学号」',
    btnText: '返回',
    alipay: 'https://www.jdyx.club/tjyx_backend/image/alipay_lj.jpg',
  },
  saveAli: function () {
    wx.previewImage({
      current: this.data.alipay, // 当前显示图片的http链接
      urls: [this.data.alipay] // 需要预览的图片http链接列表
    })
  },
  jumpBack: function () {
    wx.navigateBack({ 
    });
  },
})