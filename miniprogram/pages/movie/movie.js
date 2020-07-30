// pages/movie/movie.js
Page({

  getMovieList: function () {
    wx.showLoading({
      title: '加载中',
    })
    // 调用云函数加载数据
    wx.cloud.callFunction({
      name: "movielist",
      data: {
        start: this.data.movielist.length,
        count: 10
      }
    }).then(res => {
      console.log(res);
      this.setData({
        movielist: this.data.movielist.concat(JSON.parse(res.result).subjects)
      });
      wx.hideLoading();
    }).catch(err => {
      console.error(err);
      wx.hideLoading();
    });
  },

  // 跳转到评价页面
  gotoComment: function(event) {
    console.log(event);
    console.log(`gotoComment: ${event.target.dataset.movieid}`);
    wx.navigateTo({
      url: `../comment/comment?movieid=${event.target.dataset.movieid}`,
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    movielist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 在页面加载的时候调用 getMovieList 函数
    this.getMovieList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMovieList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})