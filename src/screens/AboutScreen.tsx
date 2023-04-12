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
                        keep all your memory without regrat.
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
