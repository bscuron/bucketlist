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
import { Profile } from '../types';
import axios from 'axios';

interface ProfileProps {
    profile: Profile;
    onUpdateProfile: (updatedProfile: Profile) => void;
}

type ProfileData = {
    first_name?: string;
    last_name?: string;
    gender?: string;
    dob?: string;
    introduction?: string;
    photo?: string;
};

const EditProfileMenu: React.FC<ProfileProps> = ({
    profile,
    onUpdateProfile
}) => {
    const { token, editProfile, setEditProfile, logout } = useContext(Context);
    const [data, setData] = useState<ProfileData>({});
    const [showDeleteAccountModal, setShowDeleteAccountModal] =
        useState<boolean>(false);

    const submit = async () => {
        console.log(
            data.first_name,
            data.last_name,
            data.gender,
            data.dob,
            data.introduction
        );
        try {
            await axios.post(
                'https://cis-linux2.temple.edu/bucketlistBackend/profile/edit',
                {
                    ...profile,
                    ...data
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            setEditProfile(false);
            onUpdateProfile({ ...profile, ...data });
            setData({});
        } catch (_) {}
    };

    const deleteAccount = async () => {
        try {
            await axios.delete(
                'https://cis-linux2.temple.edu/bucketlistBackend/delete',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            setEditProfile(false);
            setShowDeleteAccountModal(false);
            logout();
        } catch (_) {}
    };

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
                                variant="outline"
                                placeholder="Alex"
                                defaultValue={profile.first_name}
                                onChangeText={(value) => {
                                    setData({ ...data, first_name: value });
                                }}
                                value={data.first_name}
                            />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Last Name</FormControl.Label>
                            <Input
                                variant="outline"
                                placeholder="Yellostone"
                                defaultValue={profile.last_name}
                                onChangeText={(value) => {
                                    setData({ ...data, last_name: value });
                                }}
                            />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Gender</FormControl.Label>
                            <Select
                                selectedValue={profile.gender}
                                mx={{
                                    base: 0,
                                    md: 'auto'
                                }}
                                onValueChange={(value) => {
                                    setData({ ...data, gender: value });
                                }}
                                _selectedItem={{
                                    bg: 'cyan.600',
                                    endIcon: <CheckIcon size={4} />
                                }}
                                placeholder="Select from"
                            >
                                <Select.Item label="Male" value="Male" />
                                <Select.Item label="Female" value="Female" />
                                <Select.Item label="Hide" value="Other" />
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Date of Birth</FormControl.Label>
                            <Input
                                variant="outline"
                                placeholder="yyyy-mm-dd"
                                defaultValue={profile.dob}
                                onChangeText={(value) => {
                                    setData({ ...data, dob: value });
                                }}
                            />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Introduction</FormControl.Label>
                            <TextArea
                                autoCompleteType="text"
                                placeholder="Tell poeple about yourself"
                                defaultValue={profile.introduction}
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
                            variant="unstyled"
                            colorScheme="coolGray"
                            onPress={() => setEditProfile(false)}
                        >
                            Close
                        </Button>
                        <Button
                            colorScheme="danger"
                            onPress={() =>
                                setShowDeleteAccountModal(
                                    !showDeleteAccountModal
                                )
                            }
                        >
                            Delete Account
                        </Button>
                        <AlertDialog
                            leastDestructiveRef={useRef(null)}
                            isOpen={showDeleteAccountModal}
                            onClose={() =>
                                setShowDeleteAccountModal(
                                    !showDeleteAccountModal
                                )
                            }
                        >
                            <AlertDialog.Content>
                                <AlertDialog.CloseButton />
                                <AlertDialog.Header>
                                    Delete Account
                                </AlertDialog.Header>
                                <AlertDialog.Body>
                                    Are you sure you want to delete your
                                    account? This action cannot be undone.
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                    <Button.Group space={2}>
                                        <Button
                                            variant="unstyled"
                                            colorScheme="coolGray"
                                            onPress={() =>
                                                setShowDeleteAccountModal(
                                                    !showDeleteAccountModal
                                                )
                                            }
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            colorScheme="danger"
                                            onPress={() => deleteAccount()}
                                        >
                                            Delete
                                        </Button>
                                    </Button.Group>
                                </AlertDialog.Footer>
                            </AlertDialog.Content>
                        </AlertDialog>
                        <Button
                            colorScheme="success"
                            onPress={() => {
                                submit();
                            }}
                        >
                            Update
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default EditProfileMenu;
