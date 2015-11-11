import kandy from 'kandy-js';
import merge from 'merge';
import {callInitiated, callEnded} from '../internalActions';
import createCoreInterceptors from './kandy.core';
import createCallInterceptors from './kandy.call';

function setListeners(dispatch) {
    kandy.on('callinitiated', (call) => {
        dispatch(callInitiated(call.getId(), call.getRemoteVideoState()));
    });
    kandy.on('callended', (call) => {
        dispatch(callEnded(call.getId()));
    });
}

export default function createKandyInterceptors({apiKey, dispatch, getState}) {
    kandy.setup({});

    // Here we wrap all Kandy events
    setListeners(dispatch);

    // We return one object whose keys are action types and values
    // are interceptor functions for those actions.
    return merge(
        createCoreInterceptors({apiKey, dispatch, getState}),
        createCallInterceptors({apiKey, dispatch, getState})
    );
}
