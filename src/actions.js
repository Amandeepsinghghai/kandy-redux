import constants from './constants';

export default {
    login(username, password) {
        return {
            type: constants.LOGIN,
            payload: { username, password }
        };
    },

    loginSSO(userAccessToken) {
        return {
            type: constants.LOGIN_SSO,
            payload: { userAccessToken }
        };
    },

    logout() {
        return {
            type: constants.LOGOUT
        };
    },

    sendMessage(fullUserId, message, options){
        return {
            type: constants.SEND_MESSAGE,
            payload: { fullUserId, message, options }
        };
    },

    makeCall(userName, cameraOn, callerId, options) {
        return {
            type: constants.MAKE_CALL,
            payload: { userName, cameraOn, callerId, options }
        };
    },

    endCall(callId) {
        return {
            type: constants.END_CALL,
            payload: { callId }
        };
    },

    holdCall(callId) {
        return {
            type: constants.HOLD_CALL,
            payload: { callId }
        }
    },

    unholdCall(callId) {
        return {
            type: constants.UNHOLD_CALL,
            payload: { callId }
        }
    },

    muteCall(callId) {
        return {
            type: constants.MUTE_CALL,
            payload: { callId }
        }
    },

    unmuteCall(callId) {
        return {
            type: constants.UNMUTE_CALL,
            payload: { callId }
        }
    },

    initMedia(force, options) {
        return {
            type: constants.INIT_MEDIA,
            payload: { force, options }
        };
    }
}
