import kandy from 'kandy-js';
import constants from '../constants';
import {loginSuccess, loginFailure} from '../internalActions';

export default function createCoreInterceptors({apiKey, dispatch}) {
    return {
        [constants.LOGIN]: function(action) {
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

        [constants.LOGIN_SSO]: function(action) {

            // Check whether the SSO user is anonymous.
            var isAnonymous = false;
            if(action.payload.userAccessToken.indexOf('AUAT') === 0) {
                isAnonymous = true;
            }

            kandy.loginSSO(
                action.payload.userAccessToken,
                function success(result) {
                    dispatch(loginSuccess(result.user_id, isAnonymous));
                },
                function failure() {
                    dispatch(loginFailure());
                }
            );
        },

        [constants.LOGOUT]: function() {
            kandy.logout();
        }
    };
}
