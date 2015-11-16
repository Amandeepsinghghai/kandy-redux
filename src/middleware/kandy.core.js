import kandy from 'kandy-js';
import constants from '../constants';
import {loginSuccess, loginFailure} from '../internalActions';

export default function createCoreInterceptors({apiKey, dispatch}) {
    return {
        [constants.LOGIN_STARTED]: function(action) {
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

        [constants.LOGOUT]: function() {
            kandy.logout();
        }
    };
}
