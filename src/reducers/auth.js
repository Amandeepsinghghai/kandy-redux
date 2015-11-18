import {handleActions} from 'redux-actions';
import constants from '../constants';

const reducers = {};
reducers[constants.LOGIN_FINISH] = (state, action) => ({
    currentUsername: action.payload.username,
    isAuthenticated: true
});

reducers[constants.LOGOUT] = () => ({
    currentUsername: '',
    isAuthenticated: false
});

// This creates a reducer function made up of many reducers.
// The key is the action type for each reducer. The `next`
// function is for successful actions and `throw` is for
// error actions. When a value is a function instead of
// an object, the same function is used for success and failure
export default handleActions(reducers, {});
