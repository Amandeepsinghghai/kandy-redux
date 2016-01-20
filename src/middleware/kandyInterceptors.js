import kandy from 'kandy-js';
import createCallInterceptors from './kandy.call';
import createChatInterceptors from './kandy.messaging';
import createCoreInterceptors from './kandy.core';
import {messageReceived, callInitiated, callEnded, callEstablished, mediaError} from '../internalActions';

function setListeners(dispatch) {
    kandy.on('message', (message) => {
        dispatch(messageReceived(message));
    });
    kandy.on('callinitiated', (call) => {
        dispatch(callInitiated(call.getId(), call.getRemoteVideoState()));
    });
    kandy.on('callestablished', (call) => {
        dispatch(callEstablished(call.getId(), call.getRemoteVideoState()));
    });
    kandy.on('callended', (call) => {
        dispatch(callEnded(call.getId()));
    });
    kandy.on('media', (error) => {
        dispatch(mediaError(error));
    });
}

export default function createKandyInterceptors({apiKey, dispatch, getState}) {
    kandy.setup({});

    // Here we wrap all Kandy events
    setListeners(dispatch);

    // We return one object whose keys are action types and values
    // are interceptor functions for those actions.
    return Object.assign({},
        createCoreInterceptors({apiKey, dispatch, getState}),
        createChatInterceptors({apiKey, dispatch, getState}),
        createCallInterceptors({apiKey, dispatch, getState})
    );
}
