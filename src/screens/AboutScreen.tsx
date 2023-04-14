import { useNavigation } from '@react-navigation/native';
import {
    Box,
    Button,
    Container,
    HStack,
    Heading,
    ScrollView,
    Spacer,
    Text,
    VStack
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FooterView } from '../components';

const AboutScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Spacer size="10" />
            <VStack>
                <VStack style={styles.banner}>
                    <Heading size="3xl">Welcome to BucketList!</Heading>
                    <Text fontSize="16">
                        Check off and complete your wish list with friends, and
                        keep all your memory without regret.
                    </Text>

                    <Text fontSize="16">
                        BucketList provides the ability to create an interactive list of activities 
                        you may want to accomplish. With this list, you can connect with old and 
                        new friends to complete these activities and live a more fulfilled life. 
                        Many times, we want to do things but never do them. BucketList is 
                        intended to get people out and to accomplish their goals. 
                        With the help of social connection and common interests' users can 
                        connect and live the life they want to live instead of daydreaming but never doing.
                    </Text>
                    <Text fontSize="16">
                        Through social connection and event tracking and planning we can all reach our goals. 
                        Not only will your upcoming events be available on your bucket list, you can also view
                         your friends upcoming events too! 
                        This gives people incentive to get out and try new things!
                    </Text>
                </VStack>
                
            </VStack>
            <Spacer size="10" />
            <Container position="fixed" bottom="0" alignSelf="center">
                <FooterView />
            </Container>
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
    }
});
