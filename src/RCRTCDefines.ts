/**
 * 引擎初始配置
 */
export interface RCRTCEngineSetup {

    /**
     * 连接断开后是否 SDK 内部重连
     * 默认: false 不重连
     */
    reconnectable?: boolean;

    /**
     * 设置房间统计信息的回调间隔, 单位: 毫秒, 默认: 1000ms(1s)
     * 注意: interval 值太小会影响 SDK 性能，如果小于 100 配置无法生效
     */
    statsReportInterval?: number;

    /**
     * 设置媒体服务器地址
     * 特别注意: 如果设置了，会覆盖导航下载下来的 media server url
     */
    mediaUrl?: string;

    /**
     * 音频配置
     */
    audioSetup?: RCRTCAudioSetup;

    /**
     * 视频配置
     */
    videoSetup?: RCRTCVideoSetup;
}

/**
 * 音频配置
 */
export interface RCRTCAudioSetup {

    /**
     * 音频编译类型
     * 默认: RCRTCIWAudioCodecTypeOPUS
     * iOS Android
     */
    codec?: RCRTCAudioCodecType;

    /**
     * 是否可以和其它后台 App 进行混音
     * 默认 true
     * 特别注意：如果该属性设置为 false，切换到其它 App 操作麦克风或者扬声器时，会导致自己 App 麦克风采集和播放被打断。
     * 仅 Android 平台生效
     */
    mixOtherAppsAudio?: boolean;

    /**
     * 音源设置
     * 默认值：VOICE_COMMUNICATION
     * 仅 Android 平台生效
     */
    audioSource?: RCRTCAudioSource;

    /**
     * 音频采样率
     * 默认值 Type16000
     * 仅 Android 平台生效
     */
    audioSampleRate?: RCRTCAudioSampleRate;

    /**
     * 是否禁用麦克风
     * 默认值 true
     * 仅 Android 平台生效
     */
    enableMicrophone?: boolean;

    /**
     * 音频是否支持立体声
     * 默认值 true
     * 仅 Android 平台生效
     */
    enableStereo?: boolean;
}

/**
 *  视频配置
 */
export interface RCRTCVideoSetup {
    enableHardwareDecoder?: boolean;
    enableHardwareEncoder?: boolean;
    enableHardwareEncoderHighProfile?: boolean;
    hardwareEncoderFrameRate?: number;
    enableEncoderTexture?: boolean;
    /**
     * 是否开启视频小流, 默认: true 开启
     */
    enableTinyStream?: boolean;
}

/**
 * 房间配置
 */
export interface RCRTCRoomSetup {

    /**
     * 音视频类型
     * 默认 AudioVideo
     */
    type?: RCRTCMediaType;

    /**
     * 角色类型
     * 默认 MeetingMember
     */
    role?: RCRTCRole;
}

/**
 * 音频配置
 */
export interface RCRTCAudioConfig {

    /**
     * 音频通话质量类型
     * 默认值：Speech
     */
    quality?: RCRTCAudioQuality;

    /**
     * 音频通话模式
     * 默认值：Normal
     */
    scenario?: RCRTCAudioScenario;
}

/**
 * 视频配置
 */
export interface RCRTCVideoConfig {

    /**
     * 视频最小码率, 默认值: 0
     */
    minBitrate?: number;

    /**
     * 视频最大码率, 默认值: 0
     */
    maxBitrate?: number;

    /**
     * 视频帧率, 默认值: FPS15
     */
    fps?: number;

    /**
     * 视频分辨率, 默认值: RCRTCIWVideoResolution640x480
     */
    resolution?: number;

    /**
     * 流镜像, 默认值: false
     */
    mirror?: number;
}

export interface RCRTCCustomLayout {

    /**
     * 流类型, 默认: Normal
     */
    type?: RCRTCStreamType;

    /**
     * 用户 id
     */
    userId: string;

    /**
     * 流全局唯一标签。 流类型不为 Normal时，必须传此值
     */
    tag?: string;

    /**
     * 混流图层坐标的 x 值
     * 默认值：0
     */
    x?: number;

    /**
     * 混流图层坐标的 y 值
     * 默认值：0
     */
    y?: number;

    /**
     * 视频流的宽度
     * 默认值：480
     */
    width?: number;

    /**
     * 视频流的高度
     * 默认值：640
     */
    height?: number;
}
export interface RCRTCListenerOnError {
    code: number;
    message: string;
}

export interface RCRTCNetworkStats {
    /**
     * 网络类型, WLAN 4G
     */
    type: RCRTCNetworkType;
    /**
     * 网络地址
     */
    ip: string;
    /**
     * 发送码率
     */
    sendBitrate: number;
    /**
     * 接收码率
     */
    receiveBitrate: number;
    /**
     * 发送到服务端往返时间
     */
    rtt: number;
}

export interface RCRTCLocalAudioStats {
    /**
     * 音频编码
     */
    codec: RCRTCAudioCodecType;
    /**
     * 码率
     */
    bitrate: number;
    /**
     * 音量, 0 ~ 9 表示音量高低
     */
    volume: number;
    /**
     * 丢包率
     */
    packageLostRate: number;
    /**
     * 发送到服务端往返时间
     */
    rtt: number;
}

export interface RCRTCLocalVideoStats {
    /**
     * 是否小流
     */
    tiny: boolean;
    /**
     * 视频编码
     */
    codec: RCRTCVideoCodecType;
    /**
     * 码率
     */
    bitrate: number;
    /**
     * 帧率
     */
    fps: number;
    /**
     * 宽度
     */
    width: number;
    /**
     * 高度
     */
    height: number;
    /**
     * 丢包率
     */
    packageLostRate: number;
    /**
     * 发送到服务端往返时间
     */
    rtt: number;
}

export interface RCRTCRemoteAudioStats extends RCRTCLocalAudioStats {
    
}

/**
 * Omit<RCRTCLocalVideoStats, 'tiny'>： 去除 tiny 属性，生成一个新类型
 * RCRTCRemoteVideoStats 包含 RCRTCLocalVideoStats 中除了 tiny 之外的所有属性，
 */
export interface RCRTCRemoteVideoStats extends Omit<RCRTCLocalVideoStats, 'tiny'> {
    
}

export type BaseCallback<T> = (result: T) => void;

/**
 * 本地用户操作错误回调参数
 * @param code 错误码
 * @param message 错误信息
 */
export interface OnErrorResult {
    code: number;
    message: string;
}

/**
 * 本地用户被踢出房间回调参数
 * @param roomId 被踢出的房间id
 * @param message 返回的消息
 */
export interface OnKickedResult {
    roomId: string;
    message: string;
}
/**
 * 本地用户加入房间回调参数
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnRoomJoinedResult {
    code: number;
    message: string;
}
/**
 * 本地用户离开房间回调参数
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnRoomLeftResult {
    code: number;
    message: string;
}

/**
 * 本地用户发布资源回调参数
 * @param type  媒体类型
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnPublishedResult {
    type: RCRTCMediaType;
    code: number;
    message: string;
}

/**
 * 本地用户取消发布资源回调参数
 * @param type  媒体类型
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnUnpublishedResult {
    type: RCRTCMediaType;
    code: number;
    message: string;
}

/**
 * 订阅远端用户发布的资源操作回调参数
 * @param userId  远端用户 UserId
 * @param type  媒体类型
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnSubscribedResult {
    userId: string;
    type: RCRTCMediaType;
    code: number;
    message: string;
}

/**
 * 取消订阅远端用户发布的资源操作回调参数
 * @param userId  远端用户 UserId
 * @param type  媒体类型
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnUnsubscribedResult {
    userId: string;
    type: RCRTCMediaType;
    code: number;
    message: string;
}

/**
 * 本地观众用户订阅合流资源操作回调参数
 * @param type  媒体类型
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveMixSubscribedResult {
    type: RCRTCMediaType;
    code: number;
    message: string;
}
/**
 * 本地观众用户取消订阅合流资源操作回调参数
 * @param type  媒体类型
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveMixUnsubscribedResult {
    type: RCRTCMediaType;
    code: number;
    message: string;
}

/**
 * 本地用户开关摄像头操作回调参数
 * @param enable  true:打开摄像头 false:关闭摄像头
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnEnableCameraResult {
    enable: boolean;
    code: number;
    message: string;
}

/**
 * 本地用户切换前后置摄像头操作回调参数
 * @param camera  操作摄像头的类型
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnSwitchCameraResult {
    camera: RCRTCCamera;
    code: number;
    message: string;
}

/**
 * 添加旁路推流URL操作回调参数
 * @param url CDN URL
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveCdnAddedResult {
    url: string;
    code: number;
    message: string;
}

/**
 * 移除旁路推流URL操作回调参数
 * @param url CDN URL
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveCdnRemovedResult {
    url: string;
    code: number;
    message: string;
}

/**
 * 设置合流布局类型操作回调参数
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveMixLayoutModeSetResult {
    code: number;
    message: string;
}

/**
 * 设置合流布局填充类型操作回调参数
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveMixRenderModeSetResult {
    code: number;
    message: string;
}

/**
 * 设置需要合流音频操作回调参数
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveMixCustomAudiosSetResult {
    code: number;
    message: string;
}

/**
 * 设置合流自定义布局操作回调参数
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveMixCustomLayoutsSetResult {
    code: number;
    message: string;
}

/**
 * 设置合流音频码率操作回调参数
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveMixAudioBitrateSetResult {
    code: number;
    message: string;
}

/**
 * 设置默认视频合流码率操作回调参数
 * @param tiny 是否小流
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveMixVideoBitrateSetResult {
    tiny: boolean;
    code: number;
    message: string;
}

/**
 * 设置默认视频分辨率操作回调参数
 * @param tiny 是否小流
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveMixVideoResolutionSetResult {
    tiny: boolean;
    code: number;
    message: string;
}

/**
 * 设置默认视频帧率操作回调参数
 * @param tiny 是否小流
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnLiveMixVideoFpsSetResult {
    tiny: boolean;
    code: number;
    message: string;
}

/**
 * 创建音效操作回调参数
 * @param id 音效文件ID
 * @param code 返回码
 * @param message 返回消息
 */
export interface OnAudioEffectCreatedResult {
    id: string;
    code: number;
    message: string;
}

/**
 * 播放音效结束回调参数
 * @param id 音效文件ID
 */
export interface OnAudioEffectFinishedResult {
    id: string;
}

/**
 * 远端用户加入房间操作回调参数
 * @param userId 远端用户 userId
 * @param roomId 房间 id
 */
export interface OnUserJoinedResult {
    userId: string;
    roomId: string;
}

/**
 * 远端用户因离线离开房间操作回调参数
 * @param userId 远端用户 userId
 * @param roomId 房间 id
 */
export interface OnUserOfflineResult {
    userId: string;
    roomId: string;
}

/**
 * 远端用户离开房间操作回调参数
 * @param userId 远端用户 userId
 * @param roomId 房间 id
 */
export interface OnUserLeftResult {
    userId: string;
    roomId: string;
}

/**
 * 远端用户发布资源操作回调参数
 * @param userId 远端用户 userId
 * @param roomId 房间 id
 * @param type 媒体类型
 */
export interface OnRemotePublishedResult {
    userId: string;
    roomId: string;
    type: RCRTCMediaType;
}

/**
 * 远端用户取消发布资源操作回调参数
 * @param userId 远端用户 userId
 * @param roomId 房间 id
 * @param type 媒体类型 
 */
export interface OnRemoteUnpublishedResult {
    userId: string;
    roomId: string;
    type: RCRTCMediaType;
}

/**
 * 直播观众用户收到远端用户发布直播合流资源操作回调参数
 * @param type 媒体类型
 */
export interface OnRemoteLiveMixPublishedResult {
    type: RCRTCMediaType;
}

/**
 * 直播观众用户收到远端用户取消发布直播合流资源操作回调参数
 * @param type 媒体类型
 */
export interface OnRemoteLiveMixUnpublishedResult {
    type: RCRTCMediaType;
}

/**
 * 远端用户开关麦克风或摄像头操作回调参数
 * @param userId 远端用户 userId
 * @param roomId 房间 id
 * @param type 媒体类型
 * @param disabled 是否关闭, YES: 关闭, NO: 打开
 */
export interface OnRemoteStateChangedResult {
    userId: string;
    roomId: string;
    type: RCRTCMediaType;
    disabled: boolean;
}

/**
 * 本地会议用户或直播主播用户收到远端用户第一帧回调参数
 * @param userId 远端用户 userId
 * @param roomId 房间 id
 * @param type 媒体类型
 */
export interface OnRemoteFirstFrameResult {
    userId: string;
    roomId: string;
    type: RCRTCMediaType;
}

/**
 * 观众用户收到远端用户第一个音频或视频关键帧回调参数
 * @param type 媒体类型
 */
export interface OnRemoteLiveMixFirstFrameResult {
    type: RCRTCMediaType;
}

/**
 * 本地用户发布本地自定义流操作回调参数
 * @param tag
 * @param code
 * @param message
 */
export interface OnCustomStreamPublishedResult {
    tag: string,
    code: number,
    message: string,
}

/**
 * 本地用户取消发布本地自定义流操作回调参数
 * @param tag
 * @param code
 * @param message
 */
export interface OnCustomStreamUnpublishedResult {
    tag: string,
    code: number,
    message: string,
}

/**
 * 本地自定义流发布结束回调
 * @param tag
 */
export interface OnCustomStreamPublishFinishedResult {
    tag: string,
}

/**
 * 远端用户发布自定义流操作回调参数
 * @param roomId
 * @param userId
 * @param tag
 * @param type
 */
export interface OnRemoteCustomStreamPublishedResult {
    roomId: string,
    userId: string,
    tag: string,
    type: RCRTCMediaType
}

/**
 * 远端用户取消发布自定义流操作回调参数
 * @param roomId
 * @param userId
 * @param tag
 * @param type
 */
export interface OnRemoteCustomStreamUnpublishedResult {
    roomId: string,
    userId: string,
    tag: string,
    type: RCRTCMediaType
}

/**
 * 远端用户开关自定义流操作回调参数
 * @param roomId
 * @param userId
 * @param tag
 * @param type
 * @param disabled
 *
 */
export interface OnRemoteCustomStreamStateChangedResult {
    roomId: string,
    userId: string,
    tag: string,
    type: RCRTCMediaType,
    disabled: boolean,
}

/**
 * 远端用户开关自定义流操作回调参数
 * @param roomId
 * @param userId
 * @param tag
 * @param type
 */
export interface OnRemoteCustomStreamFirstFrameResult {
    roomId: string,
    userId: string,
    tag: string,
    type: RCRTCMediaType,
}

/**
 * 订阅远端用户发布的自定义流操作回调参数
 * @param userId
 * @param tag
 * @param type
 * @param code
 * @param message
 */
export interface OnCustomStreamSubscribedResult {
    userId: string,
    tag: string,
    type: RCRTCMediaType,
    code: number,
    message: string,
}

/**
 * 取消订阅远端用户发布的自定义流操作回调参数
 * @param userId
 * @param tag
 * @param type
 * @param code
 * @param message
 */
export interface OnCustomStreamUnsubscribedResult {
    userId: string,
    tag: string,
    type: RCRTCMediaType,
    code: number,
    message: string,
}

/**
 * 请求加入子房间回调参数
 * @param roomId
 * @param userId
 * @param code
 * @param message
 */
export interface OnJoinSubRoomRequestedResult {
    roomId: string,
    userId: string,
    code: number,
    message: string,
}

/**
 * 取消请求加入子房间回调参数
 * @param roomId
 * @param userId
 * @param code
 * @param message
 */
export interface OnJoinSubRoomRequestCanceledResult {
    roomId: string,
    userId: string,
    code: number,
    message: string,
}

/**
 * 响应请求加入子房间回调参数
 * @param roomId
 * @param userId
 * @param code
 * @param message
 */
export interface OnJoinSubRoomRequestRespondedResult {
    roomId: string,
    userId: string,
    code: number,
    message: string,
}

/**
 * 收到加入请求回调参数
 * @param roomId
 * @param userId
 * @param extra
 */
export interface OnJoinSubRoomRequestReceivedResult {
    roomId: string,
    userId: string,
    extra: string,
}

/**
 * 收到取消加入请求回调参数
 * @param roomId
 * @param userId
 * @param extra
 */
export interface OnCancelJoinSubRoomRequestReceivedResult {
    roomId: string,
    userId: string,
    extra: string,
}

/**
 * 收到加入请求响应回调参数
 * @param roomId
 * @param userId
 * @param agree
 * @param extra
 */
export interface OnJoinSubRoomRequestResponseReceivedResult {
    roomId: string,
    userId: string,
    agree: boolean,
    extra: string,
}

/**
 * 加入子房间回调参数
 * @param roomId
 * @param code
 * @param message
 */
export interface OnSubRoomJoinedResult {
    roomId: string,
    code: number,
    message: string,
}
/**
 * 离开子房间回调参数
 * @param roomId
 * @param code
 * @param message
 */
export interface OnSubRoomLeftResult {
    roomId: string,
    code: number,
    message: string,
}
/**
 * 连麦中的子房间回调参数
 * @param roomId
 */
export interface OnSubRoomBandedResult {
    roomId: string,
}
/**
 * 子房间结束连麦回调参数
 * @param roomId
 * @param userId
 */
export interface OnSubRoomDisbandResult {
    roomId: string,
    userId: string,
}


/**
 * 远端音频统计信息回调参数
 *
 * @param userId 远端用户 userId
 * @param roomId 房间 id
 * @param stats 音频统计信息
 */
export interface OnRemoteAudioStatsResult {
    roomId: string;
    userId: string;
    stats: RCRTCRemoteAudioStats
}

/**
 * 远端视频统计信息回调参数
 *
 * @param userId 远端用户 userId
 * @param roomId 房间 id
 * @param stats 视频统计信息
 */
export interface OnRemoteVideoStatsResult {
    roomId: string;
    userId: string;
    stats: RCRTCRemoteVideoStats
}

export interface OnLiveMixMemberAudioStatsResult {
    userId: string;
    volume: number;
}

export interface OnLiveMixMemberCustomAudioStatsResult {
    userId: string;
    tag: string;
    volume: number;
}

export interface OnLocalCustomAudioStatsResult {
    tag: string;
    stats: RCRTCLocalAudioStats;
}

export interface OnLocalCustomVideoStatsResult {
    tag: string;
    stats: RCRTCLocalVideoStats;
}

export interface OnRemoteCustomAudioStatsResult {
    roomId: string;
    userId: string;
    tag: string;
    stats: RCRTCRemoteAudioStats
}

export interface OnRemoteCustomVideoStatsResult {
    roomId: string;
    userId: string;
    tag: string;
    stats: RCRTCRemoteVideoStats
}

/** 以下是枚举值的定义 */

/**
 * 音频编译类型
 */
export enum RCRTCAudioCodecType {
    OPUS,
    PCMU,
}

/**
 * 音源类型
 */
export enum RCRTCAudioSource {
    /**
     * 默认音频源
     */
    DEFAULT,
    /**
     * 麦克风
     */
    MIC,
    /**
     * 语音呼叫上行音频源
     */
    VOICE_UPLINK,
    /**
     * 语音呼叫下行音频源
     */
    VOICE_DOWNLINK,
    /**
     * 语音呼叫音频源
     */
    VOICE_CALL,
    /**
     * 同方向的相机麦克风，若相机无内置相机或无法识别，则使用预设的麦克风
     */
    CAMCORDER,
    /**
     * 进过语音识别后的麦克风音频源
     */
    VOICE_RECOGNITION,
    /**
     * 针对VoIP调整后的麦克风音频源
     */
    VOICE_COMMUNICATION,
}

export enum RCRTCAudioSampleRate {
    Type8000 = 8000,
    Type16000 = 16000,
    Type32000 = 32000,
    Type44100 = 44100, 
    Type48000 = 48000,
}

/**
 * 音视频类型
 */
export enum RCRTCMediaType {
    /**
     * 仅音频
     */
    Audio = 0, 
    /**
     * 仅视频
     */
    Video,          
    /**
     * 音频 + 视频
     */
    AudioVideo,
}

/**
 * 角色类型
 */
export enum RCRTCRole {          
    /**
     * 会议类型房间中用户
     */
    MeetingMember = 0,          
    /**
     * 直播类型房间中主播
     */
    LiveBroadcaster,          
    /**
     * 直播类型房间中观众
     */
    LiveAudience,
}

/**
 * 音频通话质量类型
 */
export enum RCRTCAudioQuality {

    /**
     * 人声音质，编码码率最大值为 32Kbps
     */
    Speech,

    /**
     * 标清音乐音质，编码码率最大值为 64Kbps
     */
    Music,

    /**
     * 高清音乐音质，编码码率最大值为 128Kbps
     */
    MusicHigh,
}

/**
 * 音频通话模式
 */
export enum RCRTCAudioScenario {
    
    /**
     * 普通通话模式(普通音质模式), 满足正常音视频场景
     */
    Normal,

    /**
     * 音乐聊天室模式, 提升声音质量，适用对音乐演唱要求较高的场景
     */
    MusicChatRoom,

    /**
     * 音乐教室模式，提升声音质量，适用对乐器演奏音质要求较高的场景
     */
    MusicClassRoom,
}

/**
 * 视频帧率
 */
export enum RCRTCVideoFps {
    
    /**
     * 每秒 10 帧
     */
    Fps10,

    /**
     * 每秒 15 帧
     */
    Fps15,

    /**
     * 每秒 24 帧
     */
    Fps24,

    /**
     * 每秒 30 帧
     */
    Fps30,
}

/**
 * 视频分辨率
 */
export enum RCRTCVideoResolution {
    Resolution_144x176,
    Resolution_180x180,
    Resolution_144x256,
    Resolution_180x240,
    Resolution_180x320,
    Resolution_240x240,
    Resolution_240x320,
    Resolution_360x360,
    Resolution_360x480,
    Resolution_360x640,
    Resolution_480x480,
    Resolution_480x640,
    Resolution_480x720,
    Resolution_480x848,
    Resolution_720x960,
    Resolution_720x1280,
    Resolution_1080x1920,
}

/**
 * 视频填充模式
 */
export enum RCRTCViewFitType {

    /**
     * 满屏显示, 等比例填充, 直到填充满整个视图区域, 其中一个维度的部分区域会被裁剪
     */
    Cover,

    /**
     * 完整显示, 填充黑边, 等比例填充, 直到一个维度到达区域边界
     */
    Center,
}

/**
 * 摄像头类型
 */
export enum RCRTCCamera {

    /**
     * 无
     */
    None,

    /**
     * 前置摄像头
     */
    Front,

    /**
     * 后置摄像头
     */
    Back,
}

/**
 * 摄像头采集方向
 */
export enum RCRTCCameraCaptureOrientation {

    /**
     * 竖直, home 键在下部
     */
    Portrait = 0,

    /**
     * 顶部向下, home 键在上部
     */
    PortraitUpsideDown,

    /**
     * 顶部向右, home 键在左侧
     */
    LandscapeRight,

    /**
     * 顶部向左, home 键在右侧
     */
    LandscapeLeft,
}

/**
 * 合流布局模式
 */
export enum RCRTCLiveMixLayoutMode {

    /**
     * 自定义布局
     */
    Custom,

    /**
     * 悬浮布局
     */
    Suspension,

    /**
     * 自适应布局
     */
    Adaptive,
}

/**
 * 输出视频流的裁剪模式
 */
export enum RCRTCLiveMixRenderMode {

    /**
     * 自适应裁剪
     */
    Crop,

    /**
     * 填充
     */
    Whole,
}

/**
 *  混音行为模式
 */
export enum RCRTCAudioMixingMode {

    /**
     * 对端只能听见麦克风采集的声音
     */
    None,

    /**
     * 对端能够听到麦克风采集的声音和音频文件的声音
     */
    Mixing,

    /**
     * 对端只能听到音频文件的声音
     */
    Replace, 
}

export enum RCRTCNetworkType {
    Unknown,
    WiFi,
    Mobile,
}

export enum RCRTCVideoCodecType {
    H264
}

/**
 * 媒体流类型
 */
export enum RCRTCStreamType {
    NotNormal,
    /**
     * 默认值，
     */
    Normal,
    /**
     * 直播合流
     */
    Live,
    /**
     * 自定义
     */
    File,
    /**
     * 屏幕共享
     */
    Screen,
    /**
     * CDN
     */
    CDN,
}

/**
 * 事件监听枚举
 */
export enum RCRTCEngineEventsName {
    OnError = 'OnError',
    OnKicked = 'OnKicked',
    OnRoomJoined = 'OnRoomJoined',
    OnRoomLeft = 'OnRoomLeft',
    OnPublished = 'OnPublished',
    OnUnpublished = 'OnUnpublished',
    OnSubscribed = 'OnSubscribed',
    OnUnsubscribed = 'OnUnsubscribed',
    OnLiveMixSubscribed = 'OnLiveMixSubscribed',
    OnLiveMixUnsubscribed = 'OnLiveMixUnsubscribed',
    OnEnableCamera = 'OnEnableCamera',
    OnSwitchCamera = 'OnSwitchCamera',
    OnLiveCdnAdded = 'OnLiveCdnAdded',
    OnLiveCdnRemoved = 'OnLiveCdnRemoved',
    OnLiveMixLayoutModeSet = 'OnLiveMixLayoutModeSet',
    OnLiveMixRenderModeSet = 'OnLiveMixRenderModeSet',
    OnLiveMixCustomAudiosSet = 'OnLiveMixCustomAudiosSet',
    OnLiveMixCustomLayoutsSet = 'OnLiveMixCustomLayoutsSet',
    OnLiveMixAudioBitrateSet = 'OnLiveMixAudioBitrateSet',
    OnLiveMixVideoBitrateSet = 'OnLiveMixVideoBitrateSet',
    OnLiveMixVideoResolutionSet = 'OnLiveMixVideoResolutionSet',
    OnLiveMixVideoFpsSet = 'OnLiveMixVideoFpsSet',
    OnAudioEffectCreated = 'OnAudioEffectCreated',
    OnAudioEffectFinished = 'OnAudioEffectFinished',
    OnAudioMixingStarted = 'OnAudioMixingStarted',
    OnAudioMixingPaused = 'OnAudioMixingPaused',
    OnAudioMixingStopped = 'OnAudioMixingStopped',
    OnAudioMixingFinished = 'OnAudioMixingFinished',
    OnUserJoined = 'OnUserJoined',
    OnUserOffline = 'OnUserOffline',
    OnUserLeft = 'OnUserLeft',
    OnRemotePublished = 'OnRemotePublished',
    OnRemoteUnpublished = 'OnRemoteUnpublished',
    OnRemoteLiveMixPublished = 'OnRemoteLiveMixPublished',
    OnRemoteLiveMixUnpublished = 'OnRemoteLiveMixUnpublished',
    OnRemoteStateChanged = 'OnRemoteStateChanged',
    OnRemoteFirstFrame = 'OnRemoteFirstFrame',
    OnRemoteLiveMixFirstFrame = 'OnRemoteLiveMixFirstFrame',
    OnCustomStreamPublished = 'OnCustomStreamPublished',
    OnCustomStreamUnpublished = 'OnCustomStreamUnpublished',
    OnCustomStreamPublishFinished = 'OnCustomStreamPublishFinished',
    OnRemoteCustomStreamPublished = 'OnRemoteCustomStreamPublished',
    OnRemoteCustomStreamUnpublished = 'OnRemoteCustomStreamUnpublished',
    OnRemoteCustomStreamStateChanged = 'OnRemoteCustomStreamStateChanged',
    OnRemoteCustomStreamFirstFrame = 'OnRemoteCustomStreamFirstFrame',
    OnCustomStreamSubscribed = 'OnCustomStreamSubscribed',
    OnCustomStreamUnsubscribed = 'OnCustomStreamUnsubscribed',
    OnJoinSubRoomRequested = 'OnJoinSubRoomRequested',
    OnJoinSubRoomRequestCanceled = 'OnJoinSubRoomRequestCanceled',
    OnJoinSubRoomRequestResponded = 'OnJoinSubRoomRequestResponded',
    OnJoinSubRoomRequestReceived = 'OnJoinSubRoomRequestReceived',
    OnCancelJoinSubRoomRequestReceived = 'OnCancelJoinSubRoomRequestReceived',
    OnJoinSubRoomRequestResponseReceived = 'OnJoinSubRoomRequestResponseReceived',
    OnSubRoomJoined = 'OnSubRoomJoined',
    OnSubRoomLeft = 'OnSubRoomLeft',
    OnSubRoomBanded = 'OnSubRoomBanded',
    OnSubRoomDisband = 'OnSubRoomDisband',
}

/**
 * 状态监听枚举
 */
export enum RCRTCStatsEventsName {
    OnNetworkStats = 'OnNetworkStats',
    OnLocalAudioStats = 'OnLocalAudioStats',
    OnLocalVideoStats = 'OnLocalVideoStats',
    OnRemoteAudioStats = 'OnRemoteAudioStats',
    OnRemoteVideoStats = 'OnRemoteVideoStats',
    OnLiveMixAudioStats = 'OnLiveMixAudioStats',
    OnLiveMixVideoStats = 'OnLiveMixVideoStats',
    OnLiveMixMemberAudioStats = 'OnLiveMixMemberAudioStats',
    OnLiveMixMemberCustomAudioStats = 'OnLiveMixMemberCustomAudioStats',
    OnLocalCustomAudioStats = 'OnLocalCustomAudioStats',
    OnLocalCustomVideoStats = 'OnLocalCustomVideoStats',
    OnRemoteCustomAudioStats = 'OnRemoteCustomAudioStats',
    OnRemoteCustomVideoStats = 'OnRemoteCustomVideoStats',
}