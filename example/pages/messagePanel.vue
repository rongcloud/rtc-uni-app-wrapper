<template>
	<view style="display: flex; flex-direction: column; height: 100%; padding: 10rpx;">
		<button @click="joinRoomClick">
			<text>{{`${joined ? '离开' : '加入'}聊天室`}}</text>
		</button>
		<scroll-view scroll-y style="flex: 1; height: 700rpx">
			<view class="uni-list-cell" v-for="message in messages">
				<text class="text">{{displayMessage(message)}}</text>
			</view>
		</scroll-view>
		<view class="bottom-view">
			<button class="send-button" :disabled="!joined" @click="sendMessage">
				<text>发送消息</text>
			</button>
		</view>
	</view>
</template>

<script>
	import * as IM from "@/uni_modules/RongCloud-IMWrapper/js_sdk/index"

	export default {
		data() {
			return {
				// 是否加入聊天室
				joined: false,
				// 是否主播
				host: false,
				// 房间 id
				roomId: '123',
				// 页面显示的消息
				messages: [],
			}
		},
		onLoad(option) {
			this.host = option.host === 'true';
			this.roomId = option.roomId;
			// 接收消息的监听
			uni.$on('rcimlib-receive-message', res => {
				this.messages.push(res.data);
			});
		},
		onUnload() {
			uni.$off('rcimlib-receive-message');
		},
		// 在点击返回键时处理需要调用原生api的功能。
		onBackPress() {
			this.leave();
		},
		methods: {
			joinRoomClick() {
				if (this.joined) {
					this.leave();
				} else {
					this.join();
				}
			},
			join() {
				// 加入聊天室
				IM.joinChatRoom(this.roomId, -1, res => {
					this.joined = true;
				});
			},
			leave() {
				// 退出聊天室
				IM.quitChatRoom(this.roomId, res => {
					this.joined = false;
				});
			},
			sendMessage() {
				let localUserId = getApp().globalData.localUserId;
				let message = {
					conversationType: IM.ConversationType.CHATROOM,
					targetId: this.roomId,
					content: {
						objectName: 'RC:TxtMsg',
						content: `我是${this.host ? '主播' : '观众'}`,
						extra: ''
					}
				};
				IM.sendMessage(message, res => {
					message.senderUserId = localUserId;
					this.messages.push({ message });
					console.log(this.messages);
				});
			},
			displayMessage(message) {
				let content = message.message.content;
				let userId = message.message.senderUserId;
				let localUserId = getApp().globalData.localUserId;
				let me = userId === localUserId ? '（我）' : '';
				return userId + me + ':' + content.content;
			}
		}
	}
</script>

<style>
	.send-button {}

	.bottom-view {
		position: absolute;
		bottom: 40rpx;
		width: 100%;
		display: flex;
	}

	.text {
		word-wrap: break-word;
		word-break: break-word;
	}
</style>
