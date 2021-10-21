import {action, flow, makeObservable, observable} from 'mobx';
import userApi from '../../apis/userApi';
/**
 * class for register user state
 */
class UserStore {
  user = {};
  isLoading = false;
  isError = false;
  /**
   *constructor function which defines mobx observable, actions, flows
   */
  constructor() {
    makeObservable(this, {
      user: observable,
      isLoading: observable,
      isError: observable,
      setLoading: action,
      setError: action,
      setUser: action,
      registerUser: flow,
    });
  }

  /**
   * setter loading status
   * @param {boolean}
   */
  setLoading(status) {
    this.isLoading = status;
  }
  /**
   * setter for error status
   * @param {boolean}
   */
  setError(status) {
    this.isError = status;
  }

  /**
   * setter for user object
   * @param {object} user
   */
  setUser(user) {
    this.user = user;
  }
  /**
   * flow for registering user
   * @param {object} user // should have properties : firstName, lastName, email, passowrd
   */
  *registerUser(user) {
    try {
      this.setLoading(true);
      const response = yield userApi.registeruserApi(user);
      if (response.status) {
        this.setUser({
          isAuthenticated: true,
          name: response.data.user.displayName,
        });
        this.setError(false);
      } else {
        this.setUser({
          isAuthenticated: false,
        });
        this.setError(true);
      }
      this.setLoading(false);
    } catch (error) {}
  }
}

export default new UserStore();
