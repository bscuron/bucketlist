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



const AboutScreen = () => {
    // placeholder
    return (<ScrollView>
        
    </ScrollView>);
}

export default memo(AboutScreen);