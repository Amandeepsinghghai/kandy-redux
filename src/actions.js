import constants from './constants';

export default {
    login(username, password) {
        return {
            type: constants.LOGIN_STARTED,
            payload: {
                username,
                password
            }
        };
    },

    logout() {
        return {
            type: constants.LOGOUT
        };
    }
}
