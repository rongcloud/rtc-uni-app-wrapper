<template>
	<view>
		<view class="cdn-info-list">
			<view class="cdn-info-item" v-for="(info, index) in selectedCDNInfos">
				<text class="cdn-info-text">{{info}}</text>
				<view class="cdn-info-buttons-view">
					<button @click="copyClick(index)">复制</button>
					<button @click="deleteClick(index)">删除</button>
				</view>
			</view>
		</view>
		<view class="buttons">
			<button @click="loadCDNClick"><text>加载CDN</text></button>
			<button><text>取消</text></button>
		</view>
		<uni-popup ref="cdnsPopup">
			<view class="popup-content">
				<text class="popup-title">请选择CDN</text>
				<view class="popup-inline-item" v-for="cdn in cdns" :key="cdn.id">
					<button @click="cdnItemClick(cdn)">
						<text class="text">{{cdn.name}}</text>
					</button>
				</view>
				<button @click="closePopupClick">
					<text>关闭</text>
				</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import * as Config from '@/common/config.js';
	import {
		get
	} from '@/common/util.js';
	export default {
		data() {
			return {
				rtcEngine: null,
				cdns: [],
				selectedCDNInfos: [],
			}
		},
		onLoad() {
			this.rtcEngine = getApp().globalData.rtcEngine
		},
		methods: {
			loadCDNClick() {
				this.loadCDNs();
			},
			cdnItemClick(cdn) {
				let { id, name } = cdn;
				this.loadCDN(id, name);
				this.closePopupClick();
			},
			closePopupClick() {
				this.$refs.cdnsPopup.close();
			},
			copyClick(index) {
				uni.setClipboardData({
					data: this.selectedCDNInfos[index],
					success: function() {
						uni.showToast({
							icon: 'none',
							title: '复制成功',
						});
					}
				});
			},
			deleteClick(index) {
				this.selectedCDNInfos.splice(index, 1);
			},
			showCDNInfo(info, name) {
				let { rtmp, hls, flv } = info;
				let str = `${name}\nRTMP地址：${rtmp} \n HLS地址：${hls} \n FLV地址：${flv}`;
				this.selectedCDNInfos.push(str);
			},
			loadCDNs() {
				if (this.cdns.length === 0) {
					uni.showLoading({
						title: '加载中...'
					});
					let url = Config.host + 'cdns';
					get(url, {}, (json) => {
						let arr = [];
						for (let itemKey in json) {
							arr.push({ id: itemKey, name: json[itemKey] });
						}
						this.cdns = arr;
						uni.hideLoading();
					}, (error) => {
						uni.showToast({
							icon: 'none',
							title: `Network Error: ${JSON.stringify(error)}`,
							duration: 2000
						});
						uni.hideLoading();
					});
				}
				this.$refs.cdnsPopup.open('center');
			},
			loadCDN(id, name) {
				uni.showLoading({
					title: '加载中...'
				});
				let session = this.rtcEngine.getSessionId();
				let url = `${Config.host}cdn/${id}/sealLive/${session}`;
				get(url, {}, json => {
					this.rtcEngine.addLiveCdn(json.push);
					this.showCDNInfo(json, name);
					uni.hideLoading();
				}, (error) => {
					uni.showToast({
						icon: 'none',
						title: `Network Error: ${JSON.stringify(error)}`,
						duration: 2000
					});
					uni.hideLoading();
				});
			}
		}
	}
</script>

<style scoped>
	.cdn-info-list {
		bottom: 100rpx;
	}

	.cdn-info-item {
		display: flex;
		flex-direction: column;
		margin: 10rpx;
		border-bottom-width: 1rpx;
		border-bottom-color: #000000;
		border-bottom-style: solid;
	}

	.cdn-info-text {
		word-break: break-word;
		margin-right: 20rpx;
	}

	.cdn-info-buttons-view {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.buttons {
		width: 100%;
		position: fixed;
		display: flex;
		bottom: 40rpx;
		flex-direction: row;
		justify-content: space-around;
	}

	.popup-inline-item {
		flex-direction: row;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.popup-title {
		font-size: 38rpx;
		color: #E43D33;
		margin-bottom: 40rpx;
		text-align: center;
	}

	.popup-content {
		margin: 40rpx;
		width: 600rpx;
		background-color: #FFFFFF;
		justify-content: center;
		padding: 40rpx;
	}
</style>
