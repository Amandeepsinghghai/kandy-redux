import kandy from 'kandy-js';
import constants from '../constants';
import {loginSuccess, loginFailure, mediaSuccess, mediaFailure} from '../internalActions';

export default function createCallInterceptors({apiKey, dispatch}) {
    return {
        [constants.MAKE_CALL]: function(action) {
            const options = action.payload.options || {};
            const remoteVideoContainer =
                document.getElementById(options.remoteVideoContainer);
            const localVideoContainer =
                document.getElementById(options.localVideoContainer);

            kandy.call.makeCall(
                action.payload.userName,
                action.payload.cameraOn,
                action.payload.callerId,
                {remoteVideoContainer, localVideoContainer}
            );
        },

        [constants.END_CALL]: function(action) {
            kandy.call.endCall(action.payload.callId);
        },

        /**
         * Interceptor for Kandy's initMedia function.
         */
        [constants.INIT_MEDIA]: function(action) {
            kandy.call.initMedia(
                function success() {
                    dispatch(mediaSuccess());
                },
                function failure(errorCode) {
                    /**
                     * Don't meed to do anything,
                     * since the mediaError event will
                     * handle the failure.
                     */
                },
                action.payload.force,
                action.payload.options
            );
        }
    }
};
