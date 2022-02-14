<script>
  export default {
		globalData: {  
			localUserId: '',
		  hostPageData: {
				// 用户列表 元素为 {userId, isPublishAudio, isPublishVideo}
				users: [],
				// 当前的合流裁剪模式
				currentRenderMode: 0,
				// 当前的合流布局模式
				currentLayoutMode: 0,
				// 自定义合流布局列表 数组元素为 {id, x, y, width, height}
				customLayouts: [],
				// 合流视频设置参数
				liveMixVideoParams: null,
				liveMixTinyVideoParams: null,
			}
		}, 
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style>
  /*每个页面公共css */
  @import './common/uni.css';
</style>
