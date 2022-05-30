import {
	RCRTCCamera,
	RCRTCViewFitType,
	RCRTCMediaType,
	RCRTCVideoFps,
	RCRTCVideoResolution
} from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCDefines';

export const modes = [{
	value: 0,
	name: '会议模式'
}, {
	value: 1,
	name: '主播模式'
}, {
	value: 2,
	name: '观众模式'
}];

export const medias = [{
	value: 2,
	name: '音视频模式'
}, {
	value: 0,
	name: '纯音频模式'
}];

export const mediaTypes = [{
		value: RCRTCMediaType.Audio,
		label: '音频',
	},
	{
		value: RCRTCMediaType.Video,
		label: '视频',
	},
	{
		value: RCRTCMediaType.AudioVideo,
		label: '音视频',
	}
]

export const holders = [
	'Meeting Id',
	'Room Id',
	'Room Id',
];

export const actions = [
	'加入会议',
	'开始直播',
	'观看直播',
];

export const pages = [
	'meeting',
	'host',
	'audience',
];


export const audioKbps = [16, 32, 48];

export const minVideoKbps = [200, 300, 500, 700, 900, 1200, 1500, ];

export const maxVideoKbps = [500, 800, 1000, 1200, 2000, 2200, 3500, 4400, 6000, 8000, ];

export const tinyMinVideoKbps = [50, 100, 200, 300, ];

export const tinyMaxVideoKbps = [300, 500, 800, 1000, 1200, ];

export const media = [
	'Audio',
	'Video',
	'Audio & Video',
];

export const fitTypes = [{
		value: RCRTCViewFitType.Center,
		label: '自适应',
	},
	{
		value: RCRTCViewFitType.Cover,
		label: '裁剪',
	},
]

export const networkTypes = {
	0: '未知',
	1: 'WiFi',
	2: 'Mobile',
}

export const beautyOptions = [{
		id: '0',
		text: '滤镜'
	},
	{
		id: '1',
		text: '美白'
	},
	{
		id: '2',
		text: '红润'
	},
	{
		id: '3',
		text: '磨皮'
	},
	{
		id: '4',
		text: '亮度'
	},
]

export const beautyFilters = [{
		id: 0,
		name: '原画'
	},
	{
		id: 1,
		name: '唯美'
	},
	{
		id: 2,
		name: '清新'
	},
	{
		id: 3,
		name: '浪漫'
	}
]


export const audioQualitys = [
	'Speech',
	'Music',
	'MusicHigh'
]

export const audioScenes = [
	'Normal',
	'MusicChatRoom',
	'MusicClassRoom'
]

export const skinBeautyValues = [
	{
		label: '磨皮',
		min: 0.0,
		max: 60,
		value: 0.0,
	},
	{
		label: '美白',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '红润',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '锐化',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '亮眼',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '美牙',
		min: 0.0,
		max: 10,
		value: 0.0,
	}
]

export const faceShapeValues = [
	{
		label: '强度',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '大眼',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '圆眼',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '开眼角',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '瘦脸',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: 'V脸',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '窄脸',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '小脸',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '瘦鼻',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '额头',
		min: 0.0,
		max: 10,
		value: 5,
	},
	{
		label: '嘴巴',
		min: 0.0,
		max: 10,
		value: 5,
	},
	{
		label: '下巴',
		min: 0.0,
		max: 10,
		value: 5,
	},
	{
		label: '去除黑眼圈',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '去除法令纹',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '微笑嘴角',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '人中',
		min: 0.0,
		max: 10,
		value: 5,
	},
	{
		label: '鼻子',
		min: 0.0,
		max: 10,
		value: 5,
	},
	{
		label: '眼睛间距',
		min: 0.0,
		max: 10,
		value: 5,
	},
	{
		label: '眼睛角度',
		min: 0.0,
		max: 10,
		value: 5,
	},
	{
		label: '瘦下颌骨',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
	{
		label: '瘦颧骨',
		min: 0.0,
		max: 10,
		value: 0.0,
	},
]

export const filterBeautyValues = [
	{
		label: '原图',
		min: 0.0,
		max: 10,
		value: 0.0,
		name: 'origin',
	},
	{
		label: '白亮',
		min: 0.0,
		max: 10,
		value: 0.0,
		name: 'bailiang1',
	},
	{
		label: '粉嫩',
		min: 0.0,
		max: 10,
		value: 0.0,
		name: 'fennen1',
	},
	{
		label: '冷色调',
		min: 0.0,
		max: 10,
		value: 0.0,
		name: 'lengsediao1',
	},
	{
		label: '暖色调',
		min: 0.0,
		max: 10,
		value: 0.0,
		name: 'nuansediao1',
	},
	{
		label: '小清新',
		min: 0.0,
		max: 10,
		value: 0.0,
		name: 'xiaoqingxin1',
	}
]

export const skinBlurTypes = [
	{
		label: '清晰',
		value: 0,
	},
	{
		label: '朦胧',
		value: 0,
	},
	{
		label: '精细',
		value: 0,
	}
]