import {
    Box,
    Button,
    Center,
    Container,
    Divider,
    Flex,
    HStack,
    Heading,
    ScrollView,
    Spacer,
    Text,
    VStack
} from 'native-base';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { FooterView } from '../components';
import { useNavigation } from '@react-navigation/native';

const AboutScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Spacer size="10" />
            <VStack style={styles.body}>
                <VStack style={styles.banner} space="2" alignSelf="flex-start">
                    <Heading size="4xl">Hello World!</Heading>
                    <Text fontSize="16">
                        check off and complete your wish list with friends, and
                        keep all your memory without regrat.
                    </Text>
                </VStack>
                <HStack
                    alignSelf="flex-start"
                    mt="10"
                    space="5"
                    mb="5"
                    bg="amber.100"
                >
                    <Text fontSize="2xl" mt="10">
                        show your picture
                    </Text>
                    <Text fontSize="lg" maxW="50%">
                        Create a profile to introduce yourself to the community.
                        check it out!
                    </Text>
                </HStack>
                <Button onPress={() => navigation.navigate('Login')} mb="10">
                    Back to home, testing use
                </Button>
            </VStack>
            <Divider />
            <Container
                alignSelf="center"
                position="fixed"
                bottom="0"
                mb="10"
                mt="10"
            >
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
    body: {
        marginTop: 20,
        maxWidth: '80%',
        width: 1200,
        alignSelf: 'center',
        alignItems: 'center',
        space: 5
    },
    banner: {}
});
