import React, { memo, useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../App';
import { View, VStack, HStack, Heading, Text, Icon } from 'native-base';
import { NavigationMenu } from '../components';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

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
    const navigation = useNavigation();
    const { token, logout, navigating, setNavigating } = useContext(Context);

    // Runs on component mount
    useEffect(() => {
        axios
            .get(
                'https://cis-linux2.temple.edu/bucketlistBackend/database/users',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((res) => {
                const rows = res.data.rows.map((row: DBRow) => (
                    <HStack key={row.id} space={3}>
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
                logout();
            });
    }, []);

    useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        navigation.setOptions({
            headerRight: () => (
                <Icon
                    as={Ionicons}
                    name="menu"
                    onPress={() => setNavigating(!navigating)}
                    color="black"
                    size="2xl"
                    mx="3%"
                />
            )
        });
    }, [navigation]);

    // TODO: send request to invalidate token on backend when logging out
    return (
        <View>
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
            <NavigationMenu />
        </View>
    );
};

export default memo(DatabaseScreen);
