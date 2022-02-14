<template>
	<view>
		<view class="tinySetup networkStats" v-if="networkStatsIsShow">
			<view class="uni-inline-item" style="justify-content: space-around;">
				<text class="text">{{`网络类型: ${currentNetworkType}`}}</text>
				<text class="text">{{`ip: ${networkStats.ip}`}}</text>
			</view>
			<view class="uni-inline-item" style="margin-top: 20rpx;">
				<text class="text statsText">{{`上行↑: ${networkStats.sendBitrate}kbps`}}</text>
				<text class="text statsText">{{`下行↓: ${networkStats.receiveBitrate}kbps`}}</text>
				<text class="text statsText">{{`往返↩︎: ${networkStats.rtt}ms`}}</text>
			</view>
		</view>
		<view class="uni-inline-item tinySetup" v-if="audioStatsIsShow">
			<text class="text statsText">{{`音频: ${localAudioStats.bitrate}kbps`}}</text>
			<text class="text statsText">{{`丢包率: ${localAudioStats.packageLostRate}`}}</text>
			<text class="text statsText">{{`往返: ${localAudioStats.rtt ? localAudioStats.rtt : 0}ms`}}</text>
		</view>
		<view class="tinySetup" v-if="videoStatsViewIsShow">
			<view class="uni-inline-item" v-if="videoStatsIsShow">
				<text class="text statsText">{{`大流: ${localVideoStats.bitrate}kbps`}}</text>
				<text class="text statsText">{{`分辨率: ${localVideoStats.height}x${localVideoStats.width}`}}</text>
				<text class="text statsText">{{`FPS: ${localVideoStats.fps}`}}</text>
				<text class="text statsText">{{`丢包率: ${localVideoStats.packageLostRate}%`}}</text>
			</view>
			<view class="uni-inline-item" v-if="tinyVideoStatsIsShow">
				<text class="text statsText">{{`小流: ${localTinyVideoStats.bitrate}kbps`}}</text>
				<text
					class="text statsText">{{`分辨率: ${localTinyVideoStats.height}x${localTinyVideoStats.width}`}}</text>
				<text class="text statsText">{{`FPS: ${localTinyVideoStats.fps}`}}</text>
				<text class="text statsText">{{`丢包率: ${localTinyVideoStats.packageLostRate}%`}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		RCRTCLocalVideoStats,
		RCRTCLocalAudioStats,
		RCRTCNetworkStats
	} from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCDefines'
	import * as Constants from '../common/constants.js';
	export default {
		name: "statsView",
		props: {
			networkStats: {
				type: RCRTCNetworkStats
			},
			localAudioStats: {
				type: RCRTCLocalAudioStats
			},
			localVideoStats: {
				type: RCRTCLocalVideoStats
			},
			localTinyVideoStats: {
				type: RCRTCLocalVideoStats
			},
		},
		computed: {
			networkStatsIsShow: function() {
				return this.networkStats != null;
			},
			currentNetworkType: function() {
				return Constants.networkTypes[this.networkStats.type];
			},
			audioStatsIsShow: function() {
				return this.localAudioStats != null;
			},
			videoStatsViewIsShow: function() {
				return this.videoStatsIsShow || this.tinyVideoStatsIsShow;
			},
			videoStatsIsShow: function() {
				return this.localVideoStats != null;
			},
			tinyVideoStatsIsShow: function() {
				return this.localTinyVideoStats != null;
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.text {
		font-size: 27rpx;
	}

	.tinySetup {
		margin: 10rpx;
		border-width: 1rpx;
		border-color: #465CFF;
		justify-content: space-around;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.networkStats {
		padding: 20rpx;
	}

	.statsText {
		flex: 1;
		text-align: center;
	}
</style>
