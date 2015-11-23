import constants from './constants';

export default {
    login(username, password) {
        return {
            type: constants.LOGIN,
            payload: { username, password }
        };
    },

    logout() {
        return {
            type: constants.LOGOUT
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
    }
}
