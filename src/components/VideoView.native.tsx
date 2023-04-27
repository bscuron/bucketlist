import React from 'react';
import { Video, ResizeMode, VideoReadyForDisplayEvent } from 'expo-av';
import { StyleSheet } from 'react-native';

const VideoView = () => {
    return (
        <Video
            style={styles.video}
            source={{
                uri: 'https://cis-linux2.temple.edu/~tun07683/Bucketlist_intro_v2.mp4'
            }}
            useNativeControls={true}
            resizeMode={ResizeMode.CONTAIN}
        />
    );
};

export default VideoView;

const styles = StyleSheet.create({
    video: {
        alignSelf: 'center',
        marginTop: 50,
        height: 200,
        width: 320
    }
});
