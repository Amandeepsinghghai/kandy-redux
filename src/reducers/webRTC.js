import {handleActions} from 'redux-actions';
import constants from '../constants';

/**
 * webRTC reducers.
 * Handles actions related to media/webRTC support.
 */
const reducers = {};

// Default state for webRTC reducers.
const defaultState = {
    initialized: false
};

/**
 * screenshareWarning
 * This is a workaround for Kandy's NO_SCREENSHARING_WARNING scenario.
 * In this scenario, the media [error] event is triggered first,
 * then the success callback is called. Meaning the MEDIA_ERROR
 * reducer acts, then the INIT_MEDIA_FINISH reducer acts,
 * overwriting what MEDIA_ERROR just did. So if the
 * NO_SCREENSHARING_WARNING scenario occured for MEDIA_ERROR,
 * we need INIT_MEDIA_FINISH to return the same state that
 * MEDIA_ERROR is suppose to return.
 */
var screenshareWarning = false;

/**
 * INIT_MEDIA_FINISH
 * Handles the callbacks for initMedia.
 */
reducers[constants.INIT_MEDIA_FINISH] = (state, action) => {

    if(screenshareWarning) {
        // This case is a hack. See the comment above.
        screenshareWarning = false;
        return {
            initialized: true,
            callSupport: true,
            screenshareSupport: false,
            error: {
                type: constants.mediaErrors.NO_SCREENSHARING_WARNING
            }
        };
    } else {
        // No error means we have full support.
        return {
            initialized: true,
            callSupport: true,
            screenshareSupport: true
        };
    }
};

/**
 * MEDIA_ERROR
 * Handles the media [error] event.
 */
reducers[constants.MEDIA_ERROR] = (state, action) => {

    var canCall = false;
    if(action.payload.error.type === constants.mediaErrors.NO_SCREENSHARING_WARNING) {
        // This case is just a warning. Calls work; screenshare doesn't.
        canCall = true;
        // This is a hack. See the comment above.
        screenshareWarning = true;
    }

    var error = {
        type: action.payload.error.type
    };
    // Include the urls if they are part of the error.
    // If one of the urls are present, then they all are.
    if("urlWin32bit" in action.payload.error) {
        error.urls = {
            win32bit: action.payload.error.urlWin32bit,
            win64bit: action.payload.error.urlWin64bit,
            macUnix: action.payload.error.urlMacUnix
        };
    }

    return {
        initialized: true,
        callSupport: canCall,
        screenshareSupport: false,
        error
    };
};



// This creates a reducer function made up of many reducers.
// The key is the action type for each reducer. The `next`
// function is for successful actions and `throw` is for
// error actions. When a value is a function instead of
// an object, the same function is used for success and failure
export default handleActions(reducers, defaultState);
