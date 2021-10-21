import React, {useState} from 'react';
import {View, Button} from 'react-native';
import {inject, observer} from 'mobx-react';
import validate from '../../utils/formValidation';
import InputComponent from '../../common/components/InputComponent';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '../../common/constants/formConstants';
import Loader from '../../common/components/Loader';
import Error from '../../common/components/Error';

const LoginScreen = ({UserStore}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  /**
   * form sumit handler
   */
  const loginFormHandler = () => {
    let isFormValid = true;

    // validate email
    const emailValidationError = validate('Email', email, {
      isRequired: true,
      isEmail: true,
    });
    if (emailValidationError) {
      setEmailError(emailValidationError);
      isFormValid = false;
    } else {
      setEmailError('');
    }
    // validate password
    const passwordValidationError = validate('Password', password, {
      isRequired: true,
      maxLength: PASSWORD_MAX_LENGTH,
      minLength: PASSWORD_MIN_LENGTH,
    });
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      isFormValid = false;
    } else {
      setPasswordError('');
    }

    // check if form is valid
    if (isFormValid) {
      console.log('Success');
      // pass user data to store
      UserStore.loginUser({
        email,
        password,
      });
    }
  };

  return (
    <View>
      {UserStore.isError ? <Error /> : null}
      <InputComponent
        type="textInput"
        label="Email"
        placeholder="Enter email"
        value={email}
        onChangeText={text => setEmail(text)}
        error={emailError}
      />
      <InputComponent
        type="textInput"
        label="Password"
        placeholder="Enter Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        error={passwordError}
      />
      <View>
        {UserStore.isLoading ? (
          <Loader />
        ) : (
          <Button title="Register" onPress={loginFormHandler} />
        )}
      </View>
    </View>
  );
};

export default inject('UserStore')(observer(LoginScreen));
