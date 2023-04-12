import { Box, Container, HStack, Stack, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const FooterView = () => {
    const navigation = useNavigation();
    return (
        <Container style={styles.container}>
            <Stack direction="column" style={styles.stack}>
                <HStack space="5">
                    <Text onPress={() => navigation.navigate('About')}>
                        About Us
                    </Text>
                    <Text onPress={() => navigation.navigate('Sponsor')}>
                        Sponsor Us
                    </Text>
                    <Text onPress={() => navigation.navigate('Terms')}>
                        Terms
                    </Text>
                    <Text onPress={() => navigation.navigate('Privacy')}>
                        Privacy Policy
                    </Text>
                    <Text onPress={() => navigation.navigate('Contact')}>
                        Contact Us
                    </Text>
                </HStack>
                <HStack alignItems="center" mt="5">
                    <Text>
                        @{new Date().getFullYear()} Temple University SP23
                        BucketList Project Team{' '}
                    </Text>
                </HStack>
            </Stack>
        </Container>
    );
};

export default FooterView;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        maxWidth: '100%',
        position: 'fixed',
        bottom: 0,
        marginVertical: 50
    },
    stack: {
        alignSelf: 'center',
        alignItems: 'center'
    }
});
