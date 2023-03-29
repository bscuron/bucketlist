import React, { useRef, useState, useContext } from 'react';
import { Context } from '../../App';
import {
    AlertDialog,
    VStack,
    Input,
    TextArea,
    Button,
    FormControl,
    Select,
    CheckIcon
} from 'native-base';
import axios from 'axios';

type NewProfileData = {
    first_name?: string,
    last_name?: string,
    gender?: string,
    dob?: string,
    introduction?: string,
    photo?: string
};

const EditProfile = () => {
    const { token, editProfile, setEditProfile } = useContext(Context);
    const [data, setData] = useState<NewProfileData>({});
    const [position, setPosition] = useState('auto');
    // const [errors, setErrors] = useState<newProfileData>({});
    // const submit = async () => {
    //     //if (!validate()) return;
    //
    //     try {
    //         const result = await axios.post(
    //             'https://cis-linux2.temple.edu/bucketlistBackend/database/profile/edit/',
    //             {
    //                 first_name: data.first_name,
    //                 last_name: data.last_name,
    //                 gender: data.gender,
    //                 dob: data.dob,
    //                 introduction: data.introduction
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json'
    //                 }
    //             }
    //         );
    //
    //         // TODO: alert the user that the event was created
    //         setEditProfile(false);
    //         setData({});
    //        // setErrors({});
    //     } catch (_) {
    //     }
    // };
    //
    // const validate = (): boolean => {
    //     return validateTitle(data.title) && validateLocation(data.location);
    // };

    // const validateTitle = (title: string | undefined): boolean => {
    //     if (title == undefined || title.length < 1) {
    //         setErrors({
    //             ...errors,
    //             title: 'Event title is required'
    //         });
    //         return false;
    //     }
    //     delete errors.title;
    //     return true;
    // };

    // const validateLocation = (location: string | undefined): boolean => {
    //     if (location == undefined || location.length < 1) {
    //         setErrors({
    //             ...errors,
    //             location: 'Event location is required'
    //         });
    //         return false;
    //     }
    //     delete errors.location;
    //     return true;
    // };

    return (
        <AlertDialog
            leastDestructiveRef={useRef(null)}
            isOpen={editProfile}
            onClose={() => setEditProfile(false)}
        >
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Edit Profile</AlertDialog.Header>
                <AlertDialog.Body>
                    <VStack space={4}>
                        <FormControl>
                            <FormControl.Label>First Name</FormControl.Label>
                            <Input
                                variant='outline'
                                placeholder='Alex'
                                onChangeText={(value) => {
                                    setData({ ...data, first_name: value });
                                }}
                            />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Last Name</FormControl.Label>
                            <Input
                                variant='outline'
                                placeholder='Yellostone'
                                onChangeText={(value) => {
                                    setData({ ...data, last_name: value });
                                }}
                            />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Gender</FormControl.Label>
                            <Select
                                selectedValue={position} mx={{
                                base: 0,
                                md: 'auto'
                            }} onValueChange={nextValue => {
                                setPosition(nextValue);
                                setData({ ...data, gender: nextValue });
                            }} _selectedItem={{
                                bg: 'cyan.600',
                                endIcon: <CheckIcon size={4} />
                            }}
                                accessibilityLabel='Select'>
                                <Select.Item label='Male' value='Male' />
                                <Select.Item label='Female' value='Female' />
                                <Select.Item label='Hide' value='Other' />
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Date of Birth</FormControl.Label>
                            <Input
                                variant='outline'
                                placeholder='yyyy-mm-dd'
                                onChangeText={(value) => {
                                    setData({ ...data, dob: value });
                                }}
                            />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Introduction</FormControl.Label>
                            <TextArea
                                autoCompleteType='text'
                                placeholder='Tell poeple about yourself'
                                onChangeText={(value) => {
                                    setData({ ...data, introduction: value });
                                }}
                            />
                        </FormControl>
                    </VStack>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button
                            variant='unstyled'
                            colorScheme='coolGray'
                            onPress={() => setEditProfile(false)}
                        >
                            Close
                        </Button>
                        <Button
                            colorScheme='success'
                            onPress={() => {
                                submit();
                            }}
                        >
                            Save
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default EditProfile;
