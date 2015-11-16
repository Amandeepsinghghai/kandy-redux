import {isFSA} from 'flux-standard-action';
import constants from '../constants';
import createKandyInterceptors from './kandyInterceptors';

export default function createMiddleware(apiKey) {
    return ({dispatch, getState}) => {
        // TODO: Add a warning if proper apiKey is not given

        // Rather than having a long switch statement, let's use a map of
        // interceptor functions keyed to the action type that we want to
        // act on.
        const interceptors = createKandyInterceptors({apiKey, dispatch, getState});

        return next => action => {
            if(isFSA(action) && interceptors[action.type]) {
                interceptors[action.type](action);
            }

            return next(action);
        };
    };
}
