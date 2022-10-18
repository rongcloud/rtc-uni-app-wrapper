<template>
	<view>

		<button class="btn" type="primary"
			@click="opened ? stopNetworkProbe() : startNetworkProbe()">{{ opened ? "主动结束" : "开启探测" }}</button>

		<view class="bgView" v-if="opened">
			<view class="uni-inline-item" style="margin-top: 20rpx;">
				<text class="textHead">{{`上行:`}}</text>
				<text class="text statsText">{{`质量: ${upNetworkProbeStats.qualityLevel}`}}</text>
				<text class="text statsText">{{`往返: ${upNetworkProbeStats.rtt}ms`}}</text>
				<text class="text statsText">{{`丢包率: ${upNetworkProbeStats.packetLostRate}`}}</text>
			</view>
			<view class="uni-inline-item" style="margin-top: 20rpx;">
				<text class="textHead">{{`下行:`}}</text>
				<text class="text statsText">{{`质量: ${downNetworkProbeStats.qualityLevel}`}}</text>
				<text class="text statsText">{{`往返: ${downNetworkProbeStats.rtt}ms`}}</text>
				<text class="text statsText">{{`丢包率: ${downNetworkProbeStats.packetLostRate}`}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import RCRTCEngine from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCEngine'
	import {
		RCRTCNetworkProbeStats
	} from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCDefines'

	export default {
		data() {
			return {
				rtcEngine: null,
				opened: false,
				// upNetworkProbeStats: {
				// 	type: RCRTCNetworkProbeStats,
				// },

				upNetworkProbeStats: {
					"qualityLevel": 0,
					"packetLostRate": 0.0,
					"rtt": 0
				},
				downNetworkProbeStats: {
					"qualityLevel": 0,
					"packetLostRate": 0.0,
					"rtt": 0
				}
			}
		},
		onBackPress() {
			if (this.opened){
				this.stopNetworkProbe()
			}
			this.rtcEngine.destroy();
		},
		methods: {
			startNetworkProbe() {
				// 初始化引擎
				let setup = {
					reconnectable: false,
					statsReportInterval: 1000
				}
				this.rtcEngine = RCRTCEngine.create(setup);

				this.rtcEngine.setOnNetworkProbeStartedListener((res) => {
					console.log('onNetworkProbeStarted---', res)
					this.opened = true
				});
				this.rtcEngine.setOnNetworkProbeStoppedListener((res) => {
					console.log('onNetworkProbeStopped---', res)
					this.opened = false
				});
				this.rtcEngine.setOnNetworkProbeUpLinkStatsListener((res) => {
					console.log('onNetworkProbeUpLinkStats---', res)
					this.upNetworkProbeStats = res
				});
				this.rtcEngine.setOnNetworkProbeDownLinkStatsListener((res) => {
					console.log('onNetworkProbeDownLinkStats---', res)
					this.downNetworkProbeStats = res
				});
				this.rtcEngine.setOnNetworkProbeFinishedListener((res) => {
					console.log('onNetworkProbeFinished---', res)
					this.opened = false
				});
				let code = this.rtcEngine.startNetworkProbe()
				if (code != 0) {
					uni.showToast({
						title: 'code:' + code,
						icon: 'error'
					});
				}
			},
			stopNetworkProbe() {
				let code = this.rtcEngine.stopNetworkProbe()
				if (code != 0) {
					uni.showToast({
						title: 'code:' + code,
						icon: 'error'
					});
				}
			},
		}
	}
</script>

<style>
	.btn {
		margin-top: 40rpx;
		margin-left: 80rpx;
		margin-right: 80rpx;
	}

	.textHead {
		font-size: 34rpx;
		color: #465CFF;
		margin-left: 10rpx;
		font-weight: 500;
	}

	.bgView {
		border-style: solid;
		border-width: 1rpx;
		border-color: #465CFF;
		justify-content: space-around;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 60rpx;
	}

	.statsText {
		flex: 1;
		text-align: center;
		font-size: 30rpx;
	}
	
</style>
