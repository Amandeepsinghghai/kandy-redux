import {handleActions} from 'redux-actions';
import constants, { mediaErrors } from '../constants';

const reducers = {};

reducers[constants.INIT_MEDIA_FINISH] = (state, action) => {
    return action.payload;
};

reducers[constants.MEDIA_ERROR] = (state, action) => {

    var canCall = false;
    if(action.payload.error.type === mediaErrors.NO_SCREENSHARING_WARNING) {
        // This case is just a warning. Calls work; screenshare doesn't.
        canCall = true;
    }

    return {
        callSupport: canCall,
        screenshareSupport: false,
        error: {
            type: action.payload.error.type,
            urls: {
                win32bit: action.payload.error.urlWin32bit,
                win64bit: action.payload.error.urlWin64bit,
                macUnix: action.payload.error.urlMacUnix
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
