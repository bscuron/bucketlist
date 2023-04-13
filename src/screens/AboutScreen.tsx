import React, { memo, useState, useContext } from 'react';
import { Context } from '../../App';
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
    Text,
    Alert,
    Slide
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

/**
 * 
 * 
 */

const AboutScreen = () => {
    const navigation = useNavigation();
    // placeholder
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <HStack>
                <span style={{ fontWeight: 'bold' }}>About Bucketlist</span>
                    
                </HStack>
                
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default memo(AboutScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center'
    }
});