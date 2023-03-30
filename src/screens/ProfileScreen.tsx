import React, { memo, useEffect, useContext, useState } from 'react';
import { Context } from '../../App';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import {
    VStack,
    Center,
    Avatar,
    Box,
    Heading,
    Stack,
    Text,
    Container,
    IconButton,
    HStack
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Profile } from '../types';
import { EditProfileMenu, NewEventMenu } from '../components';
import axios from 'axios';

const ProfileScreen = () => {
    const [profile, setProfile] = useState<Profile>();
    const { token, logout, setEditProfile, setCreatingEvent } =
        useContext(Context);

    // GET request to retrieve user's profile data
    useEffect(() => {
        axios
            .get('https://cis-linux2.temple.edu/bucketlistBackend/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                setProfile(res.data);
                console.log(res.data);
            })
            .catch(logout);
    }, []);

    // TODO: replace with skeleton (https://docs.nativebase.io/skeleton) that actual layout
    if (!profile) {
        return <Text>Loading profile data...</Text>;
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <VStack space={2} maxW="80" alignSelf="center" margin={10}>
                    <Stack direction="row" space={40} margin={5}>
                        <Center>
                            <Avatar
                                source={require('../../assets/profile_image_placeholder.png')}
                                size="xl"
                                borderWidth="2"
                                borderColor="blue.200"
                            >
                                <Avatar.Badge bg="blue.500">
                                    <IconButton
                                        size="xs"
                                        _icon={{
                                            as: MaterialIcons,
                                            name: 'edit',
                                            color: 'white'
                                        }}
                                        //onPress={};
                                    />
                                </Avatar.Badge>
                            </Avatar>
                        </Center>
                        <Center position={'absolute'} right={0} bottom={0}>
                            <Heading size={'md'}>{profile.username}</Heading>
                        </Center>
                    </Stack>
                    <Container alignItems="flex-end" maxW="80">
                        <IconButton
                            size="md"
                            variant="semi"
                            _icon={{
                                as: MaterialIcons,
                                name: 'edit',
                                color: 'blue.500'
                            }}
                            onPress={() => setEditProfile(true)}
                        ></IconButton>
                    </Container>
                    <Stack direction={'column'} maxW={80}>
                        <Box bg={'white'} borderRadius={20}>
                            <Text ml={2} mt={2} fontSize={20}>
                                {profile.first_name}
                            </Text>
                            <Text margin={2}>{profile.introduction}</Text>
                        </Box>
                        <HStack>
                            <Box
                                position="relative"
                                ml="2"
                                mt="10"
                                _text={{
                                    color: 'grey',
                                    fontSize: 16
                                }}
                            >
                                Up Coming Events
                            </Box>
                            <IconButton
                                h="2"
                                w="2"
                                ml="2"
                                alignSelf="flex-end"
                                size="md"
                                _icon={{
                                    as: MaterialIcons,
                                    name: 'event',
                                    color: 'blue.500'
                                }}
                                onPress={() => setCreatingEvent(true)}
                            />
                        </HStack>
                    </Stack>
                </VStack>
                <EditProfileMenu />
                <NewEventMenu />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
export default memo(ProfileScreen);
