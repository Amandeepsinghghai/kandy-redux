import {handleActions} from 'redux-actions';
import constants from '../constants';

const reducers = {};

reducers[constants.INIT_MEDIA_FINISH] = (state, action) => {
    return {
        support: '11' // TODO: Temporary.
    };
};

reducers[constants.MEDIA_ERROR] = (state, action) => {
    return {
        support: '00', // TODO: Temporary.
        error: {
            type: action.payload.type,
            urls: {
                win32bit: action.payload.urlWin32bit,
                win64bit: action.payload.urlWin64bit,
                macUnix: action.payload.urlMacUnix
            }
        }
    };
};

// This creates a reducer function made up of many reducers.
// The key is the action type for each reducer. The `next`
// function is for successful actions and `throw` is for
// error actions. When a value is a function instead of
// an object, the same function is used for success and failure
export default handleActions(reducers, {});
