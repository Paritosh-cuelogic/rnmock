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

const RegisterScreen = ({UserStore}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  /**
   * form sumit handler
   */
  const registeFormHandler = () => {
    let isFormValid = true;

    // validate first name
    const firstNameValidationError = validate('First name', email, {
      isRequired: true,
    });
    if (firstNameValidationError) {
      setFirstNameError(firstNameValidationError);
      isFormValid = false;
    } else {
      setFirstNameError('');
    }

    // validate last name
    const lastNameValidationError = validate('Last name', email, {
      isRequired: true,
    });
    if (lastNameValidationError) {
      setLastNameError(lastNameValidationError);
      isFormValid = false;
    } else {
      setLastNameError('');
    }

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
      UserStore.registerUser({
        firstName,
        lastName,
        email,
        password,
      }).then(() => {});
    }
  };

  return (
    <View>
      {UserStore.isError ? <Error /> : null}
      <InputComponent
        type="textInput"
        label="First Name"
        placeholder="Enter First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        error={firstNameError}
      />
      <InputComponent
        type="textInput"
        label="Last Name"
        placeholder="Enter Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
        error={lastNameError}
      />
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
          <Button title="Register" onPress={registeFormHandler} />
        )}
      </View>
    </View>
  );
};

export default inject('UserStore')(observer(RegisterScreen));
