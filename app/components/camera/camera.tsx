import React from 'react'
import { RNCamera } from 'react-native-camera';
import { observer } from "mobx-react-lite"
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useCamera } from 'react-native-camera-hooks';



export const Camera = observer(function ({ initialProps }) {

        const [
            { cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording },
            {
                toggleFacing,
                touchToFocus,
                textRecognized,
                facesDetected,
                recordVideo,
                setIsRecording,
            },
        ] = useCamera(initialProps);

        return (
            <View style={{ flex: 1 }}>

                <RNCamera
                    ref={cameraRef}
                    autoFocusPointOfInterest={autoFocusPoint.normalized}
                    type={type}
                    ratio={ratio}
                    style={{ flex: 1 }}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    autoFocus={autoFocus}
                    onTextRecognized={textRecognized}
                    onFacesDetected={facesDetected} />

                <TouchableWithoutFeedback
                    style={{
                        flex: 1,
                    }}
                    onPress={touchToFocus} />
                <TouchableOpacity
                    testID="button"
                    onPress={toggleFacing}
                    style={{ width: '100%', height: 45 }}>
                    {type}
                </TouchableOpacity>

                {!isRecording && (
                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                setIsRecording(true);
                                const data = await recordVideo();
                                console.warn(data);
                            } catch (error) {
                                console.warn(error);
                            } finally {
                                setIsRecording(false);
                            }
                        } }
                        style={{ width: '100%', height: 45 }} />
                )}
            </View>
        );
    }