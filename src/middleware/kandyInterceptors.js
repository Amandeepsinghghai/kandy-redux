import kandy from 'kandy-js';
import merge from 'merge';
import createCoreInterceptors from './kandy.core';
import createCallInterceptors from './kandy.call';

export default function createKandyInterceptors({apiKey, dispatch, getState}) {
    kandy.setup({});

    return merge(
        createCoreInterceptors({apiKey, dispatch, getState}),
        createCallInterceptors({apiKey, dispatch, getState})
    );
}
