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
import axios from 'axios';
import { parseDate } from 'chrono-node';

type NewEventData = {
    title?: string;
    description?: string;
    location?: string;
    datetime?: Date;
};

const NewEventMenu = () => {
    const { token, creatingEvent, setCreatingEvent } = useContext(Context);
    const [data, setData] = useState<NewEventData>({});
    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        location?: string;
        datetime?: string;
    }>({});

    const submit = async () => {
        if (!validate()) return;

        try {
            const result = await axios.post(
                'https://cis-linux2.temple.edu/bucketlistBackend/database/events/create',
                {
                    title: data.title,
                    description: data.description,
                    location: data.location,
                    host_datetime: data.datetime
                        ? data.datetime
                              .toISOString()
                              .slice(0, 19)
                              .replace('T', ' ')
                        : null
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            // TODO: alert the user that the event was created
            setCreatingEvent(false);
            setData({});
            setErrors({});
        } catch (_) {}
    };

    const validate = (): boolean => {
        return (
            !('datetime' in errors) &&
            validateTitle(data.title) &&
            validateLocation(data.location)
        );
    };

    const validateTitle = (title: string | undefined): boolean => {
        if (title == undefined || title.length < 1) {
            setErrors({
                ...errors,
                title: 'Event title is required'
            });
            return false;
        }
        delete errors.title;
        return true;
    };

    const validateLocation = (location: string | undefined): boolean => {
        if (location == undefined || location.length < 1) {
            setErrors({
                ...errors,
                location: 'Event location is required'
            });
            return false;
        }
        delete errors.location;
        return true;
    };

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
                                onChangeText={(value) => {
                                    setData({ ...data, title: value });
                                    validateTitle(value);
                                }}
                            />
                            <FormControl.ErrorMessage>
                                {errors.title}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Description</FormControl.Label>
                            <TextArea
                                autoCompleteType="text"
                                placeholder="What is this event for?"
                                onChangeText={(value) => {
                                    setData({ ...data, description: value });
                                }}
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
                                    validateLocation(value);
                                }}
                            />
                            <FormControl.ErrorMessage>
                                {errors.location}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={'datetime' in errors}
                        >
                            <FormControl.Label>Date & Time</FormControl.Label>
                            <Input
                                variant="outline"
                                placeholder="Tomorrow at 5pm"
                                onChangeText={(value) => {
                                    const date = parseDate(value);
                                    if (
                                        !date ||
                                        new Date().setMilliseconds(0) >
                                            date.setMilliseconds(0)
                                    ) {
                                        setErrors({
                                            ...errors,
                                            datetime: 'Invalid date'
                                        });
                                        return;
                                    }
                                    delete errors.datetime;
                                    setData({
                                        ...data,
                                        datetime: date
                                    });
                                }}
                            />
                            <FormControl.ErrorMessage>
                                {errors.datetime}
                            </FormControl.ErrorMessage>
                            <FormControl.HelperText>
                                {data.datetime
                                    ? data.datetime.toLocaleString()
                                    : ''}
                            </FormControl.HelperText>
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
                                submit();
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
