import React from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const loginHandler = () => {
    auth()
      .createUserWithEmailAndPassword(
        'paritosh.mahale1@cuelogic.com',
        'admin@123',
      )
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('userCredential', userCredential);
        // ...
      })
      .catch(error => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <View>
      <Text>Login screen </Text>
      <Button title="Login" onPress={loginHandler} />
    </View>
  );
};

export default LoginScreen;
