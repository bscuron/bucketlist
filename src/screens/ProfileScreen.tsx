import React, { memo, useEffect, useContext } from 'react';
import { Context } from '../../App';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {
    Icon,
    VStack,
    Center,
    Image,
    Box,
    Heading,
    Stack,
    Text
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationMenu } from '../components';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { navigating, setNavigating } = useContext(Context);

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

    return (
        <Box>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <VStack space={2} alignItems="center" margin={10}>
                        <Stack direction="row" space={40} margin={5}>
                            <Center>
                                <Image
                                    source={require('../../assets/bucketlist_logo_white_background.png')}
                                    size={100}
                                    borderRadius={100}
                                    alt="image"
                                />
                            </Center>
                            <Center position={'absolute'} right={0} bottom={0}>
                                <Heading size={'md'}>Username</Heading>
                            </Center>
                        </Stack>

                        <Stack direction={'column'} maxW={80}>
                            <Box flex={'right'} mr={1}>
                                Edit
                            </Box>
                            <Box bg={'white'} borderRadius={20}>
                                <Text ml={2} mt={2} fontSize={20}>
                                    First Name
                                </Text>
                                <Text margin={2}>
                                    Welcome to the profile! See the introduction
                                    here go and have a look Let see what we can
                                    find in here. hello world ! check out my
                                    profile
                                </Text>
                            </Box>
                            <Text position={'relative'} ml={2} mt={10}>
                                Up Coming Events
                            </Text>
                        </Stack>
                    </VStack>
                    <NavigationMenu />
                </KeyboardAvoidingView>
            </ScrollView>
        </Box>
    );
};

export default memo(ProfileScreen);
