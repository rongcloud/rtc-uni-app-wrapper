package cn.rongcloud.rtc.uni.beauty;

import com.alibaba.fastjson.JSONObject;

import cn.rongcloud.rtc.uni.RCUniRtcModule;
import cn.rongcloud.rtc.uni.beauty.beauty.BeautyVideoOutputFrameListener;
import io.dcloud.feature.uniapp.annotation.UniJSMethod;
import io.dcloud.feature.uniapp.bridge.UniJSCallback;
import io.dcloud.feature.uniapp.common.UniModule;


/**
 * Created by RongCloud on 2022/1/25.
 */
public class RCUniFaceBeautifierModule extends UniModule {

	private static final String TAG = "RCUniFaceBeautifier";

	@UniJSMethod(uiThread = true)
	public void openBeauty(UniJSCallback callback) {
		int code = -1;
		if (beautyVideoOutputFrameListener == null) {
			beautyVideoOutputFrameListener = new BeautyVideoOutputFrameListener();
			code = RCUniRtcModule.setLocalVideoProcessedListener(beautyVideoOutputFrameListener);
		}
		if (callback != null) {
			callback.invoke(code);
		}
	}

	@UniJSMethod(uiThread = true)
	public void closeBeauty(UniJSCallback callback) {
		int code = -1;
		if (beautyVideoOutputFrameListener != null) {
			code = RCUniRtcModule.setLocalVideoProcessedListener(null);
			beautyVideoOutputFrameListener.destroy();
			beautyVideoOutputFrameListener = null;
		}
		if (callback != null) {
			callback.invoke(code);
		}
	}

	private BeautyVideoOutputFrameListener beautyVideoOutputFrameListener;
}
