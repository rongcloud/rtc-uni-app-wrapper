<template>
	<view>
		<view v-for="(item, index) in layouts" :key="index">
			<view class="cell">
				<text class="cell-text">{{JSON.stringify(item)}}</text>
				<view @click="deleteLayout(index)">
					<icon type="cancel"></icon>
				</view>
			</view>
		</view>
		<view class="buttons">
			<button @click="createLayout"><text>新增</text></button>
			<button @click="commit"><text>提交</text></button>
			<button><text>取消</text></button>
		</view>
		<uni-popup ref="layoutPopup" type="center">
			<view class="popup">
				<text class="popup-title">视频布局</text>
				<view class="uni-inline-item" style="width: 100%; justify-content: space-between;">
					<text style="flex:1">userId: </text>
					<text class="layoutPopup-userId" v-if="selectedId != ''">{{selectedId}}</text>
					<button class="layoutPopup-select-button" size="mini" @click="selectUser">
						<text>选择</text>
					</button>
				</view>
				<view class="input-row">
					<text>视频位置X: </text>
					<input class="input" @input="onXInput" v-model="x" />
				</view>
				<view class="input-row">
					<text>视频位置Y: </text>
					<input class="input" @input="onYInput" v-model="y" />
				</view>
				<view class="input-row">
					<text>视频宽度: </text>
					<input class="input" @input="onWidthInput" v-model="width" />
				</view>
				<view class="input-row">
					<text>视频高度: </text>
					<input class="input" @input="onHeightInput" v-model="height" />
				</view>
				<text class="tip">如果选择的 userId已经设置过，则之前的值会被本次的值更新</text>
				<view class="uni-inline-item" style="margin-top: 20rpx;">
					<button type="primary" @click="popupConfirm">确定</button>
					<button class="button" @click="popupClose">取消</button>
				</view>
			</view>
		</uni-popup>
		<fuiDropdownList :options="userIds" ref="userList" :isCheckbox="false" @click="userItemClick">
		</fuiDropdownList>
	</view>
</template>

<script>
	import {
		RCRTCLiveMixLayoutMode,
		RCRTCStreamType
	} from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCDefines';
	import RCRTCEngine from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCEngine';

	import fuiDropdownList from "@/components/fui-dropdown-list/fui-dropdown-list";

	export default {
		components: {
			fuiDropdownList,
		},
		data() {
			return {
				x: 0,
				y: 0,
				width: 180,
				height: 320,
				selectedId: '',
				users: [],
				tags: [],
				userIds: [],
				layouts: [],
			}
		},
		onLoad() {
			this.layouts = this.getGlobalCustomLayouts();
			let globalUsers = getApp().globalData.hostPageData.users;
			console.log(globalUsers);
			globalUsers.forEach(user => {
				let { userId, customs } = user;
				this.userIds.push(userId);
				if (customs) {
					customs.forEach(custom => {
						this.tags.push(custom.tag);
						this.userIds.push(custom.tag);
					});
				}
			});
			this.users = JSON.parse(JSON.stringify(globalUsers));
		},
		methods: {
			getGlobalCustomLayouts() {
				let layouts = getApp().globalData.hostPageData.customLayouts;
				return JSON.parse(JSON.stringify(layouts));
			},
			fireCustomLayoutsEvent(layouts) {
				uni.$emit('changeLiveMixCustomLayout', layouts);
			},
			createLayout() {
				this.$refs.layoutPopup.open('center');
			},
			onXInput(event) {
				this.x = event.detail.value
			},
			onYInput(event) {
				this.y = event.detail.value
			},
			onWidthInput(event) {
				this.width = event.detail.value
			},
			onHeightInput(event) {
				this.height = event.detail.value;
			},
			deleteLayout(index) {
				this.layouts.splice(index, 1);
			},
			selectUser() {
				this.$refs.userList.show();
			},
			userItemClick(e) {
				let index = e.index;
				this.selectedId = this.userIds[index];
			},
			popupConfirm() {
				if (this.selectedId === '') {
					uni.showToast({
						icon: 'none',
						title: '请选择一个用户/自定义流',
						duration: 2000
					});
					return;
				}
				let { x, y, width, height } = this;
				let layout;
				let selectedUser = this.users.find(user => {
					return user.userId === this.selectedId || user.customs.find(item => item.tag === this.selectedId);
				});
				let userId = selectedUser.userId;
				if (this.tags.includes(this.selectedId)) {
					// 判断选中的自定义流
					layout = { x, y, width, height, userId, tag: this.selectedId, type: RCRTCStreamType.File };
				} else {
					layout = { x, y, width, height, userId };
				}
				let findIndex = this.layouts.findIndex(u => {
					return u.userId === userId && u.tag === layout.tag;
				});
				if (findIndex === -1) {
					// 没有当前的user设置，则添加一个新的
					this.layouts.push(layout);
				} else {
					// 否则更新内容
					this.layouts.splice(findIndex, 1, layout);
				}
				this.popupClose();
			},
			popupClose() {
				this.$refs.layoutPopup.close();
			},
			commit() {
				if (this.layouts.length === 0) {
					uni.showModal({
						title: '提示',
						content: '提交空数据代表取消自定义布局模式',
						success: res => {
							if (res.confirm) {
								this.fireCustomLayoutsEvent(this.layouts);
							} else if (res.cancel) {

							}
						}
					});
				} else {
					this.fireCustomLayoutsEvent(this.layouts);
				}
			}
		}
	}
</script>

<style scoped>
	.buttons {
		width: 100%;
		position: fixed;
		display: flex;
		bottom: 40rpx;
		flex-direction: row;
		justify-content: space-around;
	}

	.popup {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 30rpx;
		margin: 60rpx;
		justify-content: flex-start;
	}

	.popup-title {
		font-size: 40rpx;
	}

	.layoutPopup-userId {
		font-size: 28rpx;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
	}

	.input {
		border: 2rpx solid #D9D9D9;
		margin-left: 20rpx;
	}

	.cell {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx;
		border-bottom: 2rpx solid #D9D9D9;
	}

	.cell-text {
		word-break: break-word;
		margin-right: 20rpx;
	}

	.tip {
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		color: #BEBEBE;
		word-break: break-word;
	}
</style>
