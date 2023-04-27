import { ResizeMode, Video, VideoReadyForDisplayEvent } from 'expo-av';
import { Heading, ScrollView, Spacer, Text, VStack } from 'native-base';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { FooterView } from '../components';

const AboutScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Spacer size="10" />
            <VStack>
                <VStack style={styles.banner}>
                    <Heading size="3xl">Welcome to Bucketlist!</Heading>
                    <Text fontSize="16">
                        Check off and complete your wish list with friends, and
                        keep all your memory without regret.
                    </Text>
                    <VStack space="5" mt="5">
                        <Text fontSize="16">
                            Bucketlist provides the ability to create an
                            interactive list of activities you may want to
                            accomplish. With this list, you can connect with old
                            and new friends to complete these activities and
                            live a more fulfilled life. Many times, we want to
                            do things but never do them. Bucketlist is intended
                            to get people out and to accomplish their goals.
                            With the help of social connection and common
                            interests, users can connect and live the life they
                            want to live instead of daydreaming but never doing.
                        </Text>
                        <Text fontSize="16">
                            Through social connection and event tracking and
                            planning we can all reach our goals. Not only will
                            your upcoming events be available on your bucket
                            list, you can also view your friends upcoming events
                            too! We hope you can check off your list and try fun
                            activities you might not have thought about!
                        </Text>
                    </VStack>
                    <Video
                        style={styles.video}
                        source={{
                            uri: 'https://cis-linux2.temple.edu/~tun07683/Bucketlist_promotion_video_v3.mp4'
                        }}
                        useNativeControls={true}
                        resizeMode={ResizeMode.CONTAIN}
                        onReadyForDisplay={(
                            videoData: VideoReadyForDisplayEvent
                        ) => {
                            if(Platform.OS == 'android' || Platform.OS == 'ios'){
                                return;
                            }
                            videoData.srcElement.style.position = 'initial';
                        }}
                    />
                </VStack>
            </VStack>
            <FooterView />
        </ScrollView>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%',
        backgroundColor: 'white'
    },
    bannerBox: {
        maxWidth: '100%'
    },
    banner: {
        alignSelf: 'center',
        maxWidth: '80%',
        marginTop: 90,
        paddingBottom: 20
    },
    video: {
        alignSelf: 'center',
        marginTop: 50,
        ...Platform.select({
            ios: {
                height: 200,
                width: 320
            },
            android: {
                height: 200,
                width: 320
            },
            default: {
                height: 400,
                width: 620,
                maxWidth: '90%'
            }
        })
    }
});
