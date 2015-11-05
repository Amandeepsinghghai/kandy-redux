import kandy from 'kandy-js';
import {isFSA} from 'flux-standard-action';
import constants from './constants';
import {loginSuccess, loginFailure} from './internalActions';

var apiKey;

function loginStarted({dispatch, action}) {
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
}

function logout() {
    kandy.logout();
}

// Rather than having a long switch statement, let's use a map of
// interceptor functions keyed to the action type that we want to
// act on.
const interceptors = {};
interceptors[constants.LOGIN_STARTED] = loginStarted;
interceptors[constants.LOGOUT] = logout;

function middleware({dispatch, getState}) {
    return next => action => {
        if(isFSA(action) && interceptors[action.type]) {
            interceptors[action.type]({dispatch, getState, action});
        }

        return next(action);
    };
}

export default function createMiddleware(key) {
    // TODO: Add a warning if proper apiKey is not given
    apiKey = key;
    return middleware;
}
