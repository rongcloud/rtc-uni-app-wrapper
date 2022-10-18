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
	import {RCIMIWConversationType} from '@/uni_modules/RongCloud-IMWrapper-V2/js_sdk/RCIMDefines'

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
				imEngine: null,
			}
		},
		onLoad(option) {
			this.imEngine = getApp().globalData.imEngine
			this.host = option.host === 'true';
			this.roomId = option.roomId;
			// 接收消息的监听
			this.imEngine.setOnMessageReceivedListener(res => {
				console.log('OnMessageReceived-res---',res)
				this.messages.push(res);
			})
		},
		onUnload() {
			// uni.$off('rcimlib-receive-message');
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
			async join() {
				// 加入聊天室
				this.imEngine.setOnChatRoomJoinedListener(res => {
					console.log('OnChatRoomJoined-res---',res)
					if(res.code == 0){
						this.joined = true;
					}else{
						uni.showToast({
							title: 'error:' + res.code,
							icon: 'error'
						})
					}
				})
				//离开聊天室
				this.imEngine.setOnChatRoomLeftListener(res => {
					console.log('OnChatRoomLeft-res---',res)
					if(res.code == 0){
						this.joined = false;
					}else{
						uni.showToast({
							title: 'error:' + res.code,
							icon: 'error'
						})
					}
				})
				
				let code = await this.imEngine.joinChatRoom(this.roomId, -1, true)
				if(code != 0 ){
					uni.showToast({
						title: 'error:' + code,
						icon: 'error'
					})
				}
				
			},
			async leave() {
				// 退出聊天室
				let code = await this.imEngine.leaveChatRoom(this.roomId)
				if(code != 0 ){
					uni.showToast({
						title: 'error:' + code,
						icon: 'error'
					})
				}
			},
			async sendMessage() {
				let localUserId = getApp().globalData.localUserId;
				this.imEngine.setOnMessageSentListener(res => {
					console.log('OnMessageSent-res---',res)
					message.senderUserId = localUserId;
					this.messages.push(res);
				})
				let message = await this.imEngine.createTextMessage(RCIMIWConversationType.chatroom,this.roomId,'null',`我是${this.host ? '主播' : '观众'}`)
				let code = await this.imEngine.sendMessage(message)
				
				// let localUserId = getApp().globalData.localUserId;
				// let message = {
				// 	conversationType: IM.ConversationType.CHATROOM,
				// 	targetId: this.roomId,
				// 	content: {
				// 		objectName: 'RC:TxtMsg',
				// 		content: `我是${this.host ? '主播' : '观众'}`,
				// 		extra: ''
				// 	}
				// };
				// IM.sendMessage(message, res => {
				// 	message.senderUserId = localUserId;
				// 	this.messages.push({ message });
				// 	console.log(this.messages);
				// });
			},
			displayMessage(message) {
				console.log('displayMessage---',message)
				let content = message.message.text;
				let userId = message.message.senderUserId;
				let localUserId = getApp().globalData.localUserId;
				let me = userId === localUserId ? '（我）' : '';
				return userId + me + ':' + content;
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
