import React from 'react';
import {View, TextInput, Text} from 'react-native';

const InputComponent = ({type, label, error, ...restConfig}) => {
  switch (type) {
    case 'textInput':
      return (
        <View>
          <Text>{label}</Text>
          <TextInput {...restConfig} />
          <Text>{error}</Text>
        </View>
      );

    default:
      null;
  }
};

export default InputComponent;
