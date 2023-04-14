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
                        keep all your memory without regrat.
                    </Text>
                </VStack>
                <Spacer size="10" />
            </VStack>
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
