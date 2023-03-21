import React, { memo, useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../App';
import {
    View,
    Box,
    VStack,
    HStack,
    Heading,
    Text,
    Actionsheet,
    Icon
} from 'native-base';
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
    const [showNavigation, setShowNavigation] = useState<boolean>(false);
    const { token, removeItem } = useContext(Context);
    const navigation = useNavigation();

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
                removeItem('token');
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
                    onPress={() => setShowNavigation(!showNavigation)}
                    color="black"
                    size="2xl"
                    mx="3%"
                />
            )
        });
    }, [navigation]);

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
            <Actionsheet
                isOpen={showNavigation}
                onClose={() => setShowNavigation(false)}
            >
                <Actionsheet.Content>
                    <Box
                        w="100%"
                        h={60}
                        px={4}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Heading size="md">Bucketlist</Heading>
                    </Box>
                    <Actionsheet.Item>Home</Actionsheet.Item>
                    <Actionsheet.Item isDisabled>Database</Actionsheet.Item>
                    <Actionsheet.Item>Profile</Actionsheet.Item>
                    <Actionsheet.Item>Map</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => setShowNavigation(false)}>
                        Cancel
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </View>
    );
};

export default memo(DatabaseScreen);
