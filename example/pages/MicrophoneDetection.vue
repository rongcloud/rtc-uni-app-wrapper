<template>
	<view>
		<view class="uni-form-item uni-row" style="align-items: center;">
			<text style="margin-left: 20px; font-size: 20px;">时间</text>
			<view class = "inputStyle">
				<input class="uni-input" type="number" placeholder="请输入时间范围2～10(单位秒)" @input="onTimeIntervalInput()" v-model="timeInterval"/>
			</view>
		</view>
		
		<button class="btn" type="primary" @click="opened ? stopEchoTest() : startEchoTest()">
		{{ opened ? "结束检测" : "开始探测" }}
		</button>
		
	</view>
</template>

<script>
	import RCRTCEngine from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCEngine'
	import permision from "@/js_sdk/wa-permission/permission.js"
	const Platform = uni.getSystemInfoSync().platform;
	
	export default {
		data() {
			return {
				rtcEngine: null,
				opened: false,
				timeInterval: null,
				timeoutID: null,
				timeoutID2: null,
			}
		},
		onBackPress() {
			console.log('onBackPress---')
			this.rtcEngine.destroy()
			this.stopEchoTest()
			uni.hideLoading()
			clearTimeout(this.timeoutID)
			clearTimeout(this.timeoutID2)
		},
		methods: {
			onTimeIntervalInput(e) {
				this.timeInterval = e.detail.value;
			},
			async startEchoTest(){
				if(null == this.timeInterval){
					uni.showToast({
						title: '请输入时间',
						icon: 'error'
					});
					return
				}
				if (Platform === 'android') {
					console.log('requestAndroidPermission---',res)
					let res = await this.requestAndroidPermission('android.permission.RECORD_AUDIO');
					console.log('requestAndroidPermission---',res)
					if (res != 1) {
						return;
					}
				}
				this.opened = true
				// RCRTCEngine.destory();
				// 初始化引擎
				let setup = {
					reconnectable: false,
					statsReportInterval: 1000
				}
				this.rtcEngine = RCRTCEngine.create(setup);
				console.log('startEchoTest-timeInterval---',this.timeInterval)
				let code = this.rtcEngine.startEchoTest(this.timeInterval);
				console.log('startEchoTest-code---',code)
				if (code == 0) {
					uni.showLoading({
						title: '录音中请说话...',
						mask:true
					});
					
					this.timeoutID = setTimeout(function () {
						uni.showLoading({
							title: '播放中...',
							mask:true
						});
					}, this.timeInterval * 1000);
					
					this.timeoutID2 = setTimeout(function () {
						uni.hideLoading();
					}, this.timeInterval * 2000);
					
				}else{
					uni.showToast({
						title: 'code:' + code,
						icon: 'error'
					});
				}
			},
			stopEchoTest(){
				this.opened = false
				let code = this.rtcEngine.stopEchoTest();
				console.log('stopEchoTest-code---',code)
				if (code != 0) {
					uni.showToast({
						title: 'code:' + code,
						icon: 'error'
					});
				}

			},
			// 判断权限
			async requestAndroidPermission(permisionID) {
				console.log('requestAndroidPermission-permisionID---',permisionID)
				let result = await permision.requestAndroidPermission(permisionID)
				let strStatus
				if (result === 1) {
					strStatus = "已获得授权"
					return result;
				}
				if (result === 0) {
					strStatus = "未获得授权"
				} else {
					strStatus = "被永久拒绝权限"
				}
				uni.showModal({
					content: permisionID + strStatus,
					showCancel: false
				});
				return result;
			},
		}
	}
</script>

<style>
	
	.inputStyle {
		flex: 1; 
		border:1rpx solid #888888; 
		margin: 20px;
		margin-top: 20px;
	}
	
	.btn {
		margin-top: 40rpx;
		margin-left: 80rpx;
		margin-right: 80rpx;
	}

</style>
