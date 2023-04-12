import { Center, ScrollView } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const ContactScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Center>contact us</Center>
        </ScrollView>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center'
    }
});
