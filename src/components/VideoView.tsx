import React from 'react';
import { Video, ResizeMode, VideoReadyForDisplayEvent } from 'expo-av';
import { StyleSheet } from 'react-native';

const VideoView = () => {
    return (
        <Video
            style={styles.video}
            posterSource={require('../../assets/AppIconbucketList.png')}
            usePoster={true}
            posterStyle={{height:200, width: 200, marginHorizontal: 200, marginVertical: 50}}
            source={{
                uri: 'https://cis-linux2.temple.edu/~tun07683/Bucketlist_intro_v2.mp4'
            }}
            useNativeControls={true}
            resizeMode={ResizeMode.CONTAIN}
            onReadyForDisplay={(videoData: VideoReadyForDisplayEvent) => {
                videoData.srcElement.style.position = 'initial';
            }}
        />
    );
};

export default VideoView;

const styles = StyleSheet.create({
    video: {
        alignSelf: 'center',
        marginTop: 50,
        height: 400,
        width: 620,
        maxWidth: '90%'
    }
});
