import { useNavigation } from '@react-navigation/native';
import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    ScrollView,
    Spacer,
    Text,
    VStack
} from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FooterView } from '../components';

const AboutScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Spacer size="10" />
            <VStack style={styles.body}>
                <VStack style={styles.banner}>
                    <Heading size="3xl">Welcome to BucketList!</Heading>
                    <Text fontSize="16">
                        Check off and complete your wish list with friends, and
                        keep all your memory without regret.

                        BucketList is an application to help create a more 
                        interactive bucket list of activities you want to accomplish. 
                        With this list you can connect with old and new friends to complete 
                        these activities and live a more fulfilled life. Many times, 
                        we want to do things but never do them. BucketList is intended 
                        to get people up and going to accomplish their goals. With the help of 
                        social connection and common interests' you can connect and 
                        live the life you want to live instead of daydreaming but never doing.

                    </Text>
                </VStack>
                <Spacer size="10" />
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
    banner: {
        flexDirection: 'column',
        marginVertical: 10,
        alignSelf: 'flex-start'
    },
    body: {
        marginTop: 20,
        maxWidth: '80%',
        width: 1200,
        alignSelf: 'center',
        alignItems: 'center',
        space: 5
    }
});
