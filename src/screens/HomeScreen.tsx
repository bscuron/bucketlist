import React, { memo, useEffect, useContext } from 'react';
import { Context } from '../../App';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { Icon, Tooltip, HStack, Input, IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationMenu, Event } from '../components';

/**
 * Screen component for home screen (list view)
 */
const HomeScreen = () => {
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

    // BUG: when navigating to another screen and back, the images do
    // not appear. This should be fixed when the content of the page is
    // loaded dynamically
    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <HStack
                    space={5}
                    width="100%"
                    alignSelf="center"
                    justifyContent="Center"
                >
                    <Input
                        placeholder="Search for an event..."
                        alignSelf="center"
                        borderRadius="4"
                        minW="50%"
                        py="3"
                        px="1"
                        fontSize="14"
                        InputLeftElement={
                            <Icon
                                m="2"
                                ml="3"
                                size="6"
                                color="gray.400"
                                as={<MaterialIcons name="search" />}
                            />
                        }
                        InputRightElement={
                            <Icon
                                m="2"
                                mr="3"
                                size="6"
                                color="gray.400"
                                as={<MaterialIcons name="mic" />}
                            />
                        }
                    />
                    <Tooltip label="Create new event" openDelay={500}>
                        <IconButton
                            size="md"
                            variant="solid"
                            _icon={{
                                as: MaterialIcons,
                                name: 'add'
                            }}
                        />
                    </Tooltip>
                </HStack>
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <Event style={styles.event} />
                <NavigationMenu />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginLeft: '2%',
        marginRight: '2%'
    },
    event: {
        margin: 20
    }
});
