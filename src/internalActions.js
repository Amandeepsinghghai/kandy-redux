import constants from './constants';

// These actions should not be dispatched outside of kandy-redux
export function loginSuccess(username, isAnonymous = false) {
    return {
        type: constants.LOGIN_FINISH,
        payload: {
            username,
            isAnonymous
        }
    };
}

export function loginFailure(username) {
    return {
        type: constants.LOGIN_FINISH,
        payload: new Error('Could not log in due to an error.'),
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

/**
 * Action for initMedia's success callback.
 */
export function mediaSuccess() {
    return {
        type: constants.INIT_MEDIA_FINISH,
    };
}

/**
 * Action for initMedia's failure callback.
 */
export function mediaFailure(errorCode) {
    return {
        type: constants.INIT_MEDIA_FINISH,
        payload: new Error('Encountered webRTC support error. Code: ' + errorCode),
        error: true
    };
}

/**
 * Action for the media [error] event.
 */
export function mediaError(error) {
    return {
        type: constants.MEDIA_ERROR,
        payload: { error }
    };
}
