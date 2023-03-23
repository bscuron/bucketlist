import React, { memo, useEffect, useContext, useState, useRef } from 'react';
import { Context } from '../../App';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import {
    Icon,
    Tooltip,
    VStack,
    HStack,
    Input,
    TextArea,
    IconButton,
    AlertDialog,
    Button
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationMenu, Event } from '../components';

/**
 * Screen component for home screen (list view)
 */
const HomeScreen = () => {
    const navigation = useNavigation();
    const { navigating, setNavigating } = useContext(Context);
    const [creatingEvent, setCreatingEvent] = useState<boolean>(false);

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
                            onPress={() => setCreatingEvent(true)}
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

                <AlertDialog
                    leastDestructiveRef={useRef(null)}
                    isOpen={creatingEvent}
                    onClose={() => setCreatingEvent(false)}
                >
                    <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>New Event</AlertDialog.Header>
                        <AlertDialog.Body>
                            <VStack space={4}>
                                <Input variant="outline" placeholder="Title" />
                                <TextArea
                                    autoCompleteType="text"
                                    placeholder="What is this event for?"
                                />
                                <Input
                                    variant="outline"
                                    placeholder="Address"
                                />
                            </VStack>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                                <Button
                                    variant="unstyled"
                                    colorScheme="coolGray"
                                    onPress={() => setCreatingEvent(false)}
                                >
                                    Close
                                </Button>
                                <Button
                                    colorScheme="success"
                                    onPress={() => {
                                        setCreatingEvent(false);
                                    }}
                                >
                                    Create
                                </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
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
