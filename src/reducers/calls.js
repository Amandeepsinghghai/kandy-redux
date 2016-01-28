import {handleActions} from 'redux-actions';
import constants from '../constants';
import {updateArrayItem} from '../helpers'

const reducers = {};

/*
 * This reducer maintains an array of call objects for each active call
 */
reducers[constants.CALL_INITIATED] = (state, action) => {
    return state.concat({
        callId: action.payload.callId,
        remoteVideoState: action.payload.remoteVideoState,
        status: 'initiated'
    });
};

reducers[constants.CALL_ESTABLISHED] = (state, action) => {
    return state.map((call) => {
        // Don't change other calls
        if (call.callId !== action.payload.callId) {
            return call
        }

        call.status = 'established';
        call.remoteVideoState = action.payload.remoteVideoState;
        return call
    });
};

reducers[constants.CALL_ENDED] = (state, action) => {
    // filter out the call that was ended
    return state.filter((call) => {
        return call.callId !== action.payload.callId;
    });
};

reducers[constants.HOLD_CALL] = (state, action) => {
    return updateArrayItem(state, call => call.callId === action.payload.callId, { isOnHold: true });
};

reducers[constants.UNHOLD_CALL] = (state, action) => {
   return updateArrayItem(state, call => call.callId === action.payload.callId, { isOnHold: false });
};

reducers[constants.MUTE_CALL] = (state, action) => {
    return updateArrayItem(state, call => call.callId === action.payload.callId, { isMuted: true });
};

reducers[constants.UNMUTE_CALL] = (state, action) => {
   return updateArrayItem(state, call => call.callId === action.payload.callId, { isMuted: false });
};

// This creates a reducer function made up of many reducers.
// The key is the action type for each reducer. The `next`
// function is for successful actions and `throw` is for
// error actions. When a value is a function instead of
// an object, the same function is used for success and failure
export default handleActions(reducers, []);
