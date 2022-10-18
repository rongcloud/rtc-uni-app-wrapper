<template>
	<view>


		<view class="uni-title" style="margin-left: 20px;margin-top: 30px;">x轴</view>
		<view style="margin: 10px;">
			<slider value="0.3" @change="pointXChange" min="0.0" max="1.0" step="0.1" block-size="20" show-value />
		</view>
		
		<view class="uni-title" style="margin-left: 20px;margin-top: 30px;">y轴</view>
		<view style="margin: 10px;">
			<slider value="0.3" @change="pointYChange" min="0.0" max="1.0" step="0.1" block-size="20" show-value />
		</view>
		
		<view class="uni-title" style="margin-left: 20px;margin-top: 30px">缩放系数</view>
		<view style="margin: 10px;;margin-bottom: 60px">
			<slider value="0.3" @change="pointZChange" min="0.0" max="1.0" step="0.1" block-size="20" show-value />
		</view>
		
		<button class="btn" type="primary" @click="setWatermark" >设置水印</button>
		<button class="btn" type="primary" @click="removeWatermark">删除水印</button>

	</view>
</template>

<script>
	import RCRTCEngine from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCEngine'

	export default {
		data() {
			return {
				rtcEngine: null,
				pointX: 0.3,
				pointY: 0.3,
				zoom: 0.3,
			}
		},
		onLoad() {
			this.rtcEngine = getApp().globalData.rtcEngine
			this.rtcEngine.setOnWatermarkSetListener((res) => {
				uni.hideLoading();
				if (res.code != 0){
					uni.showToast({
						title:"error:" + res.code,
						icon:'error'
					})
				}else{
					uni.showToast({
						title:"设置成功",
						icon:'success'
					})
				}
			});
			this.rtcEngine.setOnWatermarkRemovedListener((res) => {
				console.log('setOnWatermarkRemovedListener-res', res)
				uni.hideLoading();
				if (res.code != 0){
					uni.showToast({
						title:"error:" + res.code,
						icon:'error'
					})
				}else{
					uni.showToast({
						title:"删除成功",
						icon:'success'
					})
				}
			});
		},
		methods: {
			setWatermark() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					success: async (res) => {
						if (res.tempFilePaths.length < 0) return
						console.log('chooseImage-res', res)
						const filePath = 'file:///' + plus.io.convertLocalFileSystemURL(res.tempFilePaths[0])
						console.log('this.pointX', this.pointX,this.pointY,this.zoom)
						let code = this.rtcEngine.setWatermark(filePath, this.pointX, this.pointY, this.zoom)
						if (code != 0){
							uni.showToast({
								title:"error:" + code,
								icon:'error'
							})
							return
						}
						uni.showLoading({
							title: '加载中...'
						})
					},
					fail: (res) => {
						console.log('chooseImage-fail', res)
					}
				})
			},
			removeWatermark() {
				let code = this.rtcEngine.removeWatermark()
				console.log('removeWatermark-code', code)
				if (code != 0){
					uni.showToast({
						title:"error:" + code,
						icon:'error'
					})
					return
				}
				uni.showLoading({
					title: '加载中...'
				})
			},
			pointXChange(e) {
				this.pointX = e.detail.value
			},
			pointYChange(e) {
				this.pointY = e.detail.value
			},
			pointZChange(e) {
				this.zoom = e.detail.value
			}
		}
	}
</script>

<style>
	
	.btn {
		margin-top: 40rpx;
		margin-left: 80rpx;
		margin-right: 80rpx;
	}
	
</style>
