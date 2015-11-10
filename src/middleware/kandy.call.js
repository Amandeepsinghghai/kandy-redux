import kandy from 'kandy-js';
import {loginSuccess, loginFailure} from '../internalActions';

export default {
    makeCall({action}) {
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
    }
};
