import kandy from 'kandy-js';
import constants from '../constants';
import {sendMessageSuccess, sendMessageFailure} from '../internalActions';

export default function createChatInterceptors({apiKey, dispatch}) {
    return {
        [constants.SEND_MESSAGE]: function(action) {
            const options = action.payload.options || {};

            kandy.messaging.sendIm(
                action.payload.fullUserId,
                action.payload.message,
                function success(message) {
                    dispatch(sendMessageSuccess(message));
                },
                function failure() {
                    dispatch(sendMessageFailure());
                },
                options
            );
        }
    }
};
