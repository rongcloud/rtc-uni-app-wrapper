<template>
	<view></view>
</template>

<script>
	import RCRTCEngine from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCEngine'
	import {
		RCRTCEngineEventsName,
		RCRTCStatsEventsName
	} from '@/uni_modules/RongCloud-RTCWrapper/lib/RCRTCDefines';

	export default {
		created() {
			console.log('nativeListener created');
			this.addListeners();
		},
		onLoad() {
			console.log('nativeListener onLoad');
		},
		onUnload() {
			// 设置callback为空，代表移除原生事件的监听
			RCRTCEngine.setOnErrorListener();
			RCRTCEngine.setOnKickedListener();
			RCRTCEngine.setOnRoomJoinedListener();
			RCRTCEngine.setOnRoomLeftListener();
			RCRTCEngine.setOnPublishedListener();
			RCRTCEngine.setOnUnpublishedListener();
			RCRTCEngine.setOnSubscribedListener();
			RCRTCEngine.setOnUnsubscribedListener();
		},
		methods: {
			addListeners() {
				RCRTCEngine.setOnErrorListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnError, res);
				});
				RCRTCEngine.setOnKickedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnKicked, res);
				});
				RCRTCEngine.setOnRoomJoinedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRoomJoined, res);
				});
				RCRTCEngine.setOnRoomLeftListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRoomLeft, res);
				});
				RCRTCEngine.setOnPublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnPublished, res);
				});
				RCRTCEngine.setOnUnpublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnUnpublished, res);
				});
				RCRTCEngine.setOnSubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnSubscribed, res);
				});
				RCRTCEngine.setOnUnsubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnUnsubscribed, res);
				});
				RCRTCEngine.setOnLiveMixSubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixSubscribed, res);
				});
				RCRTCEngine.setOnLiveMixUnsubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixUnsubscribed, res);
				});
				RCRTCEngine.setOnEnableCameraListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnEnableCamera, res);
				});
				RCRTCEngine.setOnSwitchCameraListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnSwitchCamera, res);
				});
				RCRTCEngine.setOnLiveCdnAddedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveCdnAdded, res);
				});
				RCRTCEngine.setOnLiveCdnRemovedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveCdnRemoved, res);
				});
				RCRTCEngine.setOnLiveMixLayoutModeSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixLayoutModeSet, res);
				});
				RCRTCEngine.setOnLiveMixRenderModeSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixRenderModeSet, res);
				});
				RCRTCEngine.setOnLiveMixCustomAudiosSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixCustomAudiosSet, res);
				});
				RCRTCEngine.setOnLiveMixCustomLayoutsSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixCustomLayoutsSet, res);
				});
				RCRTCEngine.setOnLiveMixAudioBitrateSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixAudioBitrateSet, res);
				});
				RCRTCEngine.setOnLiveMixVideoBitrateSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixVideoBitrateSet, res);
				});
				RCRTCEngine.setOnLiveMixVideoResolutionSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixVideoResolutionSet, res);
				});
				RCRTCEngine.setOnLiveMixVideoFpsSetListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnLiveMixVideoFpsSet, res);
				});
				RCRTCEngine.setOnAudioEffectCreatedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioEffectCreated, res);
				});
				RCRTCEngine.setOnAudioEffectFinishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioEffectFinished, res);
				});
				RCRTCEngine.setOnAudioMixingStartedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioMixingStarted, res);
				});
				RCRTCEngine.setOnAudioMixingPausedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioMixingPaused, res);
				});
				RCRTCEngine.setOnAudioMixingStoppedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioMixingStopped, res);
				});
				RCRTCEngine.setOnAudioMixingFinishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnAudioMixingFinished, res);
				});
				RCRTCEngine.setOnUserJoinedListener((res) => {
					// 远端用户 userId
					let { userId } = res;
					uni.$emit(RCRTCEngineEventsName.OnUserJoined, res);
				});
				RCRTCEngine.setOnUserOfflineListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnUserOffline, res);
				});
				RCRTCEngine.setOnUserLeftListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnUserLeft, res);
				});
				RCRTCEngine.setOnRemotePublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemotePublished, res);
				});
				RCRTCEngine.setOnRemoteUnpublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteUnpublished, res);
				});
				RCRTCEngine.setOnRemoteLiveMixPublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteLiveMixPublished, res);
				});
				RCRTCEngine.setOnRemoteLiveMixUnpublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteLiveMixUnpublished, res);
				});
				RCRTCEngine.setOnRemoteStateChangedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteStateChanged, res);
				});
				RCRTCEngine.setOnRemoteFirstFrameListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteFirstFrame, res);
				});
				RCRTCEngine.setOnRemoteLiveMixFirstFrameListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteLiveMixFirstFrame, res);
				});

				RCRTCEngine.setOnCustomStreamPublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCustomStreamPublished, res);
				});
				RCRTCEngine.setOnCustomStreamUnpublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCustomStreamUnpublished, res);
				});
				RCRTCEngine.setOnRemoteCustomStreamPublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteCustomStreamPublished, res);
				});
				RCRTCEngine.setOnRemoteCustomStreamUnpublishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnRemoteCustomStreamUnpublished, res);
				});
				RCRTCEngine.setOnCustomStreamSubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCustomStreamSubscribed, res);
				});
				RCRTCEngine.setOnCustomStreamUnsubscribedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCustomStreamUnsubscribed, res);
				});
				RCRTCEngine.setOnCustomStreamPublishFinishedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCustomStreamPublishFinished, res);
				});
				RCRTCEngine.setOnJoinSubRoomRequestedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnJoinSubRoomRequested, res);
				});
				RCRTCEngine.setOnJoinSubRoomRequestCanceledListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnJoinSubRoomRequestCanceled, res);
				});
				RCRTCEngine.setOnJoinSubRoomRequestRespondedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnJoinSubRoomRequestResponded, res);
				});
				RCRTCEngine.setOnJoinSubRoomRequestReceivedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnJoinSubRoomRequestReceived, res);
				});
				RCRTCEngine.setOnCancelJoinSubRoomRequestReceivedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnCancelJoinSubRoomRequestReceived, res);
				});
				RCRTCEngine.setOnJoinSubRoomRequestResponseReceivedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnJoinSubRoomRequestResponseReceived, res);
				});
				RCRTCEngine.setOnSubRoomJoinedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnSubRoomJoined, res);
				});
				RCRTCEngine.setOnSubRoomLeftListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnSubRoomLeft, res);
				});
				RCRTCEngine.setOnSubRoomBandedListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnSubRoomBanded, res);
				});
				RCRTCEngine.setOnSubRoomDisbandListener((res) => {
					uni.$emit(RCRTCEngineEventsName.OnSubRoomDisband, res);
				});
				
				// 状态监听
				RCRTCEngine.setOnNetworkStatsListener((res) => {
					let { type, ip, sendBitrate, receiveBitrate, rtt } = res;
					uni.$emit(RCRTCStatsEventsName.OnNetworkStats, res);
				});
				RCRTCEngine.setOnLocalAudioStatsListener((res) => {
					let { codec, bitrate, volume, packageLostRate, rtt } = res;
					uni.$emit(RCRTCStatsEventsName.OnLocalAudioStats, res);
				});
				RCRTCEngine.setOnLocalVideoStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnLocalVideoStats, res);
				});
				RCRTCEngine.setOnRemoteAudioStatsListener((res) => {
					// 详情请查看 OnRemoteAudioStatsData 的定义
					uni.$emit(RCRTCStatsEventsName.OnRemoteAudioStats, res);
				});
				RCRTCEngine.setOnRemoteVideoStatsListener((res) => {
					// 详情请查看 OnRemoteVideoStatsData 的定义
					uni.$emit(RCRTCStatsEventsName.OnRemoteVideoStats, res);
				});
				RCRTCEngine.setOnLiveMixAudioStatsListener((res) => {
					// res 详情请查看 RCRTCRemoteAudioStats 的定义
					uni.$emit(RCRTCStatsEventsName.OnLiveMixAudioStats, res);
				});
				RCRTCEngine.setOnLiveMixVideoStatsListener((res) => {
					// res 详情请查看 RCRTCRemoteVideoStats 的定义
					uni.$emit(RCRTCStatsEventsName.OnLiveMixVideoStats, res);
				});
				RCRTCEngine.setOnLiveMixMemberAudioStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnLiveMixMemberAudioStats, res);
				});
				RCRTCEngine.setOnLiveMixMemberCustomAudioStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnLiveMixMemberCustomAudioStats, res);
				});
				RCRTCEngine.setOnLocalCustomAudioStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnLocalCustomAudioStats, res);
				});
				RCRTCEngine.setOnLocalCustomVideoStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnLocalCustomVideoStats, res);
				});
				RCRTCEngine.setOnRemoteCustomAudioStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnRemoteCustomAudioStats, res);
				});
				RCRTCEngine.setOnRemoteCustomVideoStatsListener((res) => {
					uni.$emit(RCRTCStatsEventsName.OnRemoteCustomVideoStats, res);
				});
			}
		}
	}
</script>

<style>
</style>
