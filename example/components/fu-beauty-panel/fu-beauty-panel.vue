<template>
	<view class="popup">
		<view class="container">
			<view class="title">
				<view class="title-text-view">
					<text class="title-text" :class="{'selected': currentBeautyIndex === 0 }"
						@click="clickSkin">美肤</text>
					<text class="title-text" :class="{'selected': currentBeautyIndex === 1 }"
						@click="clickModel">美型</text>
					<text class="title-text" :class="{'selected': currentBeautyIndex === 2 }"
						@click="clickFilter">滤镜</text>
					<text class="title-text" :class="{'selected': currentBeautyIndex === 3 }"
						@click="clickOther">其他</text>
					<switch class="switch" :checked="beautyEnable" @change="changeBeautyEnable" />
				</view>
				<button @click="clickClose">
					<text style="font-size: 40rpx;">X</text>
				</button>
			</view>
			<view v-if="currentBeautyIndex != 3">
				<slider :key="currentBeautyValue.label" :value="currentBeautyValue.value" :min="currentBeautyValue.min"
					:max="currentBeautyValue.max" step="1" backgroundColor="#BEBEBE" activeColor="#465CFF"
					block-color="#465CFF" block-size="20" @change="e => changeValue(e)" />
			</view>
			<view class="value-container" v-for="index in [0,1,2]" :key="index">
				<scroll-view class="value-list" scroll-y="true" show-scrollbar="true" v-if="currentBeautyIndex === index">
					<view class="value-item" v-for="(v,index) in currentBeautyValues" :key="v.label">
						<view class="value-button" :class="{'value-button-selected': index === currentBeautyValueIndex}"
							@click="() => clickValueItem(v, index)">
							<view>
								<text style="font-size: 24rpx;">{{v.value/10}}</text>
							</view>
							<view>
								<text class="text" style="font-size: 30rpx;">{{v.label}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-if="currentBeautyIndex === 3" style="margin-left: 20rpx;">
				<text style="font-size: 36rpx;">磨皮类型</text>
				<view class="uni-row" style="margin-top: 20rpx;">
					<view class="value-button" :class="{'value-button-selected': index === currentSkinBlurType}"
						v-for="(blurType,index) in skinBlurTypes" :key="blurType.label">
						<text style="font-size: 30rpx;"
							@click="() => clickSkinBlurType(index)">{{blurType.label}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import * as Constants from '../../common/constants.js';
	import RCFUBeautyEngine from '@/uni_modules/RongCloud-FUBeautyWrapper/lib/RCFUBeautyEngine';
	import * as config from '../../common/config.js';

	export default {
		emits: ['close'],
		data() {
			return {
				skinBeautyValues: [],
				faceShapeValues: [],
				filterBeautyValues: [],
				skinBlurTypes: [],
				currentBeautyIndex: 0,
				currentBeautyValue: null,
				currentBeautyValueIndex: 0,
				currentSkinBlurType: 0,
				beautyEnable: false,

			}
		},
		created() {
			this.skinBlurTypes = Constants.skinBlurTypes;
			this.currentSkinBlurType = getApp().globalData.fuBeautyData.currentSkinBlurType;
			let fuBeautyData = getApp().globalData.fuBeautyData;
			if (fuBeautyData.skinBeautyValues) {
				this.skinBeautyValues = fuBeautyData.skinBeautyValues;
			} else {
				this.skinBeautyValues = JSON.parse(JSON.stringify(Constants.skinBeautyValues));
			}
			if (fuBeautyData.faceShapeValues) {
				this.faceShapeValues = fuBeautyData.faceShapeValues;
			} else {
				this.faceShapeValues = JSON.parse(JSON.stringify(Constants.faceShapeValues));
			}
			if (fuBeautyData.filterBeautyValues) {
				this.filterBeautyValues = fuBeautyData.filterBeautyValues;
			} else {
				this.filterBeautyValues = JSON.parse(JSON.stringify(Constants.filterBeautyValues));
			}
			this.currentBeautyValue = this.currentBeautyValues[this.currentBeautyValueIndex];
			this.beautyEnable = this.getBeautyEnable();
			// 设置默认的磨皮类型
			RCFUBeautyEngine.setSkinBlurOption(this.currentSkinBlurType, true, 0.45);
		},
		mounted() {
			console.log('mounted');
		},
		computed: {
			currentBeautyValues: function() {
				switch (this.currentBeautyIndex) {
					case 0:
						return this.skinBeautyValues;
					case 1:
						return this.faceShapeValues;
					case 2:
						return this.filterBeautyValues;
					default:
						return this.skinBeautyValues;
				}
			},
		},
		methods: {
			clickSkin() {
				this.currentBeautyIndex = 0;
				this.currentBeautyValue = this.currentBeautyValues[0];
				this.currentBeautyValueIndex = 0;
			},
			clickModel() {
				this.currentBeautyIndex = 1;
				this.currentBeautyValue = this.currentBeautyValues[0];
				this.currentBeautyValueIndex = 0;
			},
			clickFilter() {
				this.currentBeautyIndex = 2;
				this.currentBeautyValue = this.currentBeautyValues[0];
				this.currentBeautyValueIndex = 0;
			},
			clickOther() {
				this.currentBeautyIndex = 3;
			},
			clickClose() {
				this.$emit('close');
			},
			changeBeautyEnable(e) {
				let value = e.detail.value;
				console.log('beautyEnable', value);
				this.setBeautyEnable(value);
			},
			clickValueItem(v, index) {
				console.log(v, index);
				this.currentBeautyValue = v;
				this.currentBeautyValueIndex = index;
			},
			clickSkinBlurType(index) {
				if (!this.beautyEnable) {
					return;
				}
				this.currentSkinBlurType = index;
				getApp().globalData.fuBeautyData.currentSkinBlurType = index;
				RCFUBeautyEngine.setSkinBlurOption(index, true, 0.45);
			},
			changeValue(e) {
				if (!this.beautyEnable) {
					return;
				}
				let value = e.detail.value;
				if (this.currentBeautyIndex === 2) {
					this.currentBeautyValues.forEach((v) => {
						v.value = 0;
					})
				}
				let index = this.currentBeautyValueIndex;
				let current = this.currentBeautyValues[index];
				current.value = value;
				this.currentBeautyValues.slice(current, index);
				this.saveValues();
				let setValue = value / 10.0;
				this.callMethod(current, setValue);
			},
			callMethod(data, value) {
				let label = data.label;
				console.log(label, value);
				if (this.currentBeautyIndex === 2) {
					let name = data.name;
					RCFUBeautyEngine.setFilter(name, value);
					return;
				}
				switch (label) {
					case '磨皮':
						RCFUBeautyEngine.setSkinBlurLevel(value);
						break;
					case '美白':
						RCFUBeautyEngine.setSkinWhitenLevel(value);
						break;
					case '红润':
						RCFUBeautyEngine.setSkinRedLevel(value);
						break;
					case '锐化':
						RCFUBeautyEngine.setSharpenLevel(value);
						break;
					case '亮眼':
						RCFUBeautyEngine.setEyeBrightLevel(value);
						break;
					case '美牙':
						RCFUBeautyEngine.setToothWhitenLevel(value);
						break;
					case '强度':
						RCFUBeautyEngine.setFaceShape(4);
						RCFUBeautyEngine.setFaceShapeChangeFrames(15);
						RCFUBeautyEngine.setFaceShapeLevel(value);
						break;
					case '大眼':
						RCFUBeautyEngine.setEyeEnlargingLevel(value);
						break;
					case '圆眼':
						RCFUBeautyEngine.setEyeCircleLevel(value);
						break;
					case '瘦脸':
						RCFUBeautyEngine.setCheekThinningLevel(value);
						break;
					case 'V脸':
						RCFUBeautyEngine.setCheekVLevel(value);
						break;
					case '窄脸':
						RCFUBeautyEngine.setCheekNarrowLevel(value);
						break;
					case '小脸':
						RCFUBeautyEngine.setCheekSmallLevel(value);
						break;
					case '瘦鼻':
						RCFUBeautyEngine.setNoseIntensity(value);
						break;
					case '额头':
						RCFUBeautyEngine.setForeheadIntensity(value);
						break;
					case '嘴巴':
						RCFUBeautyEngine.setMouthIntensity(value);
						break;
					case '下巴':
						RCFUBeautyEngine.setChinIntensity(value);
						break;
					case '去除黑眼圈':
						RCFUBeautyEngine.setRemovePouchIntensity(value);
						break;
					case '去除法令纹':
						RCFUBeautyEngine.setRemoveNasalLinesIntensity(value);
						break;
					case '开眼角':
						RCFUBeautyEngine.setEpicanthoplastyIntensity(value);
						break;
					case '微笑嘴角':
						RCFUBeautyEngine.setSmileIntensity(value);
						break;
					case '人中':
						RCFUBeautyEngine.setPhiltrumIntensity(value);
						break;
					case '鼻子':
						RCFUBeautyEngine.setNoseLengthIntensity(value);
						break;
					case '眼睛间距':
						RCFUBeautyEngine.setEyeSpaceIntensity(value);
						break;
					case '眼睛角度':
						RCFUBeautyEngine.setEyeRotateIntensity(value);
						break;
					case '瘦下颌骨':
						RCFUBeautyEngine.setJawThinningLevel(value);
						break;
					case '瘦颧骨':
						RCFUBeautyEngine.setCheekbonesThinningLevel(value);
						break;
				}
			},
			setBeautyEnable(enable) {
				RCFUBeautyEngine.setBeautyEnable(enable);
				this.beautyEnable = enable;
				getApp().globalData.fuBeautyData.enable = enable;
			},
			getBeautyEnable() {
				return getApp().globalData.fuBeautyData.enable === true;
			},
			saveValues() {
				let fuBeautyData = getApp().globalData.fuBeautyData;
				switch (this.currentBeautyIndex) {
					case 0:
						fuBeautyData.skinBeautyValues = this.skinBeautyValues;
						break;
					case 1:
						fuBeautyData.faceShapeValues = this.faceShapeValues;
						break;
					case 2:
						fuBeautyData.filterBeautyValues = this.filterBeautyValues;
						break;
				}
			},
			resetValues() {
				this.skinBeautyValues = JSON.parse(JSON.stringify(Constants.skinBeautyValues));
				this.faceShapeValues = JSON.parse(JSON.stringify(Constants.faceShapeValues));
				this.filterBeautyValues = JSON.parse(JSON.stringify(Constants.filterBeautyValues));
				getApp().globalData.fuBeautyData.skinBeautyValues = null;
				getApp().globalData.fuBeautyData.faceShapeValues = null;
				getApp().globalData.fuBeautyData.filterBeautyValues = null;
				getApp().globalData.fuBeautyData.currentSkinBlurType = 0;
				this.currentSkinBlurType = 0;
			},
		}
	}
</script>

<style>
	.popup {
		position: fixed;
		flex: 1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.container {
		display: flex;
		position: fixed;
		height: 700rpx;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		border-top: 2rpx solid #999999;
		padding: 20rpx;
	}

	.title {
		flex-direction: row;
		justify-content: space-between;
		height: 80rpx;
		background-color: #FFFFFF;
	}

	.title-text-view {
		display: flex;
		flex: 1;
		flex-direction: row;
		align-items: center;
	}

	.title-text {
		font-size: 40rpx;
		margin-left: 20rpx;
		color: #999999;
	}

	.selected {
		color: #007AFF;
	}

	.switch {
		margin-left: 20rpx;
	}

	.value-list {
		display: flex;
		flex-direction: row; 
		flex-wrap: wrap;
		height: 440rpx;
		overflow: hidden;
	}

	.value-item {
		margin-top: 20rpx;
		padding-top: 10rpx;
	}

	.value-item-silder {
		width: 600rpx;
	}

	.value-button {
		flex-direction: column;
		margin-right: 20rpx;
		background-color: #e6e6e6;
		align-items: center;
		padding: 10rpx;
	}

	.value-button-selected {
		background-color: #007AFF;
	}
</style>
