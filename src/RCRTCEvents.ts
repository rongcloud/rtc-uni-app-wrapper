import {
    RCRTCLocalAudioStats,
    RCRTCLocalVideoStats,
    RCRTCNetworkStats,
    RCRTCRemoteAudioStats,
    RCRTCRemoteVideoStats,
    BaseCallback,
    OnAudioEffectCreatedResult,
    OnAudioEffectFinishedResult,
    OnCancelJoinSubRoomRequestReceivedResult,
    OnCustomStreamPublishedResult,
    OnCustomStreamPublishFinishedResult,
    OnCustomStreamSubscribedResult,
    OnCustomStreamUnpublishedResult,
    OnCustomStreamUnsubscribedResult,
    OnCameraEnabledResult,
    OnErrorResult,
    OnJoinSubRoomRequestCanceledResult,
    OnJoinSubRoomRequestedResult,
    OnJoinSubRoomRequestReceivedResult,
    OnJoinSubRoomRequestRespondedResult,
    OnJoinSubRoomRequestResponseReceivedResult,
    OnKickedResult,
    OnLiveCdnAddedResult,
    OnLiveCdnRemovedResult,
    OnLiveMixAudioBitrateSetResult,
    OnLiveMixCustomAudiosSetResult,
    OnLiveMixCustomLayoutsSetResult,
    OnLiveMixLayoutModeSetResult,
    OnLiveMixMemberAudioStatsResult,
    OnLiveMixMemberCustomAudioStatsResult,
    OnLiveMixRenderModeSetResult,
    OnLiveMixSubscribedResult,
    OnLiveMixUnsubscribedResult,
    OnLiveMixVideoBitrateSetResult,
    OnLiveMixVideoFpsSetResult,
    OnLiveMixVideoResolutionSetResult,
    OnLocalCustomAudioStatsResult,
    OnLocalCustomVideoStatsResult,
    OnPublishedResult,
    OnRemoteAudioStatsResult,
    OnRemoteCustomAudioStatsResult,
    OnRemoteCustomStreamFirstFrameResult,
    OnRemoteCustomStreamPublishedResult,
    OnRemoteCustomStreamStateChangedResult,
    OnRemoteCustomStreamUnpublishedResult,
    OnRemoteCustomVideoStatsResult,
    OnRemoteFirstFrameResult,
    OnRemoteLiveMixFirstFrameResult,
    OnRemoteLiveMixPublishedResult,
    OnRemoteLiveMixUnpublishedResult,
    OnRemotePublishedResult,
    OnRemoteStateChangedResult,
    OnRemoteUnpublishedResult,
    OnRemoteVideoStatsResult,
    OnRoomJoinedResult,
    OnRoomLeftResult,
    OnSubRoomBandedResult,
    OnSubRoomDisbandResult,
    OnSubRoomJoinedResult,
    OnSubRoomLeftResult,
    OnSubscribedResult,
    OnCameraSwitchedResult,
    OnUnpublishedResult,
    OnUnsubscribedResult,
    OnUserJoinedResult,
    OnUserLeftResult,
    OnUserOfflineResult,
    OnLiveMixBackgroundColorSetResult,
} from "./RCRTCDefines";

/* ?????????????????? */
export interface RCRTCEngineEventsInterface {
    /**
     * ??????????????????????????????
     *
     * @param {CodeWithMessageCallback} [callback] ???????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnErrorListener(callback?: BaseCallback<OnErrorResult>): void;

    /**
     * ?????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnKickedListener(callback?: BaseCallback<OnKickedResult>): void;
    /**
     * ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnRoomJoinedListener(callback?: BaseCallback<OnRoomJoinedResult>): void;
    /**
     * ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnRoomLeftListener(callback?: BaseCallback<OnRoomLeftResult>): void;
    /**
     * ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnPublishedListener(callback?: BaseCallback<OnPublishedResult>): void;
    /**
     * ????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnUnpublishedListener(callback?: BaseCallback<OnUnpublishedResult>): void;
    /**
     * ?????????????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnSubscribedListener(callback?: BaseCallback<OnSubscribedResult>): void;
    /**
     * ???????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnUnsubscribedListener(callback?: BaseCallback<OnUnsubscribedResult>): void;
    /**
     * ??????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveMixSubscribedListener(callback?: BaseCallback<OnLiveMixSubscribedResult>): void;
    /**
     * ????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveMixUnsubscribedListener(callback?: BaseCallback<OnLiveMixUnsubscribedResult>): void;
    /**
     * ???????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnCameraEnabledListener(callback?: BaseCallback<OnCameraEnabledResult>): void;
    /**
     * ????????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnCameraSwitchedListener(callback?: BaseCallback<OnCameraSwitchedResult>): void;
    /**
     * ??????????????????URL????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveCdnAddedListener(callback?: BaseCallback<OnLiveCdnAddedResult>): void;
    /**
     * ??????????????????URL????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveCdnRemovedListener(callback?: BaseCallback<OnLiveCdnRemovedResult>): void;
    /**
     * ????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveMixLayoutModeSetListener(callback?: BaseCallback<OnLiveMixLayoutModeSetResult>): void;
    /**
     * ??????????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveMixRenderModeSetListener(callback?: BaseCallback<OnLiveMixRenderModeSetResult>): void;
    /**
     * ??????????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveMixBackgroundColorSetListener(callback?: BaseCallback<OnLiveMixBackgroundColorSetResult>): void;
    /**
     * ????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveMixCustomAudiosSetListener(callback?: BaseCallback<OnLiveMixCustomAudiosSetResult>): void;
    /**
     * ???????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveMixCustomLayoutsSetListener(callback?: BaseCallback<OnLiveMixCustomLayoutsSetResult>): void;
    /**
     * ????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveMixAudioBitrateSetListener(callback?: BaseCallback<OnLiveMixAudioBitrateSetResult>): void;
    /**
     * ??????????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveMixVideoBitrateSetListener(callback?: BaseCallback<OnLiveMixVideoBitrateSetResult>): void;
    /**
     * ???????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveMixVideoResolutionSetListener(callback?: BaseCallback<OnLiveMixVideoResolutionSetResult>): void;
    /**
     * ????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLiveMixVideoFpsSetListener(callback?: BaseCallback<OnLiveMixVideoFpsSetResult>): void;
    /**
     * ????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnAudioEffectCreatedListener(callback?: BaseCallback<OnAudioEffectCreatedResult>): void;
    /**
     * ??????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnAudioEffectFinishedListener(callback?: BaseCallback<OnAudioEffectFinishedResult>): void;
    /**
     * ??????????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnAudioMixingStartedListener(callback?: BaseCallback<void>): void;
    /**
     * ??????????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnAudioMixingPausedListener(callback?: BaseCallback<void>): void;
    /**
     * ????????????????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnAudioMixingStoppedListener(callback?: BaseCallback<void>): void;
    /**
     * ????????????????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnAudioMixingFinishedListener(callback?: BaseCallback<void>): void;
    /**
     * ????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnUserJoinedListener(callback?: BaseCallback<OnUserJoinedResult>): void;
    /**
     * ?????????????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnUserOfflineListener(callback?: BaseCallback<OnUserOfflineResult>): void;
    /**
     * ????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnUserLeftListener(callback?: BaseCallback<OnUserLeftResult>): void;
    /**
     * ????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnRemotePublishedListener(callback?: BaseCallback<OnRemotePublishedResult>): void;
    /**
     * ??????????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnRemoteUnpublishedListener(callback?: BaseCallback<OnRemoteUnpublishedResult>): void;
    /**
     * ??????????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnRemoteLiveMixPublishedListener(callback?: BaseCallback<OnRemoteLiveMixPublishedResult>): void;
    /**
     * ????????????????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnRemoteLiveMixUnpublishedListener(callback?: BaseCallback<OnRemoteLiveMixUnpublishedResult>): void;
    /**
     * ???????????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnRemoteStateChangedListener(callback?: BaseCallback<OnRemoteStateChangedResult>): void;
    /**
     * ?????????????????????????????????????????????????????????, ?????????????????????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnRemoteFirstFrameListener(callback?: BaseCallback<OnRemoteFirstFrameResult>): void;
    /**
     * ?????????????????????????????????????????????????????????, ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnRemoteLiveMixFirstFrameListener(callback?: BaseCallback<OnRemoteLiveMixFirstFrameResult>): void;
    /**
     * ????????????????????????????????????????????????
     *
     * @param {BaseCallback<OnCustomStreamPublishedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnCustomStreamPublishedListener(callback?: BaseCallback<OnCustomStreamPublishedResult>): void;
    /**
     * ??????????????????????????????????????????????????????
     *
     * @param {BaseCallback<OnCustomStreamUnpublishedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnCustomStreamUnpublishedListener(callback?: BaseCallback<OnCustomStreamUnpublishedResult>): void;
    /**
     * ????????????????????????????????????
     *
     * @param {BaseCallback<OnCustomStreamPublishFinishedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnCustomStreamPublishFinishedListener(callback?: BaseCallback<OnCustomStreamPublishFinishedResult>): void;
    /**
     * ??????????????????????????????????????????, ?????????????????????????????????????????????
     *
     * @param {BaseCallback<OnRemoteCustomStreamPublishedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnRemoteCustomStreamPublishedListener(callback?: BaseCallback<OnRemoteCustomStreamPublishedResult>): void;
    /**
     * ????????????????????????????????????????????????, ?????????????????????????????????????????????
     *
     * @param {BaseCallback<OnRemoteCustomStreamUnpublishedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnRemoteCustomStreamUnpublishedListener(callback?: BaseCallback<OnRemoteCustomStreamUnpublishedResult>): void;
    /**
     * ??????????????????????????????????????????
     *
     * @param {BaseCallback<OnRemoteCustomStreamStateChanged>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnRemoteCustomStreamStateChangedListener(callback?: BaseCallback<OnRemoteCustomStreamStateChangedResult>): void;
    /**
     * ??????????????????????????????????????????????????????, ?????????????????????????????????????????????
     *
     * @param {BaseCallback<OnRemoteCustomStreamFirstFrameResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnRemoteCustomStreamFirstFrameListener(callback?: BaseCallback<OnRemoteCustomStreamFirstFrameResult>): void;
    /**
     * ???????????????????????????????????????????????????, ?????????????????????????????????????????????
     *
     * @param {BaseCallback<OnCustomStreamSubscribedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnCustomStreamSubscribedListener(callback?: BaseCallback<OnCustomStreamSubscribedResult>): void;
    /**
     * ?????????????????????????????????????????????????????????, ?????????????????????????????????????????????
     *
     * @param {BaseCallback<OnCustomStreamUnsubscribedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnCustomStreamUnsubscribedListener(callback?: BaseCallback<OnCustomStreamUnsubscribedResult>): void;
    /**
     * ???????????????????????????, ??????????????????????????????
     *
     * @param {BaseCallback<OnJoinSubRoomRequestedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnJoinSubRoomRequestedListener(callback?: BaseCallback<OnJoinSubRoomRequestedResult>): void;
    /**
     * ?????????????????????????????????, ??????????????????????????????
     *
     * @param {BaseCallback<OnJoinSubRoomRequestCanceledResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnJoinSubRoomRequestCanceledListener(callback?: BaseCallback<OnJoinSubRoomRequestCanceledResult>): void;
    /**
     * ?????????????????????????????????, ??????????????????????????????
     *
     * @param {BaseCallback<OnJoinSubRoomRequestRespondedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnJoinSubRoomRequestRespondedListener(callback?: BaseCallback<OnJoinSubRoomRequestRespondedResult>): void;
    /**
     * ????????????????????????, ??????????????????????????????
     *
     * @param {BaseCallback<OnJoinSubRoomRequestReceivedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnJoinSubRoomRequestReceivedListener(callback?: BaseCallback<OnJoinSubRoomRequestReceivedResult>): void;
    /**
     * ??????????????????????????????, ??????????????????????????????
     *
     * @param {BaseCallback<OnCancelJoinSubRoomRequestReceivedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnCancelJoinSubRoomRequestReceivedListener(callback?: BaseCallback<OnCancelJoinSubRoomRequestReceivedResult>): void;
    /**
     * ?????????????????????????????? ??????????????????????????????
     *
     * @param {BaseCallback<OnJoinSubRoomRequestResponseReceivedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnJoinSubRoomRequestResponseReceivedListener(callback?: BaseCallback<OnJoinSubRoomRequestResponseReceivedResult>): void;
    /**
     * ?????????????????????, ??????????????????????????????
     *
     * @param {BaseCallback<OnSubRoomJoinedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnSubRoomJoinedListener(callback?: BaseCallback<OnSubRoomJoinedResult>): void;
    /**
     * ?????????????????????, ??????????????????????????????
     *
     * @param {BaseCallback<OnSubRoomLeftResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnSubRoomLeftListener(callback?: BaseCallback<OnSubRoomLeftResult>): void;
    /**
     * ???????????????????????????, ??????????????????????????????
     *
     * @param {BaseCallback<OnSubRoomBandedResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnSubRoomBandedListener(callback?: BaseCallback<OnSubRoomBandedResult>): void;
    /**
     * ???????????????????????????, ??????????????????????????????
     *
     * @param {BaseCallback<OnSubRoomDisbandResult>} [callback]
     * @memberof RCRTCStatsEventsInterface
     */
    setOnSubRoomDisbandListener(callback?: BaseCallback<OnSubRoomDisbandResult>): void;

}

export interface RCRTCStatsEventsInterface {
    /**
     * ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnNetworkStatsListener(callback?: BaseCallback<RCRTCNetworkStats>): void;
    /**
    * ??????????????????????????????
    * @param callback ??????????????????????????????????????????????????????????????????
    * @memberof RCRTCEngineEventsInterface
    */
    setOnLocalAudioStatsListener(callback?: BaseCallback<RCRTCLocalAudioStats>): void;
    /**
     * ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnLocalVideoStatsListener(callback?: BaseCallback<RCRTCLocalVideoStats>): void;
    /**
     * ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnRemoteAudioStatsListener(callback?: BaseCallback<OnRemoteAudioStatsResult>): void;
    /**
     * ??????????????????????????????
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCEngineEventsInterface
     */
    setOnRemoteVideoStatsListener(callback?: BaseCallback<OnRemoteVideoStatsResult>): void;
    /**
     * ????????????????????????????????????
     *
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCStatsEventsInterface
     */
    setOnLiveMixAudioStatsListener(callback?: BaseCallback<RCRTCRemoteAudioStats>): void;
    /**
     * ????????????????????????????????????
     *
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCStatsEventsInterface
     */
    setOnLiveMixVideoStatsListener(callback?: BaseCallback<RCRTCRemoteVideoStats>): void;
    /**
     * ????????????????????????????????????
     *
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCStatsEventsInterface
     */
    setOnLiveMixMemberAudioStatsListener(callback?: BaseCallback<OnLiveMixMemberAudioStatsResult>): void;
    /**
     * ?????????????????????????????????????????????
     *
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCStatsEventsInterface
     */
    setOnLiveMixMemberCustomAudioStatsListener(callback?: BaseCallback<OnLiveMixMemberCustomAudioStatsResult>): void;
    /**
     * ???????????????????????????????????????
     *
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCStatsEventsInterface
     */
    setOnLocalCustomAudioStatsListener(callback?: BaseCallback<OnLocalCustomAudioStatsResult>): void;
    /**
     * ???????????????????????????????????????
     *
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCStatsEventsInterface
     */
    setOnLocalCustomVideoStatsListener(callback?: BaseCallback<OnLocalCustomVideoStatsResult>): void;
    /**
     * ???????????????????????????????????????
     *
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCStatsEventsInterface
     */
    setOnRemoteCustomAudioStatsListener(callback?: BaseCallback<OnRemoteCustomAudioStatsResult>): void;
    /**
     * ???????????????????????????????????????
     *
     * @param callback ??????????????????????????????????????????????????????????????????
     * @memberof RCRTCStatsEventsInterface
     */
    setOnRemoteCustomVideoStatsListener(callback?: BaseCallback<OnRemoteCustomVideoStatsResult>): void;


}