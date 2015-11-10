import {isFSA} from 'flux-standard-action';
import constants from '../constants';
import createKandyHelper from './kandyHelper';

// Rather than having a long switch statement, let's use a map of
// interceptor functions keyed to the action type that we want to
// act on.
var interceptors = {};

function middleware({dispatch, getState}) {
    return next => action => {
        if(isFSA(action) && interceptors[action.type]) {
            interceptors[action.type]({dispatch, getState, action});
        }

        return next(action);
    };
}

export default function createMiddleware(apiKey) {
    // TODO: Add a warning if proper apiKey is not given
    const kandyHelper = createKandyHelper(apiKey);

    // Set the interceptors
    interceptors[constants.LOGIN_STARTED] = kandyHelper.core.loginStarted;
    interceptors[constants.LOGOUT] = kandyHelper.core.logout;

    return middleware;
}
