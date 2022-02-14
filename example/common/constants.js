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

export const mediaTypes = [
	{
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

export const minVideoKbps = [300, 500, 700, 900, 1200, 1500,];

export const maxVideoKbps = [2000, 2200, 3500, 4400, 6000, 8000,];

export const tinyMinVideoKbps = [50, 100, 200, 300,];

export const tinyMaxVideoKbps = [300,500,800,1000,1200,];

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
