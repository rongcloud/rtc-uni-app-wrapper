//
//  RCUniFaceBeautifier.m
//  RCUniFaceBeautifier
//
//  Created by RongCloud on 1/24/22.
//
#import "RCUniFaceBeautifier.h"
#import <RCUniRtc/RCUniRtc.h>
#import "GPUImage/GPUImageHandle.h"

#ifndef dispatch_main_async_safe
#define dispatch_main_async_safe(block)\
    if (dispatch_queue_get_label(DISPATCH_CURRENT_QUEUE_LABEL) == dispatch_queue_get_label(dispatch_get_main_queue())) {\
        block();\
    } else {\
        dispatch_async(dispatch_get_main_queue(), block);\
    }
#endif


@interface RCUniFaceBeautifier () <RCRTCIWSampleBufferVideoFrameDelegate>

@property (nonatomic, strong, nullable) GPUImageHandle *imageHandle;

@end

@implementation RCUniFaceBeautifier

- (void)dealloc {
    [RCUniRtc setLocalVideoProcessedDelegate:nil];
    self.imageHandle = nil;
}

UNI_EXPORT_METHOD(@selector(openBeauty:));
- (void)openBeauty:(UniModuleKeepAliveCallback)callback {
    dispatch_main_async_safe(^{
        self.imageHandle = [[GPUImageHandle alloc] init];
        [self.imageHandle onlyBeauty];
        NSInteger code = [RCUniRtc setLocalVideoProcessedDelegate:self];
        if (callback) {
            callback(@(code), false);
        }
    });
    
}

UNI_EXPORT_METHOD(@selector(closeBeauty:));
- (void)closeBeauty:(UniModuleKeepAliveCallback)callback  {
    dispatch_main_async_safe(^{
        NSInteger code = [RCUniRtc setLocalVideoProcessedDelegate:nil];
        if (callback) {
            callback(@(code), false);
        }
    });
}

- (nonnull CMSampleBufferRef)onSampleBuffer:(nonnull CMSampleBufferRef)sampleBuffer {
    CMSampleBufferRef processedSampleBuffer = [self.imageHandle onGPUFilterSource:sampleBuffer];
    return processedSampleBuffer ?: sampleBuffer;
}

@end


