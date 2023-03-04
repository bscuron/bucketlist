import React, { memo, useState, useEffect } from 'react';
import { Navigation } from '../types';
import { StyleSheet, ScrollView } from 'react-native';
import { Heading } from 'native-base';

type Props = {
    navigation: Navigation;
};

const DBScreen = ({ navigation }: Props) => {
    return <Heading>TODO: show database contents</Heading>;
};

export default memo(DBScreen);
