import kandy from 'kandy-js';
import {loginSuccess, loginFailure} from '../internalActions';

var apiKey;

var core = {
    loginStarted({dispatch, action}) {
        kandy.login(
            apiKey,
            action.payload.username,
            action.payload.password,
            function success() {
                dispatch(loginSuccess(action.payload.username));
            },
            function failure() {
                dispatch(loginFailure(action.payload.username));
            }
        );
    },

    logout() {
        kandy.logout();
    }
};

export default function createCore(key) {
    apiKey = key;
    return core;
}
