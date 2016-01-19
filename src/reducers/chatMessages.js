import {handleActions} from 'redux-actions';
import constants from '../constants';

const reducers = {};

/*
 * This reducer maintains an array of chatMessage objects sent/received successfully
 */
reducers[constants.SEND_MESSAGE_FINISH] = {
    next(state, action) {
        return [...state, action.payload.message];
    },
    throw(state) {
        return state;
    }
};

reducers[constants.MESSAGE_RECEIVED] = (state, action) => {
    return [...state, action.payload.message];
};

// This creates a reducer function made up of many reducers.
// The key is the action type for each reducer. The `next`
// function is for successful actions and `throw` is for
// error actions. When a value is a function instead of
// an object, the same function is used for success and failure
export default handleActions(reducers, []);
