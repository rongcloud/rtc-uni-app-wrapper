const RCUniFUBeauty = uni.requireNativePlugin('RongCloud-FUBeauty-RCUniFUBeauty');
export default class RCFUBeautyEngine {
    /**
     * 注册相信美颜
     * 需要拥有相芯颁发的鉴权证书才能正常使用SDK的功能
     * @param authPackage 相芯提供的鉴权数据，将 iOS 鉴权数据 {} 内的所有数据复制到 js 的数组中，然后传入
     * @returns
     */
    static register(authPackage) {
        return new Promise((resolve) => {
            RCUniFUBeauty.registerBeauty(authPackage, (code) => {
                resolve(code);
            });
        });
    }
    /**
     * 重置美颜参数
     */
    static reset() {
        RCUniFUBeauty.reset();
    }
    /**
     * 开启/关闭美颜
     */
    static setBeautyEnable(enable) {
        return new Promise((resolve) => {
            RCUniFUBeauty.setBeautyEnable(enable, (code) => {
                resolve(code);
            });
        });
    }
    /**
     * 设置显示角度
     * @param orientation 0:home键在下方, 1:home键在右侧, 2:home键在上方, 3:home键在左侧
     */
    static setDisplayOrientation(orientation) {
        RCUniFUBeauty.setDisplayOrientation(orientation);
    }
    /**
     * 设置是否前置摄像头
     * @param front
     */
    static setIsFrontCamera(front) {
        RCUniFUBeauty.setIsFrontCamera(front);
    }
    /**
     * 设置滤镜名称以及强度
     * @param name
     * @param level
     */
    static setFilter(name, level) {
        RCUniFUBeauty.setFilter(name, level);
    }
    /**
     * 设置美白强度
     * @param level 取值范围 0.0-1.0, 0.0为无效果，1.0为最大效果
     */
    static setSkinWhitenLevel(level) {
        RCUniFUBeauty.setSkinWhitenLevel(level);
    }
    /**
     * 设置红润强度
     * @param level 取值范围 0.0-1.0, 0.0为无效果，1.0为最大效果
     */
    static setSkinRedLevel(level) {
        RCUniFUBeauty.setSkinRedLevel(level);
    }
    /**
     * 设置锐化强度
     * @param level 取值范围0.0-1.0
     */
    static setSharpenLevel(level) {
        RCUniFUBeauty.setSharpenLevel(level);
    }
    /**
     * 设置磨皮配置
     * @param type 0清晰磨皮 1朦胧磨皮 2精细磨皮 3均匀磨皮
     * @param detectSkin 肤色检测开关，false 为关，true 为开
     * @param nonSkinBlurScale 肤色检测之后非肤色区域的融合强度，取值范围0.0-1.0
     */
    static setSkinBlurOption(type, detectSkin, nonSkinBlurScale = 0.45) {
        RCUniFUBeauty.setSkinBlurOption(type, detectSkin, nonSkinBlurScale);
    }
    /**
     * 设置磨皮强度
     * @param level 取值范围 0.0-6.0
     */
    static setSkinBlurLevel(level) {
        RCUniFUBeauty.setSkinBlurLevel(level);
    }
    /**
     * 设置亮眼强度
     * @param level 取值范围 0.0-1.0, 0.0为无效果，1.0为最大效果
     */
    static setEyeBrightLevel(level) {
        RCUniFUBeauty.setEyeBrightLevel(level);
    }
    /**
     * 设置美牙强度
     * @param level 取值范围 0.0-1.0, 0.0为无效果，1.0为最大效果
     */
    static setToothWhitenLevel(level) {
        RCUniFUBeauty.setToothWhitenLevel(level);
    }
    /**
     * 设置美型类型
     * @param shape  0:女神变形 1:网红变形 2:自然变形 3:默认变形 4:精细变形
     */
    static setFaceShape(shape) {
        RCUniFUBeauty.setFaceShape(shape);
    }
    /**
     * 设置美型强度
     * @param level 取值范围 0.0-1.0, 0.0为无效果，1.0为最大效果
     */
    static setFaceShapeLevel(level) {
        RCUniFUBeauty.setFaceShapeLevel(level);
    }
    /**
     * 设置美型渐变帧数
     * @param frameCount 0 为关闭渐变，大于0开启渐变，值为渐变所需要的帧数
     */
    static setFaceShapeChangeFrames(frameCount) {
        RCUniFUBeauty.setFaceShapeChangeFrames(frameCount);
    }
    /**
     * 设置大眼强度
     * @param level 取值范围 0.0-1.0,  0.0为无效果，1.0为最大效果
     */
    static setEyeEnlargingLevel(level) {
        RCUniFUBeauty.setEyeEnlargingLevel(level);
    }
    /**
     * 设置圆眼强度
     * @param level 取值范围 0.0-1.0,  0.0为无效果，1.0为最大效果
     */
    static setEyeCircleLevel(level) {
        RCUniFUBeauty.setEyeCircleLevel(level);
    }
    /**
     * 设置瘦脸强度
     * @param level 范围0.0-1.0
     */
    static setCheekThinningLevel(level) {
        RCUniFUBeauty.setCheekThinningLevel(level);
    }
    /**
     * 设置V脸强度
     * @param level 范围0.0-1.0
     */
    static setCheekVLevel(level) {
        RCUniFUBeauty.setCheekVLevel(level);
    }
    /**
     * 设置窄脸强度
     * @param level 取值范围 0.0-1.0,  0.0为无效果，1.0为最大效果
     */
    static setCheekNarrowLevel(level) {
        RCUniFUBeauty.setCheekNarrowLevel(level);
    }
    /**
     * 设置小脸强度
     * @param level 取值范围 0.0-1.0,  0.0为无效果，1.0为最大效果
     */
    static setCheekSmallLevel(level) {
        RCUniFUBeauty.setCheekSmallLevel(level);
    }
    /**
     * 设置瘦鼻强度
     * @param intensity 取值范围 0.0-1.0,  0.0为无效果，1.0为最大效果
     */
    static setNoseIntensity(intensity) {
        RCUniFUBeauty.setNoseIntensity(intensity);
    }
    /**
     * 设置额头调整强度
     * @param intensity 取值范围 0.0-1.0,  0.5-0是变小，0.5-1是变大
     */
    static setForeheadIntensity(intensity) {
        RCUniFUBeauty.setForeheadIntensity(intensity);
    }
    /**
     * 设置嘴巴调整强度
     * @param intensity 取值范围 0.0-1.0,  0.5-0.0是变小，0.5-1.0是变大
     */
    static setMouthIntensity(intensity) {
        RCUniFUBeauty.setMouthIntensity(intensity);
    }
    /**
     * 设置下巴调整强度
     * @param intensity 取值范围 0.0-1.0,  0.5-0是变小，0.5-1是变大
     */
    static setChinIntensity(intensity) {
        RCUniFUBeauty.setChinIntensity(intensity);
    }
    /**
     * 设置去除黑眼圈强度
     * @param intensity 取值范围 0.0-1.0,  0.0为无效果，1.0为最大效果
     */
    static setRemovePouchIntensity(intensity) {
        RCUniFUBeauty.setRemovePouchIntensity(intensity);
    }
    /**
     * 设置去除法令纹强度
     * @param intensity 取值范围 0.0-1.0,  0.0为无效果，1.0为最大效果
     */
    static setRemoveNasalLinesIntensity(intensity) {
        RCUniFUBeauty.setRemoveNasalLinesIntensity(intensity);
    }
    /**
     * 设置开眼角强度
     * @param intensity 取值范围 0.0-1.0,  0.0为无效果，1.0为最大效果
     */
    static setEpicanthoplastyIntensity(intensity) {
        RCUniFUBeauty.setEpicanthoplastyIntensity(intensity);
    }
    /**
     * 设置微笑嘴角强度
     * @param intensity 取值范围 0.0-1.0,  0.0为无效果，1.0为最大效果
     */
    static setSmileIntensity(intensity) {
        RCUniFUBeauty.setSmileIntensity(intensity);
    }
    /**
     * 设置人中强度
     * @param intensity 取值范围 0.0-1.0,  0.5-0.0是变短，0.5-1.0是变长
     */
    static setPhiltrumIntensity(intensity) {
        RCUniFUBeauty.setPhiltrumIntensity(intensity);
    }
    /**
     * 设置鼻子长度
     * @param intensity 取值范围 0.0-1.0,  0.5-0.0是变长，0.5-1.0是变短
     */
    static setNoseLengthIntensity(intensity) {
        RCUniFUBeauty.setNoseLengthIntensity(intensity);
    }
    /**
     * 设置眼睛间距
     * @param intensity 取值范围 0.0-1.0,  0.5-0.0是变大，0.5-1.0是变小
     */
    static setEyeSpaceIntensity(intensity) {
        RCUniFUBeauty.setEyeSpaceIntensity(intensity);
    }
    /**
     * 设置眼睛角度
     * @param intensity 取值范围 0.0-1.0,  0.5-0.0逆时针旋转，0.5-1.0顺时针旋转
     */
    static setEyeRotateIntensity(intensity) {
        RCUniFUBeauty.setEyeRotateIntensity(intensity);
    }
    /**
     * 设置瘦下颌骨强度
     * @param level 取值范围 0.0-1.0,  0.0为无效果，1.0为最大效果
     */
    static setJawThinningLevel(level) {
        RCUniFUBeauty.setJawThinningLevel(level);
    }
    /**
     * 设置瘦颧骨强度
     * @param level 瘦颧骨强度，取值范围 0.0～1.0，1.0 强度最强
     * 此接口仅在 setFaceShape 为 4 时生效
     */
    static setCheekbonesThinningLevel(level) {
        RCUniFUBeauty.setCheekbonesThinningLevel(level);
    }
}
