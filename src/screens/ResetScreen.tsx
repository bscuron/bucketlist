import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
    Alert,
    Box,
    Button,
    Center,
    FormControl,
    HStack,
    Heading,
    Input,
    Slide,
    Text,
    VStack,
    View
} from 'native-base';
import React, { memo, useContext, useState } from 'react';import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet
} from 'react-native';

let timeouts: Array<NodeJS.Timeout> = new Array<NodeJS.Timeout>();

const ResetScreen=()=>{
    const navigation = useNavigation();
    const [newPassword, setNewPassword] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);      
      };

    const handleReset=async()=>{
           //   'https://cis-linux2.temple.edu/bucketlistBackend/reset',


           if(newPassword==""){
            alert("Fill New Paswword field!")
           }else{

           try {
            const result = await axios.post(
                'http://localhost:5000/reset',
                {
                    newPassword:newPassword                  
                }
            );

            if(result.data == 'OK'){
                setShowSuccessAlert(true);
                timeouts.push(
                    setTimeout(() => {
                        setShowSuccessAlert(false);
                    }, 3000)
                );

                toggleModal();
                navigation.navigate('Login');
                 setNewPassword("");
            }


        } catch (error) {
              console.log(error);
        }

        }
          //HARD CODED FOR TESTING

        // if(newPassword != ""){
        //     toggleModal();
        //     setNewPassword("");
        // }
    }

    return(
        <View >
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <VStack space="5">
                    <Center>
                    <Box safeArea p="2" w="90%" maxW="290" py="8">
                            <Heading size="xl">Reset Password</Heading>
                            <Heading mt="1" size="sm">
                               Enter New Password!
                            </Heading>
                            <VStack space={3} mt="5">
                            <FormControl isRequired>
                                    <FormControl.Label>
                                       New Password
                                    </FormControl.Label>
                                    <Input
                                        size="lg"
                                        type="password"
                                        onChangeText={(value) => {
                                         setNewPassword(value)
                                        }}
                                    />
                                </FormControl>
                                <Button
                                    onPress={handleReset}
                                    mt="2"
                                    colorScheme="indigo"
                                >
                                    Reset
                                </Button>
                             </VStack>  

                    </Box>    

                        <Slide in={showSuccessAlert} placement="top">
                        <Alert justifyContent="center" status="success">
                            <Alert.Icon />
                            <Text color="success.600" fontWeight="medium">
                            You Have been emailed link to reset Password!
                            </Text>
                        </Alert>
                        </Slide>  
                    </Center>
                 </VStack>
                 </KeyboardAvoidingView>  

        </View>
    )
}

export default memo(ResetScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center'
    }
});