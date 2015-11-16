import kandy from 'kandy-js';
import constants from '../constants';
import {loginSuccess, loginFailure} from '../internalActions';

export default function createCallInterceptors() {
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
        }
    }
};