import {
    RCRTCAudioConfig,
    RCRTCCustomLayout,
    RCRTCEngineSetup,
    RCRTCLocalAudioStats,
    RCRTCLocalVideoStats,
    RCRTCNetworkStats,
    RCRTCRemoteAudioStats,
    RCRTCRemoteVideoStats,
    RCRTCRoomSetup,
    RCRTCVideoConfig,
    RCRTCAudioMixingMode,
    RCRTCCamera,
    RCRTCCameraCaptureOrientation,
    RCRTCLiveMixLayoutMode,
    RCRTCLiveMixRenderMode,
    RCRTCMediaType,
    RCRTCVideoFps,
    RCRTCVideoResolution,
    RCRTCEngineEventsName,
    RCRTCStatsEventsName,
    OnAudioEffectCreatedResult,
    OnAudioEffectFinishedResult,
    OnCancelJoinSubRoomRequestReceivedResult,
    OnCustomStreamPublishedResult,
    OnCustomStreamPublishFinishedResult,
    OnCustomStreamSubscribedResult,
    OnCustomStreamUnpublishedResult,
    OnCustomStreamUnsubscribedResult,
    OnEnableCameraResult,
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
    OnSwitchCameraResult,
    OnUnpublishedResult,
    OnUnsubscribedResult,
    OnUserJoinedResult,
    OnUserLeftResult,
    OnUserOfflineResult,
    OnRemoteCustomStreamStateChangedResult
} from './RCRTCDefines';

import {
    RCRTCEngineEventsInterface,
    RCRTCStatsEventsInterface,
} from './RCRTCEvents';

const RCUniRtc = uni.requireNativePlugin('RongCloud-RTC-RCUniRtc');
const Platform = uni.getSystemInfoSync().platform;
const EngineEventsPrefix = 'Engine:'
const StatsEventsPrefix = 'Stats:'
class RCRTCEngineImpl implements
    RCRTCEngineInterface,
    RCRTCEngineEventsInterface,
    RCRTCStatsEventsInterface {

    init(setup: RCRTCEngineSetup): void {
        RCUniRtc.init(setup);
    }
    unInit(): void {
        RCUniRtc.unInit();
    }
    joinRoom(roomId: string, setup: RCRTCRoomSetup): number {
        return RCUniRtc.joinRoom(roomId, setup);
    }
    leaveRoom(): number {
        return RCUniRtc.leaveRoom();
    }
    publish(type: RCRTCMediaType): number {
        return RCUniRtc.publish(type);
    }
    unpublish(type: RCRTCMediaType): number {
        return RCUniRtc.unpublish(type);
    }
    subscribe(userId: string, type: RCRTCMediaType, tiny: true): number {
        return RCUniRtc.subscribe(userId, type, tiny);
    }
    subscribes(userIds: string[], type: RCRTCMediaType, tiny: true): number {
        return RCUniRtc.subscribe(userIds, type, tiny);
    }
    unsubscribe(userId: string, type: RCRTCMediaType): number {
        return RCUniRtc.unsubscribe(userId, type);
    }
    unsubscribes(userIds: string[], type: RCRTCMediaType): number {
        return RCUniRtc.unsubscribes(userIds, type);
    }
    subscribeLiveMix(type: RCRTCMediaType, tiny: true): number {
        return RCUniRtc.subscribeLiveMix(type, tiny);
    }
    unsubscribeLiveMix(type: RCRTCMediaType): number {
        return RCUniRtc.unsubscribeLiveMix(type);
    }
    setAudioConfig(config: RCRTCAudioConfig): number {
        return RCUniRtc.setAudioConfig(config);
    }
    setVideoConfig(config: RCRTCVideoConfig, tiny: false): number {
        return RCUniRtc.setVideoConfig(config, tiny);
    }
    enableMicrophone(enable: boolean): number {
        return RCUniRtc.enableMicrophone(enable);
    }
    enableSpeaker(enable: boolean): number {
        return RCUniRtc.enableSpeaker(enable);
    }
    adjustLocalVolume(volume: number): number {
        return RCUniRtc.adjustLocalVolume(volume);
    }
    enableCamera(enable: boolean, camera: RCRTCCamera.Front): number {
        return RCUniRtc.enableCamera(enable, camera);
    }
    switchCamera(): number {
        return RCUniRtc.switchCamera();
    }
    whichCamera(): RCRTCCamera {
        return RCUniRtc.whichCamera();
    }
    isCameraFocusSupported(): boolean {
        return RCUniRtc.isCameraFocusSupported();
    }
    isCameraExposurePositionSupported(): boolean {
        return RCUniRtc.isCameraExposurePositionSupported();
    }
    setCameraFocusPositionInPreview(x: number, y: number): number {
        return RCUniRtc.setCameraFocusPositionInPreview(x, y);
    }
    setCameraExposurePositionInPreview(x: number, y: number): number {
        return RCUniRtc.setCameraExposurePositionInPreview(x, y);
    }
    setCameraCaptureOrientation(orientation: RCRTCCameraCaptureOrientation): number {
        return RCUniRtc.setCameraCaptureOrientation(orientation);
    }
    setLocalView(ref: string, callback: (code: number) => {}): void {
        RCUniRtc.setLocalView(ref, callback);
    }
    removeLocalView(callback: (code: number) => {}): void {
        RCUniRtc.removeLocalView(callback);
    }
    setRemoteView(userId: string, ref: string, callback: (code: number) => {}): void {
        RCUniRtc.setRemoteView(userId, ref, callback);
    }
    removeRemoteView(userId: string, callback: (code: number) => {}): void {
        RCUniRtc.removeRemoteView(userId, callback);
    }
    setLiveMixView(ref: string, callback: (code: number) => {}): void {
        RCUniRtc.setLiveMixView(ref, callback);
    }
    removeLiveMixView(callback: (code: number) => {}): void {
        RCUniRtc.removeLiveMixView(callback);
    }
    muteLocalStream(type: RCRTCMediaType, mute: boolean): number {
        return RCUniRtc.muteLocalStream(type, mute);
    }
    muteRemoteStream(userId: string, type: RCRTCMediaType, mute: boolean): number {
        return RCUniRtc.muteRemoteStream(userId, type, mute);
    }
    muteLiveMixStream(type: RCRTCMediaType, mute: boolean): number {
        return RCUniRtc.muteLiveMixStream(type, mute);
    }
    addLiveCdn(url: string): number {
        return RCUniRtc.addLiveCdn(url);
    }
    removeLiveCdn(url: string): number {
        return RCUniRtc.removeLiveCdn(url);
    }
    setLiveMixLayoutMode(mode: RCRTCLiveMixLayoutMode): number {
        return RCUniRtc.setLiveMixLayoutMode(mode);
    }
    setLiveMixRenderMode(mode: RCRTCLiveMixRenderMode): number {
        return RCUniRtc.setLiveMixRenderMode(mode);
    }
    setLiveMixCustomLayouts(layouts: RCRTCCustomLayout[]): number {
        return RCUniRtc.setLiveMixCustomLayouts(layouts);
    }
    setLiveMixCustomAudios(userIds: string[]): number {
        return RCUniRtc.setLiveMixCustomAudios(userIds);
    }
    setLiveMixAudioBitrate(bitrate: number): number {
        return RCUniRtc.setLiveMixAudioBitrate(bitrate);
    }
    setLiveMixVideoBitrate(bitrate: number, tiny: false): number {
        return RCUniRtc.setLiveMixVideoBitrate(bitrate, tiny);
    }
    setLiveMixVideoResolution(resolution: RCRTCVideoResolution, tiny: false): number {
        return RCUniRtc.setLiveMixVideoResolution(resolution, tiny);
    }
    setLiveMixVideoFps(fps: RCRTCVideoFps, tiny: false): number {
        return RCUniRtc.setLiveMixVideoFps(fps, tiny);
    }
    createAudioEffect(path: string, effectId: number): number {
        return RCUniRtc.createAudioEffect(path, effectId);
    }
    releaseAudioEffect(effectId: number): number {
        return RCUniRtc.releaseAudioEffect(effectId);
    }
    playAudioEffect(effectId: number, volume: number, loop: 1): number {
        return RCUniRtc.playAudioEffect(effectId, volume, loop);
    }
    pauseAudioEffect(effectId: number): number {
        return RCUniRtc.pauseAudioEffect(effectId);
    }
    pauseAllAudioEffects(): number {
        return RCUniRtc.pauseAllAudioEffects();
    }
    resumeAudioEffect(effectId: number): number {
        return RCUniRtc.resumeAudioEffect(effectId);
    }
    resumeAllAudioEffects(): number {
        return RCUniRtc.resumeAllAudioEffects();
    }
    stopAudioEffect(effectId: number): number {
        return RCUniRtc.stopAudioEffect(effectId);
    }
    stopAllAudioEffects(): number {
        return RCUniRtc.stopAllAudioEffects();
    }
    adjustAudioEffectVolume(effectId: number, volume: number): number {
        return RCUniRtc.adjustAudioEffectVolume(effectId, volume);
    }
    getAudioEffectVolume(effectId: number): number {
        return RCUniRtc.getAudioEffectVolume(effectId);
    }
    adjustAllAudioEffectsVolume(volume: number): number {
        return RCUniRtc.adjustAllAudioEffectsVolume(volume);
    }
    startAudioMixing(path: string, mode: RCRTCAudioMixingMode, playback: true, loop: 1): number {
        return RCUniRtc.startAudioMixing(path, mode, playback, loop);
    }
    stopAudioMixing(): number {
        return RCUniRtc.stopAudioMixing();
    }
    pauseAudioMixing(): number {
        return RCUniRtc.pauseAudioMixing();
    }
    resumeAudioMixing(): number {
        return RCUniRtc.resumeAudioMixing();
    }
    adjustAudioMixingVolume(volume: number): number {
        return RCUniRtc.adjustAudioMixingVolume(volume);
    }
    adjustAudioMixingPlaybackVolume(volume: number): number {
        return RCUniRtc.adjustAudioMixingPlaybackVolume(volume);
    }
    getAudioMixingPlaybackVolume(): number {
        return RCUniRtc.getAudioMixingPlaybackVolume();
    }
    adjustAudioMixingPublishVolume(volume: number): number {
        return RCUniRtc.adjustAudioMixingPublishVolume(volume);
    }
    getAudioMixingPublishVolume(): number {
        return RCUniRtc.getAudioMixingPublishVolume();
    }
    setAudioMixingPosition(position: number): number {
        return RCUniRtc.setAudioMixingPosition(position);
    }
    getAudioMixingPosition(): number {
        return RCUniRtc.getAudioMixingPosition();
    }
    getAudioMixingDuration(): number {
        return RCUniRtc.getAudioMixingDuration();
    }
    getSessionId(): string {
        return RCUniRtc.getSessionId();
    }
    createCustomStreamFromFile(path: string, tag: string, replace: boolean, playback: boolean): number {
        return RCUniRtc.createCustomStreamFromFile(path, tag, replace, playback);
    }
    setCustomStreamVideoConfig(tag: string, config: RCRTCVideoConfig): number {
        return RCUniRtc.setCustomStreamVideoConfig(tag, config);
    }
    muteLocalCustomStream(tag: string, mute: boolean): number {
        return RCUniRtc.muteLocalCustomStream(tag, mute);
    }
    setLocalCustomStreamView(tag: string, ref: string, callback: (code: number) => {}): void {
        RCUniRtc.setLocalCustomStreamView(tag, ref, callback);
    }
    removeLocalCustomStreamView(tag: string, callback: (code: number) => {}): void {
        RCUniRtc.removeLocalCustomStreamView(tag, callback);
    }
    publishCustomStream(tag: string): number {
        return RCUniRtc.publishCustomStream(tag);
    }
    unpublishCustomStream(tag: string): number {
        return RCUniRtc.unpublishCustomStream(tag);
    }
    muteRemoteCustomStream(userId: string, tag: string, type: RCRTCMediaType, mute: boolean): number {
        return RCUniRtc.muteRemoteCustomStream(userId, tag, type, mute);
    }
    setRemoteCustomStreamView(userId: string, tag: string, ref: string, callback: (code: number) => {}): void {
        RCUniRtc.setRemoteCustomStreamView(userId, tag, ref, callback);
    }
    removeRemoteCustomStreamView(userId: string, tag: string, callback: (code: number) => {}): void {
        return RCUniRtc.removeRemoteCustomStreamView(userId, tag, callback);
    }
    subscribeCustomStream(userId: string, tag: string, type: RCRTCMediaType, tiny: boolean): number {
        return RCUniRtc.subscribeCustomStream(userId, tag, type, tiny);
    }
    unsubscribeCustomStream(userId: string, tag: string, type: RCRTCMediaType): number {
        return RCUniRtc.unsubscribeCustomStream(userId, tag, type);
    }
    requestJoinSubRoom(roomId: string, userId: string, autoLayout: boolean, extra?: string): number {
        return RCUniRtc.requestJoinSubRoom(roomId, userId, autoLayout, extra);
    }
    cancelJoinSubRoomRequest(roomId: string, userId: string, extra?: string): number {
        return RCUniRtc.cancelJoinSubRoomRequest(roomId, userId, extra);
    }
    responseJoinSubRoomRequest(roomId: string, userId: string, agree: boolean, autoLayout: boolean, extra?: string): number {
        return RCUniRtc.responseJoinSubRoomRequest(roomId, userId, agree, autoLayout, extra);
    }
    joinSubRoom(roomId: string): number {
        return RCUniRtc.joinSubRoom(roomId);
    }
    leaveSubRoom(roomId: string, disband: boolean): number {
        return RCUniRtc.leaveSubRoom(roomId, disband);
    }

    /*  以下是事件回调相关的方法  */

    private _getFullEventName(event: RCRTCEngineEventsName | RCRTCStatsEventsName): string {
        let prefix = '';
        if (Object.keys(RCRTCEngineEventsName).includes(event)) {
            prefix = EngineEventsPrefix;
        } else if (Object.keys(RCRTCStatsEventsName).includes(event)) {
            prefix = StatsEventsPrefix;
        } else {
            throw new Error('EventName not support.');
        }
        return (prefix + event);
    }

    private _setListener(
        event: RCRTCEngineEventsName | RCRTCStatsEventsName,
        callback?: (result: any) => void): void {
        // 因为单个事件名只支持设置一个监听，所以要先移除已有的监听。
        RCUniRtc.removeAllEventListeners(this._getFullEventName(event));
        if (callback) {
            let listener = (res: {module: string ,type: string, data: any}) => {
                callback(res.data);
            };
            RCUniRtc.addEventListener(this._getFullEventName(event), listener);
        }
    }

    // 以下为设置事件回调的方法
    
    setOnErrorListener(callback?: (result: OnErrorResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnError, callback);
    }
    setOnKickedListener(callback?: (result: OnKickedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnKicked, callback);
    }
    setOnRoomJoinedListener(callback?: (result: OnRoomJoinedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRoomJoined, callback);
    }
    setOnRoomLeftListener(callback?: (result: OnRoomLeftResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRoomLeft, callback);
    }
    setOnPublishedListener(callback?: (result: OnPublishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnPublished, callback);
    }
    setOnUnpublishedListener(callback?: (result: OnUnpublishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnUnpublished, callback);
    }
    setOnSubscribedListener(callback?: (result: OnSubscribedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnSubscribed, callback);
    }
    setOnUnsubscribedListener(callback?: (result: OnUnsubscribedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnUnsubscribed, callback);
    }
    setOnLiveMixSubscribedListener(callback?: (result: OnLiveMixSubscribedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveMixSubscribed, callback);
    }
    setOnLiveMixUnsubscribedListener(callback?: (result: OnLiveMixUnsubscribedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveMixUnsubscribed, callback);
    }
    setOnEnableCameraListener(callback?: (result: OnEnableCameraResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnEnableCamera, callback);
    }
    setOnSwitchCameraListener(callback?: (result: OnSwitchCameraResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnSwitchCamera, callback);
    }
    setOnLiveCdnAddedListener(callback?: (result: OnLiveCdnAddedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveCdnAdded, callback);
    }
    setOnLiveCdnRemovedListener(callback?: (result: OnLiveCdnRemovedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveCdnRemoved, callback);
    }
    setOnLiveMixLayoutModeSetListener(callback?: (result: OnLiveMixLayoutModeSetResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveMixLayoutModeSet, callback);
    }
    setOnLiveMixRenderModeSetListener(callback?: (result: OnLiveMixRenderModeSetResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveMixRenderModeSet, callback);
    }
    setOnLiveMixCustomAudiosSetListener(callback?: (result: OnLiveMixCustomAudiosSetResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveMixCustomAudiosSet, callback);
    }
    setOnLiveMixCustomLayoutsSetListener(callback?: (result: OnLiveMixCustomLayoutsSetResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveMixCustomLayoutsSet, callback);
    }
    setOnLiveMixAudioBitrateSetListener(callback?: (result: OnLiveMixAudioBitrateSetResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveMixAudioBitrateSet, callback);
    }
    setOnLiveMixVideoBitrateSetListener(callback?: (result: OnLiveMixVideoBitrateSetResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveMixVideoBitrateSet, callback);
    }
    setOnLiveMixVideoResolutionSetListener(callback?: (result: OnLiveMixVideoResolutionSetResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveMixVideoResolutionSet, callback);
    }
    setOnLiveMixVideoFpsSetListener(callback?: (result: OnLiveMixVideoFpsSetResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnLiveMixVideoFpsSet, callback);
    }
    setOnAudioEffectCreatedListener(callback?: (result: OnAudioEffectCreatedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnAudioEffectCreated, callback);
    }
    setOnAudioEffectFinishedListener(callback?: (result: OnAudioEffectFinishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnAudioEffectFinished, callback);
    }
    setOnAudioMixingStartedListener(callback?: (result: void) => void): void {
        this._setListener(RCRTCEngineEventsName.OnAudioMixingStarted, callback);
    }
    setOnAudioMixingPausedListener(callback?: (result: void) => void): void {
        this._setListener(RCRTCEngineEventsName.OnAudioMixingPaused, callback);
    }
    setOnAudioMixingStoppedListener(callback?: (result: void) => void): void {
        this._setListener(RCRTCEngineEventsName.OnAudioMixingStopped, callback);
    }
    setOnAudioMixingFinishedListener(callback?: (result: void) => void): void {
        this._setListener(RCRTCEngineEventsName.OnAudioMixingFinished, callback);
    }
    setOnUserJoinedListener(callback?: (result: OnUserJoinedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnUserJoined, callback);
    }
    setOnUserOfflineListener(callback?: (result: OnUserOfflineResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnUserOffline, callback);
    }
    setOnUserLeftListener(callback?: (result: OnUserLeftResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnUserLeft, callback);
    }
    setOnRemotePublishedListener(callback?: (result: OnRemotePublishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRemotePublished, callback);
    }
    setOnRemoteUnpublishedListener(callback?: (result: OnRemoteUnpublishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRemoteUnpublished, callback);
    }
    setOnRemoteLiveMixPublishedListener(callback?: (result: OnRemoteLiveMixPublishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRemoteLiveMixPublished, callback);
    }
    setOnRemoteLiveMixUnpublishedListener(callback?: (result: OnRemoteLiveMixUnpublishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRemoteLiveMixUnpublished, callback);
    }
    setOnRemoteStateChangedListener(callback?: (result: OnRemoteStateChangedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRemoteStateChanged, callback);
    }
    setOnRemoteFirstFrameListener(callback?: (result: OnRemoteFirstFrameResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRemoteFirstFrame, callback);
    }
    setOnRemoteLiveMixFirstFrameListener(callback?: (result: OnRemoteLiveMixFirstFrameResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRemoteLiveMixFirstFrame, callback);
    }
    setOnCustomStreamPublishedListener(callback?: (result: OnCustomStreamPublishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnCustomStreamPublished, callback);
    }
    setOnCustomStreamUnpublishedListener(callback?: (result: OnCustomStreamUnpublishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnCustomStreamUnpublished, callback);
    }
    setOnCustomStreamPublishFinishedListener(callback?: (result: OnCustomStreamPublishFinishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnCustomStreamPublishFinished, callback);
    }
    setOnRemoteCustomStreamPublishedListener(callback?: (result: OnRemoteCustomStreamPublishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRemoteCustomStreamPublished, callback);
    }
    setOnRemoteCustomStreamUnpublishedListener(callback?: (result: OnRemoteCustomStreamUnpublishedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRemoteCustomStreamUnpublished, callback);
    }
    setOnRemoteCustomStreamStateChangedListener(callback?: (result: OnRemoteCustomStreamStateChangedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRemoteCustomStreamStateChanged, callback);
    }
    setOnRemoteCustomStreamFirstFrameListener(callback?: (result: OnRemoteCustomStreamFirstFrameResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnRemoteCustomStreamFirstFrame, callback);
    }
    setOnCustomStreamSubscribedListener(callback?: (result: OnCustomStreamSubscribedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnCustomStreamSubscribed, callback);
    }
    setOnCustomStreamUnsubscribedListener(callback?: (result: OnCustomStreamUnsubscribedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnCustomStreamUnsubscribed, callback);
    }
    setOnJoinSubRoomRequestedListener(callback?: (result: OnJoinSubRoomRequestedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnJoinSubRoomRequested, callback);
    }
    setOnJoinSubRoomRequestCanceledListener(callback?: (result: OnJoinSubRoomRequestCanceledResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnJoinSubRoomRequestCanceled, callback);
    }
    setOnJoinSubRoomRequestRespondedListener(callback?: (result: OnJoinSubRoomRequestRespondedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnJoinSubRoomRequestResponded, callback);
    }
    setOnJoinSubRoomRequestReceivedListener(callback?: (result: OnJoinSubRoomRequestReceivedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnJoinSubRoomRequestReceived, callback);
    }
    setOnCancelJoinSubRoomRequestReceivedListener(callback?: (result: OnCancelJoinSubRoomRequestReceivedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnCancelJoinSubRoomRequestReceived, callback);
    }
    setOnJoinSubRoomRequestResponseReceivedListener(callback?: (result: OnJoinSubRoomRequestResponseReceivedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnJoinSubRoomRequestResponseReceived, callback);
    }
    setOnSubRoomJoinedListener(callback?: (result: OnSubRoomJoinedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnSubRoomJoined, callback);
    }
    setOnSubRoomLeftListener(callback?: (result: OnSubRoomLeftResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnSubRoomLeft, callback);
    }
    setOnSubRoomBandedListener(callback?: (result: OnSubRoomBandedResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnSubRoomBanded, callback);
    }
    setOnSubRoomDisbandListener(callback?: (result: OnSubRoomDisbandResult) => void): void {
        this._setListener(RCRTCEngineEventsName.OnSubRoomDisband, callback);
    }
    

    /* 以下是 状态回调 */

    setOnNetworkStatsListener(callback?: (result: RCRTCNetworkStats) => void): void {
        this._setListener(RCRTCStatsEventsName.OnNetworkStats, callback);
    }
    setOnLocalAudioStatsListener(callback?: (result: RCRTCLocalAudioStats) => void): void {
        this._setListener(RCRTCStatsEventsName.OnLocalAudioStats, callback);
    }
    setOnLocalVideoStatsListener(callback?: (result: RCRTCLocalVideoStats) => void): void {
        this._setListener(RCRTCStatsEventsName.OnLocalVideoStats, callback);
    }
    setOnRemoteAudioStatsListener(callback?: (result: OnRemoteAudioStatsResult) => void): void {
        this._setListener(RCRTCStatsEventsName.OnRemoteAudioStats, callback);
    }
    setOnRemoteVideoStatsListener(callback?: (result: OnRemoteVideoStatsResult) => void): void {
        this._setListener(RCRTCStatsEventsName.OnRemoteVideoStats, callback);
    }
    setOnLiveMixAudioStatsListener(callback?: (result: RCRTCRemoteAudioStats) => void): void {
        this._setListener(RCRTCStatsEventsName.OnLiveMixAudioStats, callback);
    }
    setOnLiveMixVideoStatsListener(callback?: (result: RCRTCRemoteVideoStats) => void): void {
        this._setListener(RCRTCStatsEventsName.OnLiveMixVideoStats, callback);
    }
    setOnLiveMixMemberAudioStatsListener(callback?: (result: OnLiveMixMemberAudioStatsResult) => void): void {
        this._setListener(RCRTCStatsEventsName.OnLiveMixMemberAudioStats, callback);
    }
    setOnLiveMixMemberCustomAudioStatsListener(callback?: (result: OnLiveMixMemberCustomAudioStatsResult) => void): void {
        this._setListener(RCRTCStatsEventsName.OnLiveMixMemberCustomAudioStats, callback);
    }
    setOnLocalCustomAudioStatsListener(callback?: (result: OnLocalCustomAudioStatsResult) => void): void {
        this._setListener(RCRTCStatsEventsName.OnLocalCustomAudioStats, callback);
    }
    setOnLocalCustomVideoStatsListener(callback?: (result: OnLocalCustomVideoStatsResult) => void): void {
        this._setListener(RCRTCStatsEventsName.OnLocalCustomVideoStats, callback);
    }
    setOnRemoteCustomAudioStatsListener(callback?: (result: OnRemoteCustomAudioStatsResult) => void): void {
        this._setListener(RCRTCStatsEventsName.OnRemoteCustomAudioStats, callback);
    }
    setOnRemoteCustomVideoStatsListener(callback?: (result: OnRemoteCustomVideoStatsResult) => void): void {
        this._setListener(RCRTCStatsEventsName.OnRemoteCustomVideoStats, callback);
    }
}

const RCRTCEngine = new RCRTCEngineImpl();
export default RCRTCEngine;

/**
 * Engine 方法定义
 *
 * @interface RCRTCEngineInterface
 */
export interface RCRTCEngineInterface {

    /**
     * 初始化
     * 
     * @param setup 配置项
     * @memberof RCRTCEngineInterface
     */
    init(setup: RCRTCEngineSetup): void;

    /**
     * 反初始化
     *
     * @memberof RCRTCEngineInterface
     */
    unInit(): void;

    /**
     * 加入房间
     * 
     * @param {string} roomId 房间id
     * @param {RCRTCRoomSetup} setup 房间配置
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface 
     */
    joinRoom(roomId: string, setup: RCRTCRoomSetup): number;

    /**
     * 离开房间
     *
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface 
     */
    leaveRoom(): number;

    /**
     * 加入房间后, 发布本地资源
     *
     * @param {RCRTCMediaType} type 媒体资源类型
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface 
     */
    publish(type: RCRTCMediaType): number;

    /**
     * 加入房间后, 取消发布已经发布的本地资源
     *
     * @param {RCRTCMediaType} type 媒体资源类型
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    unpublish(type: RCRTCMediaType): number;

    /**
     *
     * @param userId 远端用户 userId
     * @param type 媒体资源类型
     * @param tiny 视频小流, true:订阅视频小流 false:订阅视频大流
     * @returns number 错误码
     * @memberof RCRTCEngineInterface
     */
    subscribe(userId: string, type: RCRTCMediaType, tiny: boolean): number;

    /**
     * 加入房间后, 订阅远端多个用户发布的资源
     * 
     * @param {string[]} userIds 远端用户 userId 数组
     * @param {RCRTCMediaType} type 媒体资源类型
     * @param {boolean} tiny 是否视频小流 true:订阅视频小流 false:订阅视频大流
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    subscribes(userIds: string[], type: RCRTCMediaType, tiny: boolean): number;

    /**
     * 加入房间后, 取消订阅远端单个用户发布的资源
     *
     * @param {string} userId 远端用户 userId
     * @param {RCRTCMediaType} type 媒体资源类型
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    unsubscribe(userId: string, type: RCRTCMediaType): number;

    /**
     * 加入房间后, 取消订阅远端多个用户发布的资源
     *
     * @param {string[]} userIds 远端用户 userId 数组
     * @param {RCRTCMediaType} type 媒体资源类型
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    unsubscribes(userIds: string[], type: RCRTCMediaType): number;

    /**
     * 订阅主播合流资源, 仅供直播观众用户使用
     *
     * @param {RCRTCMediaType} type 媒体资源类型
     * @param {boolean} tiny 是否视频小流 true:订阅视频小流 false:订阅视频大流
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    subscribeLiveMix(type: RCRTCMediaType, tiny: boolean): number;

    /**
     * 取消订阅主播合流资源, 仅供直播观众用户使用
     *
     * @param {RCRTCMediaType} type 媒体资源类型
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    unsubscribeLiveMix(type: RCRTCMediaType): number;

    /**
     * 设置默认音频参数, 仅供会议用户或直播主播用户使用
     *
     * @param {RCRTCAudioConfig} config 音频配置
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    setAudioConfig(config: RCRTCAudioConfig): number;

    /**
     * 设置默认视频参数, 仅供会议用户或直播主播用户使用
     *
     * @param {RCRTCVideoConfig} config 视频配置
     * @param {false} [tiny] 是否小流 true:视频小流 false:视频大流
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    setVideoConfig(config: RCRTCVideoConfig, tiny: false): number;

    /**
     * 打开/关闭麦克风
     *
     * @param {boolean} enable true 打开, false 关闭
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    enableMicrophone(enable: boolean): number;

    /**
     * 打开/关闭外放
     *
     * @param {boolean} enable true 打开, false 关闭 
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface 
     */
    enableSpeaker(enable: boolean): number;

    /**
     * 设置麦克风的音量 
     *
     * @param {number} volume 0 ~ 100, 默认值: 100
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface 
     */
    adjustLocalVolume(volume: number): number;

    /**
     * 打开/关闭摄像头
     *
     * @param {boolean} enable true：打开， false：关闭
     * @param {RCRTCCamera} camera 摄像头类型
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    enableCamera(enable: boolean, camera: RCRTCCamera): number;

    /**
     * 切换前后摄像头
     *
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    switchCamera(): number;

    /**
     * 获取当前使用摄像头位置
     *
     * @return {*}  {RCRTCCamera} 摄像头类型
     * @memberof RCRTCEngineInterface
     */
    whichCamera(): RCRTCCamera;

    /**
     * 获取摄像头是否支持区域对焦
     *
     * @return {*}  {boolean} true: 支持  false: 不支持
     * @memberof RCRTCEngineInterface
     */
    isCameraFocusSupported(): boolean;

    /**
     * 获取摄像头是否支持区域测光
     *
     * @return {*}  {boolean} true: 支持  false: 不支持
     * @memberof RCRTCEngineInterface
     */
    isCameraExposurePositionSupported(): boolean;

    /**
     * 设置在指定点区域对焦
     *
     * @param {number} x 对焦点，视图上的 x 轴坐标
     * @param {number} y 对焦点，视图上的 y 轴坐标
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    setCameraFocusPositionInPreview(x: number, y: number): number;

    /**
     * 设置在指定点区域测光
     *
     * @param {number} x 曝光点，视图上的 x 轴坐标
     * @param {number} y 曝光点，视图上的 y 轴坐标
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    setCameraExposurePositionInPreview(x: number, y: number): number;

    /**
     * 设置摄像头采集方向
     *
     * @param {RCRTCCameraCaptureOrientation} orientation 默认以 Portrait 角度进行采集
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    setCameraCaptureOrientation(orientation: RCRTCCameraCaptureOrientation): number;

    /**
     * 设置本地视频渲染窗口
     *
     * @param {string} ref 视频预览组件的 ref 值
     * @param {(code: number) => {}} callback
     * @memberof RCRTCEngineInterface
     */
    setLocalView(ref: string, callback: (code: number) => {}): void;

    /**
     * 移除本地视频渲染窗口
     *
     * @param {(code: number) => {}} callback
     * @memberof RCRTCEngineInterface
     */
    removeLocalView(callback: (code: number) => {}): void;

    /**
     * 设置远端视频窗口
     *
     * @param {string} userId 远端用户 userId
     * @param {string} ref 视频预览组件的 ref 值
     * @param {(code: number) => {}} callback
     * @memberof RCRTCEngineInterface
     */
    setRemoteView(userId: string, ref: string, callback: (code: number) => {}): void;

    /**
     * 移除远端视频窗口
     *
     * @param {string} userId 远端用户 userId
     * @param {(code: number) => {}} callback
     * @memberof RCRTCEngineInterface
     */
    removeRemoteView(userId: string, callback: (code: number) => {}): void;

    /**
     * 设置合流视频窗口
     *
     * @param {string} ref 视频预览组件的 ref 值
     * @param {(code: number) => {}} callback
     * @memberof RCRTCEngineInterface
     */
    setLiveMixView(ref: string, callback: (code: number) => {}): void;

    /**
     * 移除合流视频窗口
     *
     * @param {(code: number) => {}} callback
     * @memberof RCRTCEngineInterface
     */
    removeLiveMixView(callback: (code: number) => {}): void;

    /**
     * 停止本地音视频数据发送
     *
     * @param {RCRTCMediaType} type 媒体类型
     * @param {boolean} mute true: 不发送 false: 发送
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    muteLocalStream(type: RCRTCMediaType, mute: boolean): number;

    /**
     * 停止远端用户音视频数据的接收
     *
     * @param {string} userId 远端用户 userId
     * @param {RCRTCMediaType} type 媒体类型
     * @param {boolean} mute true: 不发送 false: 发送
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    muteRemoteStream(userId: string, type: RCRTCMediaType, mute: boolean): number;

    /**
     * 设置 CDN 直播推流地址, 仅供直播主播用户使用
     *
     * @param {string} url 推流地址
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    addLiveCdn(url: string): number;

    /**
     * 移除 CDN 直播推流地址, 仅供直播主播用户使用
     *
     * @param {string} url 推流地址
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    removeLiveCdn(url: string): number;

    /**
     * 设置直播合流布局类型, 仅供直播主播用户使用
     *
     * @param {RCRTCLiveMixLayoutMode} mode 布局类型
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    setLiveMixLayoutMode(mode: RCRTCLiveMixLayoutMode): number;

    /**
     * 设置直播合流布局填充类型, 仅供直播主播用户使用
     *
     * @param {RCRTCLiveMixRenderMode} mode 填充类型
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface 
     * @memberof RCRTCEngineInterface
     */
    setLiveMixRenderMode(mode: RCRTCLiveMixRenderMode): number;

    /**
     * 设置直播混流布局配置, 仅供直播主播用户使用
     *
     * @param {RCRTCCustomLayout[]} layouts 混流布局列表
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    setLiveMixCustomLayouts(layouts: RCRTCCustomLayout[]): number;

    /**
     * 设置直播自定义音频流列表, 仅供直播主播用户使用
     *
     * @param {string[]} userIds 音频流列表
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    setLiveMixCustomAudios(userIds: string[]): number;

    /**
     * 设置直播合流音频码率, 仅供直播主播用户使用
     *
     * @param {number} bitrate 音频码率 单位：kbps
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    setLiveMixAudioBitrate(bitrate: number): number;

    /**
     * 设置直播合流视频码率, 仅供直播主播用户使用
     *
     * @param {number} bitrate 音频码率 单位：kbps
     * @param {false} [tiny] 是否小流 true:视频小流 false:视频大流，默认值 false
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    setLiveMixVideoBitrate(bitrate: number, tiny: false): number;

    /**
     * 设置直播合流视频分辨率, 仅供直播主播用户使用
     *
     * @param {RCRTCVideoResolution} resolution 视频分辨率
     * @param {false} tiny 是否小流 true:视频小流 false:视频大流，默认值 false
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    setLiveMixVideoResolution(resolution: RCRTCVideoResolution, tiny: false): number;

    /**
     * 设置直播合流视频帧率, 仅供直播主播用户使用
     *
     * @param {RCRTCVideoFps} fps 帧率
     * @param {false} tiny 是否小流 true:视频小流 false:视频大流，默认值 false
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    setLiveMixVideoFps(fps: RCRTCVideoFps, tiny: false): number;

    /**
     * 创建音效文件缓存, 仅供会议用户或直播主播用户使用
     *
     * @param {string} path 本地文件地址
     * @param {number} effectId 自定义全局唯一音效Id
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    createAudioEffect(path: string, effectId: number): number;

    /**
     * 释放音效文件缓存, 仅供会议用户或直播主播用户使用
     *
     * @param {number} effectId 自定义全局唯一音效Id
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    releaseAudioEffect(effectId: number): number;

    /**
     * 播放音效文件, 仅供会议用户或直播主播用户使用
     *
     * @param {number} effectId 自定义全局唯一音效Id
     * @param {number} volume 音效文件播放音量
     * @param {boolean} loop 循环播放次数 默认：1次
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    playAudioEffect(effectId: number, volume: number, loop: 1): number;

    /**
     * 暂停音效文件播放, 仅供会议用户或直播主播用户使用
     *
     * @param {number} effectId 自定义全局唯一音效Id
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    pauseAudioEffect(effectId: number): number;

    /**
     * 暂停全部音效文件播放, 仅供会议用户或直播主播用户使用
     *
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    pauseAllAudioEffects(): number;

    /**
     * 恢复音效文件播放, 仅供会议用户或直播主播用户使用
     *
     * @param {number} effectId 自定义全局唯一音效Id
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    resumeAudioEffect(effectId: number): number;

    /**
     * 恢复全部音效文件播放, 仅供会议用户或直播主播用户使用
     *
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    resumeAllAudioEffects(): number;

    /**
     * 停止音效文件播放, 仅供会议用户或直播主播用户使用
     *
     * @param {number} effectId 自定义全局唯一音效Id
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    stopAudioEffect(effectId: number): number;

    /**
     * 停止全部音效文件播放, 仅供会议用户或直播主播用户使用
     *
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    stopAllAudioEffects(): number;

    /**
     * 设置音效文件播放音量, 仅供会议用户或直播主播用户使用
     *
     * @param {number} effectId 自定义全局唯一音效Id
     * @param {number} volume 音量 0~100, 默认 100
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    adjustAudioEffectVolume(effectId: number, volume: number): number;

    /**
     * 获取音效文件播放音量, 仅供会议用户或直播主播用户使用
     *
     * @param {number} effectId 自定义全局唯一音效Id
     * @return {*}  {number} 音量，如果小于 0，则是错误码，错误码对应 number
     * @memberof RCRTCEngineInterface
     */
    getAudioEffectVolume(effectId: number): number;

    /**
     * 设置全局音效文件播放音量, 仅供会议用户或直播主播用户使用
     *
     * @param {number} volume 音量 0~100, 默认 100
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    adjustAllAudioEffectsVolume(volume: number): number;

    /**
     * 开始混音, 仅支持混合本地音频文件数据, 仅供会议用户或直播主播用户使用
     *
     * @param {string} path 仅支持本地音频文件
     * @param {RCRTCAudioMixingMode} mode  混音行为模式
     * @param {boolean} playback 是否本地播放， 默认 true
     * @param {number} loop 循环混音或者播放次数，默认播放 1 次
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     * @category 混音
     */
    startAudioMixing(path: string, mode: RCRTCAudioMixingMode, playback: true, loop: 1): number;

    /**
     * 停止混音, 仅供会议用户或直播主播用户使用
     *
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     * @category 混音
     */
    stopAudioMixing(): number;

    /**
     * 暂停混音, 仅供会议用户或直播主播用户使用
     *
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     * @category 混音
     */
    pauseAudioMixing(): number;

    /**
     * 恢复混音, 仅供会议用户或直播主播用户使用
     *
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    resumeAudioMixing(): number;

    /**
     * 设置混音输入音量, 包含本地播放和发送音量, 仅供会议用户或直播主播用户使用
     *
     * @param {number} volume 音量 0~100, 默认 100
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    adjustAudioMixingVolume(volume: number): number;

    /**
     * 设置混音本地播放音量, 仅供会议用户或直播主播用户使用
     *
     * @param {number} volume  音量 0~100, 默认 100
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    adjustAudioMixingPlaybackVolume(volume: number): number;

    /**
     * 获取混音本地播放音量, 仅供会议用户或直播主播用户使用
     *
     * @return {*}  {number} 音量，如果小于 0，则是错误码，错误码对应 number
     * @memberof RCRTCEngineInterface
     */
    getAudioMixingPlaybackVolume(): number;

    /**
     * 设置混音发送音量, 仅供会议用户或直播主播用户使用
     *
     * @param {number} volume 音量 0~100, 默认 100
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    adjustAudioMixingPublishVolume(volume: number): number;

    /**
     * 获取混音发送音量, 仅供会议用户或直播主播用户使用
     *
     * @return {*}  {number} 音量，如果小于 0，则是错误码，错误码对应 number
     * @memberof RCRTCEngineInterface
     */
    getAudioMixingPublishVolume(): number;

    /**
     * 设置混音文件合流进度, 仅供会议用户或直播主播用户使用
     *
     * @param {number} position 进度 0~1
     * @return {*}  {number}
     * @memberof RCRTCEngineInterface
     */
    setAudioMixingPosition(position: number): number;

    /**
     * 获取音频文件合流进度, 仅供会议用户或直播主播用户使用
     *
     * @return {*}  {number} 合流进度 0~1
     * @memberof RCRTCEngineInterface
     */
    getAudioMixingPosition(): number;

    /**
     * 获取音频文件时长, 单位:秒, 仅供会议用户或直播主播用户使用
     *
     * @return {*}  {number}  音频文件时长, 如果小于 0，则是错误码，错误码对应 number
     * @memberof RCRTCEngineInterface
     */
    getAudioMixingDuration(): number;

    /**
     * 获取当前房间的 SessionId, 仅在加入房间成功后可获取
     * 每次加入房间所得到的 SessionId 均不同
     *
     * @return {*}  {string} 获取到的 sessionId
     * @memberof RCRTCEngineInterface
     */
    getSessionId(): string;

    /**
     * 从视频文件创建自定义流, 仅供会议用户或直播主播用户使用
     *
     * @param {string} path 本地文件地址
     * @param {string} tag 自定义流全局唯一标签
     * @param {boolean} replace 是否替换音频流  true: 替换  false: 不替换
     * @param {boolean} playback 是否本地回放音频流  true: 回放  false: 不回放
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    createCustomStreamFromFile(path: string, tag: string, replace: boolean, playback: boolean): number;

    /**
     * 设置自定义流参数, 仅供会议用户或直播主播用户使用
     *
     * @param {string} tag 自定义流全局唯一标签
     * @param {RCRTCVideoConfig} config 视频参数
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    setCustomStreamVideoConfig(tag: string, config: RCRTCVideoConfig): number;

    /**
     * 停止自定义流发送, 仅供会议用户或直播主播用户使用
     *
     * @param {string} tag 自定义流全局唯一标签
     * @param {boolean} mute true: 不发送 false: 发送
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    muteLocalCustomStream(tag: string, mute: boolean): number;

    /**
     * 设置自定义流预览窗口, 仅供会议用户或直播主播用户使用
     *
     * @param {string} tag 自定义流全局唯一标签
     * @param {string} ref 视频预览组件的 ref 值
     * @param {(code: number) => {}} callback 调用完成的回调
     * @memberof RCRTCEngineInterface
     */
    setLocalCustomStreamView(tag: string, ref: string, callback: (code: number) => {}): void;

    /**
     * 移除自定义流预览窗口, 仅供会议用户或直播主播用户使用
     *
     * @param {string} tag 自定义流全局唯一标签
     * @param {(code: number) => {}} callback 调用完成的回调
     * @memberof RCRTCEngineInterface
     */
    removeLocalCustomStreamView(tag: string, callback: (code: number) => {}): void;

    /**
     * 发布自定义流, 仅供会议用户或直播主播用户使用
     *
     * @param {string} tag 自定义流全局唯一标签
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    publishCustomStream(tag: string): number;

    /**
     * 取消发布自定义流, 仅供会议用户或直播主播用户使用
     *
     * @param {string} tag 自定义流全局唯一标签
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    unpublishCustomStream(tag: string): number;

    /**
     * 停止远端用户自定义流数据的接收
     *
     * @param {string} userId 远端用户 userId
     * @param {string} tag 自定义流全局唯一标签
     * @param {RCRTCMediaType} type 远端自定义流类型
     * @param {boolean} mute true: 不接收 false: 接收
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    muteRemoteCustomStream(userId: string, tag: string, type: RCRTCMediaType, mute: boolean): number;

    /**
     * 设置远端自定义流View
     *
     * @param {string} userId 远端用户 userId
     * @param {string} tag 自定义流全局唯一标签
     * @param {string} ref 视频预览组件的 ref 值
     * @param {(code: number) => {}} callback 调用完成的回调
     * @memberof RCRTCEngineInterface
     */
    setRemoteCustomStreamView( userId: string, tag: string, ref: string, callback: (code: number) => {}): void;

    /**
     * 移除远端自定义流View
     *
     * @param {string} userId 远端用户 userId
     * @param {string} tag 自定义流全局唯一标签
     * @param {(code: number) => {}} callback 调用完成的回调
     * @memberof RCRTCEngineInterface
     */
    removeRemoteCustomStreamView(userId: string, tag: string, callback: (code: number) => {}): void;

    /**
     * 加入房间后, 订阅远端用户发布的自定义流
     *
     * @param {string} userId 远端用户 userId
     * @param {string} tag 自定义流全局唯一标签
     * @param {RCRTCMediaType} type 远端自定义流类型
     * @param {boolean} tiny true: 小流 false: 大流
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    subscribeCustomStream(userId: string, tag: string, type: RCRTCMediaType, tiny: boolean): number;

    /**
     * 加入房间后, 取消订阅远端用户发布的自定义流
     *
     * @param {string} userId 远端用户 userId
     * @param {string} tag 自定义流全局唯一标签
     * @param {RCRTCMediaType} type 远端自定义流类型
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    unsubscribeCustomStream(userId: string, tag: string, type: RCRTCMediaType): number;

    /**
     * 向指定用户发送跨房间连麦请求
     *
     * @param {string} roomId 房间 roomId
     * @param {string} userId 远端用户 userId
     * @param {boolean} autoLayout 是否将邀请人音视频资源发送到被邀请人房间中合流
     * @param {string} extra 附加信息, 可随消息发送给被邀请人
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    requestJoinSubRoom(roomId: string, userId: string, autoLayout: boolean, extra?: string): number;

    /**
     * 取消正在进行中的跨房间连麦请求
     *
     * @param {string} roomId 房间 roomId
     * @param {string} userId 远端用户 userId
     * @param {string} extra 附加信息, 可随消息发送给被邀请人
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    cancelJoinSubRoomRequest(roomId: string, userId: string, extra?: string): number;

    /**
     * 响应跨房间连麦请求
     *
     * @param {string} roomId 房间 roomId
     * @param {string} userId 远端用户 userId
     * @param {boolean} agree 是否同意加入副房间
     * @param {boolean} autoLayout 是否将邀请人音视频资源发送到被邀请人房间中合流
     * @param {string} extra 附加信息, 可随消息发送给被邀请人
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    responseJoinSubRoomRequest(roomId: string, userId: string, agree: boolean, autoLayout: boolean, extra?: string): number;

    /**
     * 连麦邀请后加入副房间
     *
     * @param {string} roomId 房间 roomId
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    joinSubRoom(roomId: string): number;

    /**
     * 离开副房间，此方法仅供连麦离开副房间使用
     *
     * @param {string} roomId 房间 roomId
     * @param {boolean} disband 是否通知所有连麦用户结束, true:通知  false:不通知
     * @return {*}  {number} 错误码
     * @memberof RCRTCEngineInterface
     */
    leaveSubRoom(roomId: string, disband: boolean): number;
}
