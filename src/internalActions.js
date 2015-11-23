import constants from './constants';

// These actions should not be dispatched outside of kandy-redux
export function loginSuccess(username) {
    return {
        type: constants.LOGIN_FINISH,
        payload: {
            username
        }
    };
}

export function loginFailure(username) {
    return {
        type: constants.LOGIN_FINISH,
        payload: new Error(username + ' was not logged in due to an error.'),
        error: true
    };
}

export function callInitiated(callId, remoteVideoState) {
    return {
        type: constants.CALL_INITIATED,
        payload: { callId, remoteVideoState }
    };
}

export function callEstablished(callId, remoteVideoState) {
    return {
        type: constants.CALL_ESTABLISHED,
        payload: { callId, remoteVideoState }
    };
}

export function callEnded(callId) {
    return {
        type: constants.CALL_ENDED,
        payload: { callId }
    }
}
