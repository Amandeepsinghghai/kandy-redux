import kandy from 'kandy';
import constants from './constants';
import {loginSuccess, loginFailure} from './internalActions';

var apiKey;

function loginStarted({dispatch, action}) {
    // TODO: Add a warning if apiKey is not set
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

// Rather than having a long switch statement, let's use a map of
// interceptor functions keyed to the action type that we want to
// act on.
const interceptors = {};
interceptors[constants.LOGIN_STARTED] = loginStarted;

function middleware({dispatch, getState}) {
    return next => action => {
        if(typeof action === 'object' && action.type && interceptors[action.type]) {
            interceptors[action.type]({dispatch, getState, action});
        }

        return next(action);
    };
}

export default function createMiddleware(key) {
    apiKey = key;
    return middleware;
}
