#import "DCUniModule.h"

#import <RongRTCLibWrapper/RongRTCLibWrapper.h>

@interface RCUniRtc : DCUniModule

+ (NSInteger)setLocalAudioCapturedDelegate:(id<RCRTCIWAudioFrameDelegate> _Nullable)delegate;

+ (NSInteger)setLocalAudioMixedDelegate:(id<RCRTCIWAudioFrameDelegate> _Nullable)delegate;

+ (NSInteger)setRemoteAudioReceivedDelegate:(id<RCRTCIWAudioFrameDelegate> _Nullable)delegate
                                     userId:(NSString *)userId;

+ (NSInteger)setRemoteAudioMixedDelegate:(id<RCRTCIWAudioFrameDelegate> _Nullable)delegate;

+ (NSInteger)setLocalVideoProcessedDelegate:(id<RCRTCIWSampleBufferVideoFrameDelegate> _Nullable)delegate;

+ (NSInteger)setRemoteVideoProcessedDelegate:(id<RCRTCIWPixelBufferVideoFrameDelegate> _Nullable)delegate
                                      userId:(NSString *)userId;

+ (NSInteger)setLocalCustomVideoProcessedDelegate:(id<RCRTCIWSampleBufferVideoFrameDelegate> _Nullable)delegate
                                              tag:(NSString *)tag;

+ (NSInteger)setRemoteCustomVideoProcessedDelegate:(id<RCRTCIWPixelBufferVideoFrameDelegate> _Nullable)delegate
                                            userId:(NSString *)userId
                                               tag:(NSString *)tag;

@end
