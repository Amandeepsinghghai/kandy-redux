import {handleActions} from 'redux-actions';
import constants from '../constants';

const reducers = {};
reducers[constants.CALL_INITIATED] = (state, action) => {
    state.push(action.payload)
    return state;
};

// This creates a reducer function made up of many reducers.
// The key is the action type for each reducer. The `next`
// function is for successful actions and `throw` is for
// error actions. When a value is a function instead of
// an object, the same function is used for success and failure
export default handleActions(reducers, []);
