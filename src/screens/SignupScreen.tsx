import React, { memo, useState, useEffect } from 'react';
import { Navigation } from '../types';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import axios from 'axios';

type Props = {
    navigation: Navigation;
};

const SignupScreen = ({ navigation }: Props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signup = () => {
        axios
            .post('https://cis-linux2.temple.edu/bucketlistBackend/signup', {
                username: username,
                email: email,
                password: password
            })
            .then((res) => {
                navigation.navigate('DBScreen');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleKeyPress = (event) => {
        if (event.nativeEvent.key != 'Enter') return;
        signup();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text variant="headlineLarge">Create Your Account</Text>
            <TextInput
                style={styles.input}
                value={username}
                mode="outlined"
                label="Username"
                right={<TextInput.Icon icon="account" />}
                onChangeText={(username) => setUsername(username)}
            />
            <TextInput
                style={styles.input}
                value={email}
                mode="outlined"
                label="Email"
                right={<TextInput.Icon icon="email" />}
                onChangeText={(email) => setEmail(email)}
            />
            <TextInput
                style={styles.input}
                value={password}
                mode="outlined"
                label="Password"
                secureTextEntry
                right={<TextInput.Icon icon="eye" />}
                onKeyPress={(event) => handleKeyPress(event)}
                onChangeText={(password) => setPassword(password)}
            />
            <Button
                style={styles.button}
                contentStyle={{ flexDirection: 'row-reverse' }}
                icon="arrow-right"
                mode="contained"
                onPress={() => signup()}
            >
                Sign up
            </Button>
        </KeyboardAvoidingView>
    );
};

export default memo(SignupScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        margin: 5,
        minWidth: 275
    },

    button: {
        marginTop: 5
    }
});
