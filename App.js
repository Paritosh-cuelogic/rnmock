import React, {useEffect} from 'react';
import initFireBase from './utils/firebaseConfig';

import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
const App = () => {
  useEffect(() => {
    initFireBase();
  }, []);

  return <RegisterScreen />;
};

export default App;
