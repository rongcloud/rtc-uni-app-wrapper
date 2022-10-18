<template>
	<view>
		<view style="margin-left: 10rpx;margin-top: 30rpx;">
			<label @click="enableSeiClick" class="radio">
				<text class="setText">SEI功能开关</text>
				<radio :checked="enableSei" :disabled="true" />
			</label>
		</view>
		
		
		<view class="uni-form-item uni-row" style="align-items: center;">
			<text style="margin-left: 10px; font-size: 14px;">发送的内容</text>
			<view class = "inputStyle">
				<input class="uni-input" type="text" placeholder="" @input="onSeiContentInput()" v-model="seiContent"/>
			</view>
		</view>
		
		<view class="uni-form-item uni-row" style="align-items: center;">
			<text style="margin-left: 10px; font-size: 14px;">发送的次数</text>
			<view class = "inputStyle">
				<input class="uni-input" type="number" placeholder="每两秒发送一次" @input="onSeiTimesInput()" v-model="seiTimes"/>
			</view>
		</view>
		
		<button class="btn" type="primary" @click="sending ? stopSendSei() : sendSei()">
		{{ sending ? "取消发送" : "开始发送" }}
		</button>
		
		<view class="titleText">
			<text>其他主播发送的 SEI 内容</text>
		</view>
		
		<scroll-view scroll-y style="flex: 1; height: 700rpx;padding: 20rpx;">
			<view class="uni-list-cell" v-for="message in messages">
				<text class="text">{{displayMessage(message)}}</text>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rtcEngine: null,
				enableSei: false,
				seiContent: null,
				seiTimes: null,
				sending: false,
				intervalID: null,
				// 页面显示的sei信息
				messages: [],
			}
		},
		onLoad() {
			this.rtcEngine = getApp().globalData.rtcEngine
			this.rtcEngine.setOnSeiEnabledListener((res) => {
				console.log('setOnSeiEnabledListener', res)
				if (res.code == 0){
					this.enableSei = !this.enableSei
				}else{
					uni.showToast({
						title: 'code:' + res.code,
						icon: 'error'
					})
				}
			});
			this.rtcEngine.setOnSeiReceivedListener((res) => {
				console.log('setOnSeiReceivedListener', res)
				this.messages.push(res.sei);
			});
			this.rtcEngine.setOnLiveMixSeiReceivedListener((res) => {
				console.log('setOnLiveMixSeiReceivedListener', res)
			});
		},
		onBackPress() {
			clearInterval(this.intervalID)
		},
		methods: {
			onSeiContentInput(e){
				this.seiContent = e.detail.value
			},
			onSeiTimesInput(){
				this.seiTimes = e.detail.value
			},
			enableSeiClick(){
				let code = this.rtcEngine.enableSei(!this.enableSei)
				if (code != 0) {
					uni.showToast({
						title: 'code:' + code,
						icon: 'error'
					})
				}
			},
			sendSei(){
				let times = 0;
				// if(!this.enableSei){
				// 	uni.showToast({
				// 		title: '请开启sei',
				// 		icon: 'error'
				// 	})
				// 	return
				// }
				this.intervalID = setInterval(() => {
					this.sending = true
					times++
				    let code = this.rtcEngine.sendSei(this.seiContent)
					console.log('sendSei-code---',code)
					if (times == this.seiTimes){
						clearInterval(this.intervalID)
						this.sending = false
					}
				}, 2000);
				
			},
			stopSendSei(){
				clearInterval(this.intervalID)
				this.sending = false
			},
			displayMessage(message) {
				return '收到sei信息:' + message;
			}
		}
	}
</script>

<style>
	
	.inputStyle {
		flex: 1; 
		border:1rpx solid #888888; 
		margin: 10px;
		margin-top: 10px;
	}
	
	.btn {
		margin-top: 40rpx;
		margin-left: 80rpx;
		margin-right: 80rpx;
	}
	
	.radio {
		flex-direction: row;
		align-items: center;
	}
	
	.setText {
		font-size: 16px;
		color: #666;
		padding: 10px;
	}
	
	.text {
		word-wrap: break-word;
		word-break: break-word;
	}
	
	.titleText{
		font-size: 20px;
		color: #000000;
		padding: 10px;
		margin-top: 20rpx;
		text-align: center;
	}
	
</style>
