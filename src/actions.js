import constants from './constants';

export function login(username, password) {
    return {
        type: constants.LOGIN_STARTED,
        payload: {
            username,
            password
        }
    };
}
