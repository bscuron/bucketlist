import { Center, Container, Heading, ScrollView, VStack } from 'native-base';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FooterView } from '../components';

const ContactScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <VStack alignSelf="flex-start" space="5" maxW="80%" mt="10">
                <Heading mt="10">Contact us</Heading>
                <Text>
                    We appreicate for all your support. For any inquiry, please
                    email us through the following address:
                </Text>
                <Text>sp23projectteam1@gmail.com</Text>
                <Text>
                    We will reach back to you within 2 business days once we
                    recived your message.
                </Text>
            </VStack>
            <Container position="fixed" style={styles.footer}>
                <FooterView />
            </Container>
        </ScrollView>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        maxWidth: '100%'
    },
    footer: {
        bottom: 0,
        alignSelf: 'center'
    }
});
