import React, {useEffect} from 'react';
import {Provider} from 'mobx-react';
import initFireBase from './utils/firebaseConfig';
import rootStore from './state/rootStore';

import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
const App = () => {
  useEffect(() => {
    initFireBase();
  }, []);

  return (
    <Provider {...rootStore}>
      <RegisterScreen />
    </Provider>
  );
};

export default App;
