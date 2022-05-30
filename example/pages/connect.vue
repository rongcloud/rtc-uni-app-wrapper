<template>
	<view>
		<view style="margin: 20rpx;">
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
		<nativeListeners></nativeListeners>
	</view>
</template>

<script>
	import * as config from '../common/config.js';
	import * as util from '../common/util.js';
	import * as constants from '../common/constants.js';
	import * as im from "@/uni_modules/RongCloud-IMWrapper/js_sdk/index"
	import nativeListeners from './nativeListeners';
	import {
		RCRTCMediaType,
		RCRTCEngineEventsName,
	} from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCDefines';
	import RCRTCEngine from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCEngine';

	import fuiDropdownList from "@/components/fui-dropdown-list/fui-dropdown-list";

	const StorageLoginUsersKey = 'rtc-storage-login-users';

	export default {
		components: {
			nativeListeners: nativeListeners,
			fuiDropdownList,
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
			im.clearReceiveMessageListener();
			console.log('clearReceiveMessageListener');
			im.addReceiveMessageListener(res => {
				uni.$emit('rcimlib-receive-message', res);
			});
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
			disconnect() {
				RCRTCEngine.unInit();
				im.disconnect();
				this.connected = false;
			},
			connect(appKey, navigate, file, token) {
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
				im.setServerInfo(n, f);
				im.init(k);
				im.disconnect();
				
				im.connect(token, (res) => {
					if (res.code != 0) {
						// connect error
						this.connected = false;
						uni.showToast({
							icon: 'none',
							title: `Connect IM Error ${res.code}`,
							duration: 2000
						});
						uni.hideLoading();
					} else {
						// connected
						this.appKey = k;
						this.navigate = n;
						this.file = f;
						this.token = token;
						this.connected = true;
						this.userId = res.userId;
						getApp().globalData.localUserId = res.userId;
						console.log('im connect success, userId = ' + res.userId);
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
					}
				});
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
				// 初始化引擎
				RCRTCEngine.init(setup);

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
						url = `./audience/audience?roomId=${this.room}&roomSetup=${JSON.stringify(roomSetup)}`
						break;
				}
				uni.navigateTo({
					url
				});
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
</style>