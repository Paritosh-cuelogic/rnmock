import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
const registeruserApi = async user => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      user.email,
      user.password,
    );
    const update = {
      displayName: `${user.firstName} ${user.lastName}`,
    };
    await firebase.auth().currentUser.updateProfile(update);
    return {status: true, data: userCredential};
  } catch (error) {
    return {status: false};
  }
};

export default {
  registeruserApi,
};
