import { useNavigation } from '@react-navigation/native';
import { Container, HStack, Stack, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const FooterView = () => {
    const navigation = useNavigation();
    return (
        <Container style={styles.container}>
            <Stack direction="column" style={styles.stack}>
                <HStack space="5">
                    <Text onPress={() => navigation.navigate('Login')}>
                        Home
                    </Text>
                    <Text onPress={() => navigation.navigate('About')}>
                        About
                    </Text>
                    <Text onPress={() => navigation.navigate('Sponsor')}>
                        Sponsor
                    </Text>
                    <Text onPress={() => navigation.navigate('Terms')}>
                        Terms
                    </Text>
                    <Text onPress={() => navigation.navigate('Privacy')}>
                        Privacy
                    </Text>
                    <Text onPress={() => navigation.navigate('Contact')}>
                        Contact
                    </Text>
                </HStack>
                <HStack alignItems="center" mt="5">
                    <Text>
                        @{new Date().getFullYear()} Temple University SP23
                        Bucketlist Project Team{' '}
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
        position: 'flex-end',
        bottom: 0,
        marginVertical: 50
    },
    stack: {
        alignSelf: 'center',
        alignItems: 'center'
    }
});
