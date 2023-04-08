import { Box, Divider, Heading, Text, VStack } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Box>
                <VStack alignSelf="center" maxW="80%">
                    <Heading mt='5'>Privacy Policy</Heading>
                    <Divider mt='2' mb='2' />
                    <Text style={styles.paragraph}>
                        We at 2023 Temple University SP23 BucketList Project
                        Team respect the privacy of our users and are committed
                        to protecting their personal information. This Privacy
                        Policy explains how we collect, use, and disclose
                        information in connection with our web application
                        Bucketlist (the "Web Application").
                    </Text>
                    <Text style={styles.subHeading}>
                        1.Information Collection
                    </Text>
                    <Text style={styles.paragraph}></Text>
                    <Text style={styles.paragraph}></Text>
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%'
    },
    subHeading:{
        fontSize: 18,
        fontWeight: '600',
        marginVertical:10
    },
    paragraph: {
        fontSize:16
    }
});
