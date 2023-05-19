<template>
	<view>
		<view class="setting-view">
			<view style="display: flex; flex-direction: row-reverse; margin-right: 10px;margin-bottom: 20px;" @click="micDetection">
				<uniIcons type="mic" size="30" color="#FFFFFF"></uniIcons>
			</view>
		</view>
		
		<view style="margin: 20rpx; margin-top: 10px;">
			<view class="cache-view">
				<button @click="selectCacheUsersClick"><text
						style="margin: 0; font-size: 28rpx;">从缓存用户中选择</text></button>
				<button @click="removeCacheUsersClick"><text style="margin: 0; font-size: 28rpx;">清空</text></button>
			</view>
			<view class="uni-input-wrapper">
				<input class="uni-input" @input="onKeyInput" :disabled="connected" placeholder="App Key"
					v-model="appKey" />
			</view>
			<view class="uni-input-wrapper">
				<input class="uni-input" @input="onNavigateInput" :disabled="connected" placeholder="Navigate Url"
					v-model="navigate" />
			</view>
			<view class="uni-input-wrapper">
				<input class="uni-input" @input="onFileInput" :disabled="connected" placeholder="File Url"
					v-model="file" />
			</view>
			<view class="uni-input-wrapper">
				<input class="uni-input" @input="onMediaInput" :disabled="connected" placeholder="Media Url"
					v-model="media" />
			</view>
			<view class="uni-form-item uni-row" style="margin-top: 10rpx;">
				<view style="flex: 1; border:1rpx solid #888888;">
					<input class="uni-input" @input="onTokenInput" :disabled="connected" placeholder="Token"
						v-model="token" />
				</view>
				<button v-if="showGenerateButton" style="margin-left: 10rpx;" type="primary" size="mini"
					:disabled="connected" @click="getToken(appKey)">
					生成
				</button>
			</view>
			<button type="primary" :disabled="false"
				@click="connected ? disconnect() : connect(appKey, navigate, file, token)">
				{{ connected ? "断开连接" : "连接" }}
			</button>
			
			<view style="margin-top: 50rpx;" v-show="connected">
				<button type="primary" style="margin-top: 20rpx;margin-bottom: 20rpx;" @click="startNetworkProbe()">
					网络探测
				</button>
				<radio-group class="uni-center" @change="onModeChange" v-model="currentMode">
					<label class="radio" v-for="(mode, index) in modes" :key="mode.value">
						<radio :value="mode.value" :checked="index === currentMode" />
						{{mode.name}}
					</label>
				</radio-group>
				<view class="uni-input-wrapper">
					<input class="uni-input" @input="onRoomInput" :placeholder=holders[currentMode] v-model="room" />
				</view>
				<view style="margin-bottom: 20rpx;" v-show="currentMode == 1">
					<radio-group class="uni-center" @change="onMediaChange" v-model="currentMedia">
						<label class="radio" v-for="media in medias" :key="media.value">
							<radio :value="media.value" :checked="media.value === currentMedia" />
							{{media.name}}
						</label>
					</radio-group>
				</view>
				<label v-show="currentMode != 2" @click="onTinyChange">
					<radio :checked="tiny" disabled="true" />
					开启大小流
				</label>
				<button type="primary" style="margin-top: 20rpx;" :disabled="false" @click="joinRoom(room)">
					{{ actions[currentMode] }}
				</button>
				
			</view>
		</view>
		<fuiDropdownList :options="cacheUserNames" ref="cacheUsersList" :isCheckbox="false"
			@click="cacheUsersItemClick"></fuiDropdownList>
		<!-- 由于 uni 的原生事件只能在单页面内接收，所以需要在这里注册原生事件监听，将原生页面级事件转发到 uni 全局；
		此组件需要放在调用 RCRTCEngine.init() 的页面，并且需要保证当前页面不会被销毁 -->
		<!-- <nativeListeners></nativeListeners> -->
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import * as config from '../common/config.js';
	import * as util from '../common/util.js';
	import * as constants from '../common/constants.js';
	// import * as im from "@/uni_modules/RongCloud-IMWrapper/js_sdk/index"
	import nativeListeners from './nativeListeners';
	import RCIMIWEngine from "@/uni_modules/RongCloud-IMWrapper-V2/js_sdk/RCIMEngine";
	import RCRTCEngine from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCEngine';
	import {
		RCRTCMediaType,
		RCRTCEngineEventsName,
		RCRTCStatsEventsName
	} from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCDefines';

	import fuiDropdownList from "@/components/fui-dropdown-list/fui-dropdown-list";

	const StorageLoginUsersKey = 'rtc-storage-login-users';

	export default {
		components: {
			nativeListeners: nativeListeners,
			fuiDropdownList,
			uniIcons,
		},
		data() {
			return {
				appKey: config.key,
				navigate: '',
				file: '',
				media: '',
				token: '',
				connected: false,
				showGenerateButton: false,
				modes: [],
				currentMode: 0,
				currentMedia: RCRTCMediaType.AudioVideo,
				actions: [],
				tiny: true,
				room: '',
				inited: false,
				userId: '',
				cacheUserNames: [],
				cacheUsers: [],
				rtcEngine: null,
				imEngine: null,
			}
		},
		computed: {

		},
		onLoad: function(option) {
			this.modes = constants.modes;
			this.holders = constants.holders;
			this.medias = constants.medias;
			this.actions = constants.actions;
			this.showGenerateButton = config.host.trim() != '';
			// im.clearReceiveMessageListener();
			// console.log('clearReceiveMessageListener');
			// im.addReceiveMessageListener(res => {
			// 	uni.$emit('rcimlib-receive-message', res);
			// });
		},
		onUnload() {
			uni.$off(RCRTCEngineEventsName.OnRoomJoined);
			uni.$off(RCRTCEngineEventsName.OnRoomLeft);
		},
		methods: {
			selectCacheUsersClick() {
				uni.getStorage({
					key: StorageLoginUsersKey,
					success: (res) => {
						this.cacheUsers = res.data;
						this.cacheUserNames = this.cacheUsers.map(user => `${user.appKey}-${user.userId}`);
						this.$refs.cacheUsersList.show();
					}
				});
			},
			removeCacheUsersClick() {
				uni.removeStorage({
					key: StorageLoginUsersKey,
					success: function(res) {
						this.cacheUsers = [];
						this.cacheUserNames = [];
						uni.showToast({
							icon: 'none',
							title: '清空成功'
						})
					}
				});

			},
			cacheUsersItemClick(e) {
				let user = this.cacheUsers[e.index];
				console.log(user);
				let { appKey, navigate, file, media, token, userId } = user;
				this.appKey = appKey;
				this.navigate = navigate;
				this.file = file;
				this.token = token;
				this.userId = userId;
				this.media = media;
			},
			onModeChange(event) {
				if (this.currentMode != event.detail.value) {
					this.currentMode = event.detail.value;
					this.room = '';
					this.currentMedia = RCRTCMediaType.AudioVideo;
					this.tiny = true;
				}
			},
			onMediaChange(event) {
				this.currentMedia = event.detail.value;
			},
			onTinyChange(event) {
				this.tiny = !this.tiny;
			},
			onKeyInput: function(event) {
				this.key = event.detail.value
			},
			onNavigateInput: function(event) {
				this.navigate = event.detail.value
			},
			onFileInput: function(event) {
				this.file = event.detail.value
			},
			onMediaInput: function(event) {
				this.media = event.detail.value
			},
			onTokenInput: function(event) {
				this.token = event.detail.value
			},
			onRoomInput(event) {
				this.room = event.detail.value;
			},
			getToken(key) {
				uni.showLoading({
					title: '加载中...'
				});
				var id = `${config.prefix}${Date.now()}`;
				var k = util.isEmpty(key) ? config.key : key;
				var url = `${config.host}token/${id}`;
				var params = {
					key: k
				};
				util.post(url, params, (json) => {
					let token = json.token;
					if (!util.isEmpty(token)) {
						this.key = k;
						this.token = token;
					} else {
						uni.showToast({
							icon: 'none',
							title: 'Get Token Error!',
							duration: 2000
						});
					}
					uni.hideLoading();
				}, (error) => {
					uni.showToast({
						icon: 'none',
						title: `Network Error: ${error}`,
						duration: 2000
					});
					uni.hideLoading();
				});
			},
			async disconnect() {
				// RCRTCEngine.unInit();
				let rtcDestroyCode = await this.rtcEngine.destroy();
				let imDestroyCode = await this.imEngine.destroy();
				this.connected = false;
			},
			async connect(appKey, navigate, file, token) {
				this.disconnect()
				if (util.isEmpty(token)) {
					uni.showToast({
						icon: 'none',
						title: 'Token Should Not Be Null!',
						duration: 2000
					});
					return;
				}
				uni.showLoading({
					title: '加载中...'
				});
				var k = util.isEmpty(appKey) ? config.appKey : appKey;
				var n = util.isEmpty(navigate) ? config.navigate : navigate;
				var f = util.isEmpty(file) ? config.file : file;
				
				const options = {
					naviServer: n,
					fileServer: f
				}
				getApp().globalData.imEngine = await RCIMIWEngine.create(k,options)
				this.imEngine = getApp().globalData.imEngine
				this.imEngine.setOnMessageReceivedListener(res => {
					console.log('OnMessageReceived-res---',res)
				});
				this.imEngine.setOnDatabaseOpenedListener((res) => {
					console.log('OnDatabaseOpened-res---',res)
				});
				this.imEngine.setOnConnectedListener((res) => {
					console.log('OnConnected-res---',res)
					if(res.code == 0 || res.code == 34001){
						getApp().globalData.localUserId = res.userId;
						this.appKey = k;
						this.navigate = n;
						this.file = f;
						this.token = token;
						this.userId = res.userId;
						this.connected = true;
						let user = { appKey: k, token: token, navigate: n, file: f, media: this.media, userId: res
								.userId };
						let cacheUsers = uni.getStorageSync(StorageLoginUsersKey);
						if (!cacheUsers) {
							cacheUsers = [];
						}
						let findIndex = cacheUsers.findIndex(user => user.userId === res.userId);
						if (findIndex === -1) {
							cacheUsers.push(user);
						} else {
							// 否则更新内容
							cacheUsers.splice(findIndex, 1, user);
						}
						
						uni.setStorage({
							key: StorageLoginUsersKey,
							data: cacheUsers,
							success: function() {
								console.log('success');
							}
						});
						uni.hideLoading();
					}else{
						uni.hideLoading();
						uni.showToast({
							title: 'error:' + res.code,
							icon: 'error'
						})
					}
				});
				let code = await this.imEngine.connect(token, 10)
				if(code != 0 ){
					uni.hideLoading();
					uni.showToast({
						title: 'error:' + code,
						icon: 'error'
					})
				}
			},
			// 加入房间
			joinRoom() {
				if (util.isEmpty(this.room)) {
					uni.showToast({
						icon: 'none',
						title: `${this.holders[this.currentMode]} Should Not Be Null!`,
						duration: 2000
					});
					return;
				}
				var videoSetup = {
					enableTinyStream: this.tiny,
				};
				var setup = util.isEmpty(this.media) ? {
					videoSetup: videoSetup
				} : {
					mediaUrl: this.media,
					videoSetup: videoSetup
				};
				console.log(setup);
				getApp().globalData.rtcEngine = RCRTCEngine.create(setup);
				this.rtcEngine = getApp().globalData.rtcEngine;
				console.log('this.rtcEngine---',this.rtcEngine);
				getApp().globalData.roomUsers = [];
				
				this.removeListeners();
				this.addListeners();

				let roomSetup = {
					type: this.currentMedia,
					role: this.currentMode,
				};
				let url = '';
				switch (this.currentMode) {
					case 0:
						url =
							`./meeting/meeting?roomId=${this.room}&roomSetup=${JSON.stringify(roomSetup)}&userId=${this.userId}&enableTinyStream=${this.tiny}`
						break;
					case 1:
						url =
							`./host/host?roomId=${this.room}&roomSetup=${JSON.stringify(roomSetup)}&userId=${this.userId}&enableTinyStream=${this.tiny}`;
						break;
					case 2:
						url = `./audience/audience?roomId=${this.room}&roomSetup=${JSON.stringify(roomSetup)}&userId=${this.userId}&enableTinyStream=${this.tiny}`
						break;
				}
				uni.navigateTo({
					url
				});
			},
			//网络探测
			startNetworkProbe(){
				uni.navigateTo({url: 'NetworkProbe'})
			},
			//麦克风&扬声器检测
			micDetection(){
				uni.navigateTo({url: 'MicrophoneDetection'})
			},
			addListeners() {
				console.log('addListeners-rtcEngine---',this.rtcEngine)
				this.rtcEngine.setOnErrorListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnError, res);
				});
				this.rtcEngine.setOnKickedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnKicked, res);
				});
				this.rtcEngine.setOnRoomJoinedListener((res) => {
					console.log('setOnRoomJoinedListener---',res)
					uni.$emit(RCRTCEngineEventsName.OnRoomJoined, res);
				});
				this.rtcEngine.setOnRoomLeftListener((res) => {
					console.log('setOnRoomLeftListener');
					uni.$emit(RCRTCEngineEventsName.OnRoomLeft, res);
				});
				this.rtcEngine.setOnPublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnPublished, res);
				});
				this.rtcEngine.setOnUnpublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnUnpublished, res);
				});
				this.rtcEngine.setOnSubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnSubscribed, res);
				});
				this.rtcEngine.setOnUnsubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnUnsubscribed, res);
				});
				this.rtcEngine.setOnLiveMixSubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixSubscribed, res);
				});
				this.rtcEngine.setOnLiveMixUnsubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixUnsubscribed, res);
				});
				this.rtcEngine.setOnCameraEnabledListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCameraEnabled, res);
				});
				this.rtcEngine.setOnCameraSwitchedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCameraSwitched, res);
				});
				this.rtcEngine.setOnLiveCdnAddedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveCdnAdded, res);
				});
				this.rtcEngine.setOnLiveCdnRemovedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveCdnRemoved, res);
				});
				this.rtcEngine.setOnLiveMixLayoutModeSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixLayoutModeSet, res);
				});
				this.rtcEngine.setOnLiveMixRenderModeSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixRenderModeSet, res);
				});
				this.rtcEngine.setOnLiveMixCustomAudiosSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixCustomAudiosSet, res);
				});
				this.rtcEngine.setOnLiveMixCustomLayoutsSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixCustomLayoutsSet, res);
				});
				this.rtcEngine.setOnLiveMixAudioBitrateSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixAudioBitrateSet, res);
				});
				this.rtcEngine.setOnLiveMixVideoBitrateSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixVideoBitrateSet, res);
				});
				this.rtcEngine.setOnLiveMixVideoResolutionSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixVideoResolutionSet, res);
				});
				this.rtcEngine.setOnLiveMixVideoFpsSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixVideoFpsSet, res);
				});
				this.rtcEngine.setOnAudioEffectCreatedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioEffectCreated, res);
				});
				this.rtcEngine.setOnAudioEffectFinishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioEffectFinished, res);
				});
				this.rtcEngine.setOnAudioMixingStartedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioMixingStarted, res);
				});
				this.rtcEngine.setOnAudioMixingPausedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioMixingPaused, res);
				});
				this.rtcEngine.setOnAudioMixingStoppedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioMixingStopped, res);
				});
				this.rtcEngine.setOnAudioMixingFinishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioMixingFinished, res);
				});
				this.rtcEngine.setOnUserJoinedListener((res) => {
					console.log('connect-setOnUserJoinedListener---')
					// 远端用户 userId
					let { userId } = res;
					this.userJoined(res)
					uni.$emit(RCRTCEngineEventsName.OnUserJoined, res);
				});
				this.rtcEngine.setOnUserOfflineListener((res) => {
					console.log('connect-setOnUserOfflineListener---')
					this.userOffline(res)
					uni.$emit(RCRTCEngineEventsName.OnUserOffline, res);
				});
				this.rtcEngine.setOnUserLeftListener((res) => {
					this.userLeft(res)
					uni.$emit(RCRTCEngineEventsName.OnUserLeft, res);
				});
				this.rtcEngine.setOnRemotePublishedListener((res) => {
					console.log('connect-setOnRemotePublishedListener---')
					this.remotePublished(res)
					uni.$emit(RCRTCEngineEventsName.OnRemotePublished, res);
				});
				this.rtcEngine.setOnRemoteUnpublishedListener((res) => {
					console.log('connect-setOnRemoteUnpublishedListener---')
					this.remoteUnpublished(res)
					uni.$emit(RCRTCEngineEventsName.OnRemoteUnpublished, res);
				});
				this.rtcEngine.setOnRemoteLiveMixPublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteLiveMixPublished, res);
				});
				this.rtcEngine.setOnRemoteLiveMixUnpublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteLiveMixUnpublished, res);
				});
				this.rtcEngine.setOnRemoteStateChangedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteStateChanged, res);
				});
				this.rtcEngine.setOnRemoteFirstFrameListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteFirstFrame, res);
				});
				this.rtcEngine.setOnRemoteLiveMixFirstFrameListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteLiveMixFirstFrame, res);
				});
			
				this.rtcEngine.setOnCustomStreamPublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCustomStreamPublished, res);
					// 更新保存的用户\
					let {tag} = res;
					let users = getApp().globalData.roomUsers;
					let index = users.findIndex(user => user.userId === this.localUserId);
					let user = users[index];
					user.tag = tag;
					users.splice(index, 1, user);
				});
				this.rtcEngine.setOnCustomStreamUnpublishedListener((res) => {
					// 更新保存的用户
					let users = getApp().globalData.roomUsers;
					let userIndex = users.findIndex(user => user.userId === this.localUserId);
					let user = users[userIndex];
					user.tag = null;
					users.splice(userIndex, 1, user);
					
					uni.$emit(RCRTCEngineEventsName.OnCustomStreamUnpublished, res);
				});
				this.rtcEngine.setOnRemoteCustomStreamPublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteCustomStreamPublished, res);
				});
				this.rtcEngine.setOnRemoteCustomStreamUnpublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteCustomStreamUnpublished, res);
				});
				this.rtcEngine.setOnCustomStreamSubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCustomStreamSubscribed, res);
				});
				this.rtcEngine.setOnCustomStreamUnsubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCustomStreamUnsubscribed, res);
				});
				this.rtcEngine.setOnCustomStreamPublishFinishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCustomStreamPublishFinished, res);
				});
				this.rtcEngine.setOnJoinSubRoomRequestedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnJoinSubRoomRequested, res);
				});
				this.rtcEngine.setOnJoinSubRoomRequestCanceledListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnJoinSubRoomRequestCanceled, res);
				});
				this.rtcEngine.setOnJoinSubRoomRequestRespondedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnJoinSubRoomRequestResponded, res);
				});
				this.rtcEngine.setOnJoinSubRoomRequestReceivedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnJoinSubRoomRequestReceived, res);
				});
				this.rtcEngine.setOnCancelJoinSubRoomRequestReceivedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCancelJoinSubRoomRequestReceived, res);
				});
				this.rtcEngine.setOnJoinSubRoomRequestResponseReceivedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnJoinSubRoomRequestResponseReceived, res);
				});
				this.rtcEngine.setOnSubRoomJoinedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnSubRoomJoined, res);
				});
				this.rtcEngine.setOnSubRoomLeftListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnSubRoomLeft, res);
				});
				this.rtcEngine.setOnSubRoomBandedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnSubRoomBanded, res);
				});
				this.rtcEngine.setOnSubRoomDisbandListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnSubRoomDisband, res);
				});
				
				// 状态监听
				this.rtcEngine.setOnNetworkStatsListener((res) => {
					let { type, ip, sendBitrate, receiveBitrate, rtt } = res;
					uni.$emit(RCRTCStatsEventsName.OnNetworkStats, res);
				});
				this.rtcEngine.setOnLocalAudioStatsListener((res) => {
					let { codec, bitrate, volume, packageLostRate, rtt } = res;
					uni.$emit(RCRTCStatsEventsName.OnLocalAudioStats, res);
				});
				this.rtcEngine.setOnLocalVideoStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnLocalVideoStats, res);
				});
				this.rtcEngine.setOnRemoteAudioStatsListener((res) => {
					// 详情请查看 OnRemoteAudioStatsData 的定义
					uni.$emit(RCRTCStatsEventsName.OnRemoteAudioStats, res);
				});
				this.rtcEngine.setOnRemoteVideoStatsListener((res) => {
					// 详情请查看 OnRemoteVideoStatsData 的定义
					let { userId, roomId, stats } = res;
					let users = getApp().globalData.roomUsers;
					let index = users.findIndex(user => user.userId === userId);
					if (index === -1) return;
					let user = users[index];
					user.videoStats = stats;
					users.splice(index, 1, user);
					
					uni.$emit(RCRTCStatsEventsName.OnRemoteVideoStats, res);
				});
				this.rtcEngine.setOnLiveMixAudioStatsListener((res) => {
					// res 详情请查看 RCRTCRemoteAudioStats 的定义
					uni.$emit(RCRTCStatsEventsName.OnLiveMixAudioStats, res);
				});
				this.rtcEngine.setOnLiveMixVideoStatsListener((res) => {
					// res 详情请查看 RCRTCRemoteVideoStats 的定义
					uni.$emit(RCRTCStatsEventsName.OnLiveMixVideoStats, res);
				});
				this.rtcEngine.setOnLiveMixMemberAudioStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnLiveMixMemberAudioStats, res);
				});
				this.rtcEngine.setOnLiveMixMemberCustomAudioStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnLiveMixMemberCustomAudioStats, res);
				});
				this.rtcEngine.setOnLocalCustomAudioStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnLocalCustomAudioStats, res);
				});
				this.rtcEngine.setOnLocalCustomVideoStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnLocalCustomVideoStats, res);
				});
				this.rtcEngine.setOnRemoteCustomAudioStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnRemoteCustomAudioStats, res);
				});
				this.rtcEngine.setOnRemoteCustomVideoStatsListener((res) => {
					let { userId, roomId, tag, stats } = res;
					let users = getApp().globalData.roomUsers;
					let index = users.findIndex(user => user.userId === userId);
					if (index === -1) return;
					let user = users[index];
					let custom = user.customs.find(item => item.tag === tag);
					if (custom) {
						custom.videoStats = stats;
					}
					users.splice(index, 1, user);
					
					uni.$emit(RCRTCStatsEventsName.OnRemoteCustomVideoStats, res);
				});
				
				this.rtcEngine.setOnLiveMixInnerCdnStreamSubscribedListener((res) => {
					uni.$emit('IRCRTCIWListener:onLiveMixInnerCdnStreamSubscribed', res);
				});
				this.rtcEngine.setOnLiveMixInnerCdnStreamUnsubscribedListener((res) => {
					uni.$emit('IRCRTCIWListener:onLiveMixInnerCdnStreamUnsubscribed', res);
				});
				this.rtcEngine.setOnLocalLiveMixInnerCdnVideoResolutionSetListener((res) => {
					uni.$emit('IRCRTCIWListener:onLocalLiveMixInnerCdnVideoResolutionSet', res);
				});
				this.rtcEngine.setOnLocalLiveMixInnerCdnVideoFpsSetListener((res) => {
					uni.$emit('IRCRTCIWListener:onLocalLiveMixInnerCdnVideoFpsSet', res);
				});
				this.rtcEngine.setOnLiveMixInnerCdnStreamEnabledListener((res) => {
					uni.$emit('IRCRTCIWListener:onLiveMixInnerCdnStreamEnabled', res);
				});
				this.rtcEngine.setOnLiveRoleSwitchedListener((res) => {
					uni.$emit('IRCRTCIWListener:onLiveRoleSwitched', res);
				});
				this.rtcEngine.setOnRemoteLiveRoleSwitchedListener((res) => {
					console.log('connect-setOnRemoteLiveRoleSwitchedListener---',res)
					if (res.role == 1){
						//房间中有观众切换为了主播
						this.addUser(res.userId,res.roomId);
					} else if (res.role == 2) {
						// 房间中有主播切换为观众
						this.userLeft({userId: res.userId, roomId: res.roomId});
					}
					uni.$emit('IRCRTCIWListener:onRemoteLiveRoleSwitched', res);
				});
				this.rtcEngine.setOnSeiEnabledListener((res) => {
					uni.$emit('IRCRTCIWListener:onSeiEnabled', res);
				});
				this.rtcEngine.setOnSeiReceivedListener((res) => {
					uni.$emit('IRCRTCIWListener:onSeiReceived', res);
				});
				this.rtcEngine.setOnLiveMixSeiReceivedListener((res) => {
					uni.$emit('IRCRTCIWListener:onLiveMixSeiReceived', res);
				});
			},
			removeListeners() {
				this.rtcEngine.setOnErrorListener();
				this.rtcEngine.setOnKickedListener();
				this.rtcEngine.setOnRoomJoinedListener();
				this.rtcEngine.setOnRoomLeftListener();
				this.rtcEngine.setOnPublishedListener();
				this.rtcEngine.setOnUnpublishedListener();
				this.rtcEngine.setOnSubscribedListener();
				this.rtcEngine.setOnUnsubscribedListener();
				this.rtcEngine.setOnLiveMixSubscribedListener();
				this.rtcEngine.setOnLiveMixUnsubscribedListener();
				this.rtcEngine.setOnCameraEnabledListener();
				this.rtcEngine.setOnCameraSwitchedListener();
				this.rtcEngine.setOnLiveCdnAddedListener();
				this.rtcEngine.setOnLiveCdnRemovedListener();
				this.rtcEngine.setOnLiveMixLayoutModeSetListener();
				this.rtcEngine.setOnLiveMixRenderModeSetListener();
				this.rtcEngine.setOnLiveMixCustomAudiosSetListener();
				this.rtcEngine.setOnLiveMixCustomLayoutsSetListener();
				this.rtcEngine.setOnLiveMixAudioBitrateSetListener();
				this.rtcEngine.setOnLiveMixVideoBitrateSetListener();
				this.rtcEngine.setOnLiveMixVideoResolutionSetListener();
				this.rtcEngine.setOnLiveMixVideoFpsSetListener();
				this.rtcEngine.setOnAudioEffectCreatedListener();
				this.rtcEngine.setOnAudioEffectFinishedListener();
				this.rtcEngine.setOnAudioMixingStartedListener();
				this.rtcEngine.setOnAudioMixingPausedListener();
				this.rtcEngine.setOnAudioMixingStoppedListener();
				this.rtcEngine.setOnAudioMixingFinishedListener();
				this.rtcEngine.setOnUserJoinedListener();
				this.rtcEngine.setOnUserOfflineListener();
				this.rtcEngine.setOnUserLeftListener();
				this.rtcEngine.setOnRemotePublishedListener();
				this.rtcEngine.setOnRemoteUnpublishedListener();
				this.rtcEngine.setOnRemoteLiveMixPublishedListener();
				this.rtcEngine.setOnRemoteLiveMixUnpublishedListener();
				this.rtcEngine.setOnRemoteStateChangedListener();
				this.rtcEngine.setOnRemoteFirstFrameListener();
				this.rtcEngine.setOnRemoteLiveMixFirstFrameListener();
			
				this.rtcEngine.setOnCustomStreamPublishedListener();
				this.rtcEngine.setOnCustomStreamUnpublishedListener();
				this.rtcEngine.setOnRemoteCustomStreamPublishedListener();
				this.rtcEngine.setOnRemoteCustomStreamUnpublishedListener();
				this.rtcEngine.setOnCustomStreamSubscribedListener();
				this.rtcEngine.setOnCustomStreamUnsubscribedListener();
				this.rtcEngine.setOnCustomStreamPublishFinishedListener();
				this.rtcEngine.setOnJoinSubRoomRequestedListener();
				this.rtcEngine.setOnJoinSubRoomRequestCanceledListener();
				this.rtcEngine.setOnJoinSubRoomRequestRespondedListener();
				this.rtcEngine.setOnJoinSubRoomRequestReceivedListener();
				this.rtcEngine.setOnCancelJoinSubRoomRequestReceivedListener();
				this.rtcEngine.setOnJoinSubRoomRequestResponseReceivedListener();
				this.rtcEngine.setOnSubRoomJoinedListener();
				this.rtcEngine.setOnSubRoomLeftListener();
				this.rtcEngine.setOnSubRoomBandedListener();
				this.rtcEngine.setOnSubRoomDisbandListener();
				
				// 状态监听
				this.rtcEngine.setOnNetworkStatsListener();
				this.rtcEngine.setOnLocalAudioStatsListener();
				this.rtcEngine.setOnLocalVideoStatsListener();
				this.rtcEngine.setOnRemoteAudioStatsListener();
				this.rtcEngine.setOnRemoteVideoStatsListener();
				this.rtcEngine.setOnLiveMixAudioStatsListener();
				this.rtcEngine.setOnLiveMixVideoStatsListener();
				this.rtcEngine.setOnLiveMixMemberAudioStatsListener();
				this.rtcEngine.setOnLiveMixMemberCustomAudioStatsListener();
				this.rtcEngine.setOnLocalCustomAudioStatsListener();
				this.rtcEngine.setOnLocalCustomVideoStatsListener();
				this.rtcEngine.setOnRemoteCustomAudioStatsListener();
				this.rtcEngine.setOnRemoteCustomVideoStatsListener();
				
				this.rtcEngine.setOnLiveMixInnerCdnStreamSubscribedListener();
				this.rtcEngine.setOnLiveMixInnerCdnStreamUnsubscribedListener();
				this.rtcEngine.setOnLocalLiveMixInnerCdnVideoResolutionSetListener();
				this.rtcEngine.setOnLocalLiveMixInnerCdnVideoFpsSetListener();
				this.rtcEngine.setOnLiveMixInnerCdnStreamEnabledListener();
				this.rtcEngine.setOnLiveRoleSwitchedListener();
				this.rtcEngine.setOnRemoteLiveRoleSwitchedListener();
				this.rtcEngine.setOnSeiEnabledListener();
				this.rtcEngine.setOnSeiReceivedListener();
				this.rtcEngine.setOnLiveMixSeiReceivedListener();
			},
			addUser(userId,roomId){
				let user = {
					roomId,
					userId,
					isPublishAudio: false,
					isPublishVideo: false,
					isSubscribedVideo: false,
					isSubscribedAudio: false,
					videoStats: null,
					// customs 内部保存的是 
					// {tag: null,
					// isPublishAudio: false,
					// isPublishVideo: false,
					// isSubscribedVideo: false,
					// isSubscribedAudio: false,
					// videoStats: null,}
					customs: [],
				};
				console.log('getApp().globalData.roomUsers---',getApp().globalData.roomUsers)
				let users = getApp().globalData.roomUsers;
				let findIndex = users.findIndex(user => user.userId === userId);
				if (findIndex === -1) {
					users.push(user);
				}
				console.log('getApp().globalData.roomUsers2---',getApp().globalData.roomUsers)
				// if (roomId != this.roomId) {
				// 	//更新跨房间的用户信息
				// 	let joinedSubRooms = this.getGlobalData().joinedSubRooms;
				// 	if (joinedSubRooms && !joinedSubRooms.includes(roomId)) {
				// 		joinedSubRooms.push(roomId);
				// 	}
				// 	this.updateJoinableSubRooms();
				// }
			},
			userJoined(res){
				console.log('host OnUserJoined', res);
				let { userId, roomId } = res;
				// 添加用户
				this.addUser(userId,roomId)
			},
			userLeft(res){
				console.log('host OnUserLeft', res);
				let { userId, roomId } = res;
				let users = getApp().globalData.roomUsers;
				let findIndex = users.findIndex(user => user.userId === userId);
				if (findIndex != -1) {
					users.splice(findIndex, 1);
				}
			},
			userOffline(res){
				console.log('host OnUserOffline', res);
				let { userId, roomId } = res;
				let users = getApp().globalData.roomUsers;
				let findIndex = users.findIndex(user => user.userId === userId);
				if (findIndex != -1) {
					users.splice(findIndex, 1);
				}
			},
			remotePublished(res){
				console.log('onRemotePublishedCallback---',res)
				let { userId, roomId, type } = res;
				this.updateUserPublishedState(userId, type, true);
			},
			remoteUnpublished(res){
				console.log('onRemoteUnpublishedCallback---')
				let { userId, roomId, type } = res;
				this.updateUserPublishedState(userId, type, false);
			},
			updateUserPublishedState(userId, type, enable, tag = null, code = 0, message = '') {
				if (code != 0) {
					uni.showToast({
						icon: 'none',
						title: `${enable?'':'取消'} 发布失败: ${code}-${message}`
					});
					return;
				}
				let users = getApp().globalData.roomUsers;
				let index = users.findIndex(user => user.userId === userId);
				if (index === -1) return;
				let user = users[index];
				// tag 不为 null 代表设置的是自定义视频流
				if (tag) {
					let customIndex = user.customs.findIndex(item => item.tag == tag);
					console.log('customIndex = ', customIndex);
					if (customIndex === -1) {
						let custom = {
							tag: tag,
							isPublishAudio: false,
							isPublishVideo: false,
							isSubscribedVideo: false,
							isSubscribedAudio: false,
							videoStats: null
						}
						this.changePublishState(custom, type, enable);
						user.customs.push(custom);
					} else {
						let custom = user.customs[customIndex];
						if (!enable) {
							this.changePublishState(custom, type, false);
						} else {
							this.changePublishState(custom, type, true);
						}
						console.log(custom);
						if (!(custom.isPublishAudio || custom.isPublishVideo)) {
							user.customs.splice(customIndex, 1);
						}
					}
				} else {
					this.changePublishState(user, type, enable);
				}
				users.splice(index, 1, user);
			},
			changePublishState(user, type, enable) {
				switch (type) {
					case RCRTCMediaType.Video:
						user.isPublishVideo = enable;
						break;
					case RCRTCMediaType.Audio:
						user.isPublishAudio = enable;
						break;
					case RCRTCMediaType.AudioVideo:
						user.isPublishAudio = enable;
						user.isPublishVideo = enable;
						break;
				}
				if (!enable) {
					this.changeSubscribedState(user, type, false);
				}
			},
			changeSubscribedState(user, type, enable) {
				switch (type) {
					case RCRTCMediaType.Video:
						user.isSubscribedVideo = enable;
						break;
					case RCRTCMediaType.Audio:
						user.isSubscribedAudio = enable;
						break;
					case RCRTCMediaType.AudioVideo:
						user.isSubscribedAudio = enable;
						user.isSubscribedVideo = enable;
						break;
				}
			},
			// updateJoinableSubRooms() {
			// 	let joinableSubRooms = this.getGlobalData().joinableSubRooms;
			// 	if (!joinableSubRooms) return;
			// 	// 提前清空，下面重新组装 (通过splice直接修改原数组)
			// 	joinableSubRooms.splice(0, joinableSubRooms.length);
			// 	let bandedSubRooms = this.getGlobalData().bandedSubRooms;
			// 	let joinedSubRooms = this.getGlobalData().joinedSubRooms;
			// 	bandedSubRooms.forEach(roomId => {
			// 		if (!joinedSubRooms.includes(roomId)) {
			// 			joinableSubRooms.push(roomId);
			// 		}
			// 	});
			// },
			inintialGlobalData() {
				getApp().globalData.hostPageData = {
					// 用户列表 元素为 {userId, tag}
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
					// 已加入并连麦的子房间
					joinedSubRooms: [],
					// 连麦的子房间
					joinableSubRooms: [],
					bandedSubRooms: [],
				};
			},
			getGlobalData() {
				return getApp().globalData.hostPageData;
			},
			destoryGlobalData() {
				getApp().globalData.hostPageData = null;
			},
			// 全局保存的所有直播用户
			getGlobalUsers() {
				return this.getGlobalData().users;
			},
		}
	}
</script>

<style scoped>
	.uni-input-wrapper {
		border: 1rpx solid #888888;
		margin-top: 10rpx;
	}

	.cache-view {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	
	.setting-view {
		flex-direction: row-reverse;
		justify-content: flex-end;
		padding: 10rpx;
		background-color: #007AFF;
		height: 60rpx;
		left: 0;
		right: 0;
	}
</style>