import React, { useRef, useState, useContext } from 'react';
import { Context } from '../../App';
import { AlertDialog, VStack, Input, TextArea, Button } from 'native-base';
import openMap from 'react-native-open-maps';

type NewEventData = {
    title?: string;
    description?: string;
    address?: string;
};

const NewEventMenu = () => {
    const { creatingEvent, setCreatingEvent } = useContext(Context);
    const [data, setData] = useState<NewEventData>({});

    return (
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
                            onChangeText={(value) => {
                                setData({
                                    ...data,
                                    address: value
                                });
                            }}
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
                                openMap({
                                    query: data.address
                                });
                                setCreatingEvent(false);
                            }}
                        >
                            Create
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default NewEventMenu;
