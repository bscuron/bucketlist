import React, { memo, useState, useEffect } from 'react';
import { Navigation } from '../types';
import { StyleSheet, ScrollView } from 'react-native';
import { VStack, HStack, Heading, Text } from 'native-base';
import axios from 'axios';

type Props = {
    navigation: Navigation;
};

type DBRow = {
    id: number;
    username: string;
    email: string;
    password: string;
};

const DBScreen = ({ navigation }: Props) => {
    const [data, setData] = useState<DBRow[]>([]);

    // Runs on component mount
    useEffect(() => {
        axios
            .get('https://cis-linux2.temple.edu/bucketlistBackend/database')
            .then((res) => {
                const rows = res.data.rows.map((row: DBRow) => (
                    <HStack space={3}>
                        <Text>{row.id}</Text>
                        <Text>{row.username}</Text>
                        <Text>{row.email}</Text>
                        <Text>{row.password}</Text>
                    </HStack>
                ));
                setData((data) => [...data, rows]);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <VStack space={4}>
            <HStack space={3}>
                <Heading>ID</Heading>
                <Heading>USERNAME</Heading>
                <Heading>PASSWORD</Heading>
            </HStack>
            {data}
        </VStack>
    );
};

export default memo(DBScreen);
