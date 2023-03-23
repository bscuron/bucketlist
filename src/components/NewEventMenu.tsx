import React, { useRef, useState, useContext } from 'react';
import { Context } from '../../App';
import {
    AlertDialog,
    VStack,
    Input,
    TextArea,
    Button,
    FormControl
} from 'native-base';
import openMap from 'react-native-open-maps';

type NewEventData = {
    title?: string;
    description?: string;
    location?: string;
};

const NewEventMenu = () => {
    const { creatingEvent, setCreatingEvent } = useContext(Context);
    const [data, setData] = useState<NewEventData>({});
    const [errors, setErrors] = useState<NewEventData>({});

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
                        <FormControl isRequired isInvalid={'title' in errors}>
                            <FormControl.Label>Title</FormControl.Label>
                            <Input
                                variant="outline"
                                placeholder="Camping with friends"
                            />
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={'description' in errors}
                        >
                            <FormControl.Label>Description</FormControl.Label>
                            <TextArea
                                autoCompleteType="text"
                                placeholder="What is this event for?"
                            />
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={'location' in errors}
                        >
                            <FormControl.Label>Location</FormControl.Label>
                            <Input
                                variant="outline"
                                placeholder="Yosemite National Park"
                                onChangeText={(value) => {
                                    setData({
                                        ...data,
                                        location: value
                                    });
                                }}
                            />
                        </FormControl>
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
                                    query: data.location
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
