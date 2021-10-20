import React, {useEffect} from 'react';
import initFireBase from './utils/firebaseConfig';

import LoginScreen from './Screens/LoginScreen/LoginScreen';

const App = () => {
  useEffect(() => {
    initFireBase();
  }, []);

  return <LoginScreen />;
};

export default App;
