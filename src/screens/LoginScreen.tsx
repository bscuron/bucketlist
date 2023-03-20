import React, { memo, useState } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import {
    Center,
    VStack,
    HStack,
    Box,
    Heading,
    Input,
    FormControl,
    Button,
    Text
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

/**
 * Type for login form data
 */
type FormData = {
    username?: string;
    password?: string;
    code?: string;
};

/**
 * Screen component for login screen
 */
const LoginScreen = () => {
    const [data, setData] = useState<FormData>({});
    const navigation = useNavigation();

    /**
     * Submit user inputted data to backend for login authentication
     */
    const submit = async () => {};

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Center>
                    <Box safeArea p="2" w="90%" maxW="290" py="8">
                        <Heading size="xl">Welcome</Heading>
                        <Heading mt="1" size="sm">
                            Please log in!
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl isRequired>
                                <FormControl.Label>Username</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="text"
                                    onChangeText={(value) => {
                                        setData({ ...data, username: value });
                                    }}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="password"
                                    onChangeText={(value) => {
                                        setData({ ...data, password: value });
                                    }}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormControl.Label>MFA Code</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="password"
                                    onChangeText={(value) => {
                                        setData({ ...data, code: value });
                                    }}
                                />
                            </FormControl>

                            <Button
                                onPress={submit}
                                mt="2"
                                colorScheme="indigo"
                            >
                                Log In
                            </Button>
                            <HStack>
                                <Text>Don't have an account? </Text>
                                <Text
                                    onPress={() =>
                                        navigation.navigate('Signup')
                                    }
                                    underline
                                >
                                    Sign up
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>
                </Center>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default memo(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center'
    }
});
