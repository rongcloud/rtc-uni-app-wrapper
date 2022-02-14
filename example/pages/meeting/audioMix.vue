<template>
	<view>
		<view class="item-view">
			<text>音乐：我和我的祖国</text>
		</view>
		<view class="item-view">
			<view class="item-title-view">
				<text class="item-title">混合模式</text>
			</view>
			<radio-group class="radio-group-view" @change="changeMode">
				<label class="raido" v-for="(item, index) in modes" :key="item.value">
					<radio :value="item.value" :checked="item.value === mode" />
					<text class="text">{{item.label}}</text>
				</label>
			</radio-group>
		</view>
		<view class="item-view">
			<label class="radio" @click="changePlayback">
				<radio :checked="playback" />
				<text class="text">本地播放</text>
			</label>
		</view>
		<view class="item-view">
			<text class="text">输入音量</text>
			<slider :value="volume" show-value min="0" max="100" step="1" backgroundColor="#BEBEBE"
				activeColor="#465CFF" block-color="#465CFF" block-size="16" @change="changeVolume"></slider>
		</view>
		<view class="item-view">
			<text class="text">本地音量</text>
			<slider :value="localVolume" show-value min="0" max="100" step="1" backgroundColor="#BEBEBE"
				activeColor="#465CFF" block-color="#465CFF" block-size="16" @change="changeLocalVolume"></slider>
		</view>
		<view class="item-view">
			<text class="text">发布音量</text>
			<slider :value="publishVolume" show-value min="0" max="100" step="1" backgroundColor="#BEBEBE"
				activeColor="#465CFF" block-color="#465CFF" block-size="16" @change="changePublishVolume"></slider>
		</view>
		<view class="item-view">
			<text class="text">循环次数</text>
			<slider :value="loop" show-value min="0" max="100" step="1" backgroundColor="#BEBEBE" activeColor="#465CFF"
				block-color="#465CFF" block-size="16" @change="changeLoop"></slider>
		</view>
		<view class="item-view">
			<view class="button-view">
				<button @click="play(index)" :disabled="playing || paused"><text>播放</text></button>
				<button @click="pause(index)" :disabled="!playing"><text>暂停</text></button>
				<button @click="resume(index)" :disabled="!paused"><text>恢复</text></button>
				<button @click="stop(index)" :disabled="!playing"><text>停止</text></button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		RCRTCAudioMixingMode,
		RCRTCEngineEventsName,
		RCRTCStatsEventsName
	} from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCDefines';
	import RCRTCEngine from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCEngine';

	const Platform = uni.getSystemInfoSync().platform;

	export default {
		data() {
			return {
				audiosSrc: '/static/audio/music_0.mp3',
				// 混音行为模式
				modes: [{
					label: '不混合',
					// 对端只能听见麦克风采集的声音
					value: RCRTCAudioMixingMode.None,
				}, {
					label: '混合',
					// 对端能够听到麦克风采集的声音和音频文件的声音
					value: RCRTCAudioMixingMode.Mixing,
				}, {
					label: '替换',
					// 对端只能听到音频文件的声音
					value: RCRTCAudioMixingMode.Replace,
				}],
				mode: RCRTCAudioMixingMode.Mixing,
				playback: true,
				loop: 1,
				volume: 100,
				localVolume: 100,
				publishVolume: 100,
				// 操作状态
				paused: false,
				playing: false,
			}
		},
		onLoad() {
			this.addListeners();
			// 设置混音输入音量, 包含本地播放和发送音量
			RCRTCEngine.adjustAudioMixingVolume(50);
		},
		onUnload() {
			this.removeListeners();
		},
		methods: {
			addListeners() {
				// 开始本地音频数据合流操作回调
				uni.$on(RCRTCEngineEventsName.OnAudioMixingStarted, res => {
					this.playing = true;
				});
				// 暂停本地音频数据合流操作回调
				uni.$on(RCRTCEngineEventsName.OnAudioMixingPaused, res => {
					this.playing = false;
					this.paused = true;
				});
				// 停止本地音频文件数据合流操作回调
				uni.$on(RCRTCEngineEventsName.OnAudioMixingStopped, res => {
					this.playing = false;
					this.paused = false;
				});
				// 结束本地音频文件数据合流操作回调
				uni.$on(RCRTCEngineEventsName.OnAudioMixingFinished, res => {
					this.playing = false;
				});
			},
			removeListeners() {
				uni.$off(RCRTCEngineEventsName.OnAudioMixingStarted);
				uni.$off(RCRTCEngineEventsName.OnAudioMixingPaused);
				uni.$off(RCRTCEngineEventsName.OnAudioMixingStopped);
				uni.$off(RCRTCEngineEventsName.OnAudioMixingFinished);
			},

			changeMode(e) {
				console.log(e);
				let value = e.detail.value;
				this.mode = value;
			},
			changePlayback() {
				this.playback = !this.playback;
			},
			changeVolume(e) {
				let value = e.detail.value;
				this.volume = value;
				this.localVolume = value;
				this.publishVolume = value;
				// 设置混音输入音量, 包含本地播放和发送音量
				RCRTCEngine.adjustAudioMixingVolume(value);
			},
			changeLocalVolume(e) {
				let value = e.detail.value;
				this.localVolume = value;
				// 设置混音本地播放音量
				RCRTCEngine.adjustAudioMixingPlaybackVolume(value);
			},
			changePublishVolume(e) {
				let value = e.detail.value;
				this.publishVolume = value;
				// 设置混音发送音量
				RCRTCEngine.adjustAudioMixingPublishVolume(value);
			},
			changeLoop() {
				let value = e.detail.value;
				this.loop = value;
			},
			play() {
				let path = plus.io.convertLocalFileSystemURL(this.audiosSrc);
				RCRTCEngine.startAudioMixing(path, this.mode, this.playback, this.loop);
			},
			pause() {
				RCRTCEngine.pauseAudioMixing();
			},
			resume() {
				RCRTCEngine.resumeAudioMixing();
			},
			stop() {
				RCRTCEngine.stopAudioMixing();
			},
		}
	}
</script>

<style scoped>
	.radio {
		flex-direction: row;
		align-items: center;
	}

	.radio-group-view {
		display: flex;
		flex-direction: row;
		/* justify-content: space-around; */
	}

	.item-view {
		margin: 30rpx 20rpx 0 20rpx;
	}

	.item-title-view {
		margin-bottom: 20rpx;
	}

	.text {
		font-size: 32rpx;
	}

	.button-view {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
