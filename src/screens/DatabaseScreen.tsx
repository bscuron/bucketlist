import React, { memo, useState, useEffect, useContext } from 'react';
import { Context } from '../../App';
import { VStack, HStack, Heading, Text } from 'native-base';
import axios from 'axios';

type DBRow = {
    id: number;
    username: string;
    email: string;
    password: string;
    secret: string;
    r_datetime: string;
};

const DatabaseScreen = () => {
    const [data, setData] = useState<DBRow[]>([]);
    const { token, setToken } = useContext(Context);

    // Runs on component mount
    useEffect(() => {
        axios
            .get('https://cis-linux2.temple.edu/bucketlistBackend/database', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                const rows = res.data.rows.map((row: DBRow) => (
                    <HStack space={3}>
                        <Text>{row.id}</Text>
                        <Text>{row.username}</Text>
                        <Text>{row.email}</Text>
                        <Text>{row.password}</Text>
                        <Text>{row.secret}</Text>
                        <Text>{row.r_datetime}</Text>
                    </HStack>
                ));
                setData((data) => [...data, rows]);
            })
            .catch((_) => {
                // Remove JWT from AsyncStorage on failed request
                setToken('');
            });
    }, []);

    return (
        <VStack space={4}>
            <HStack space={3}>
                <Heading>ID</Heading>
                <Heading>USERNAME</Heading>
                <Heading>PASSWORD</Heading>
                <Heading>SECRET</Heading>
                <Heading>RDATETIME</Heading>
            </HStack>
            {data}
        </VStack>
    );
};

export default memo(DatabaseScreen);
