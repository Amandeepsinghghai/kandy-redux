import kandy from 'kandy-js';
import createCore from './kandy.core';
import call from './kandy.call';

export default function createKandyHelper(apiKey) {
    kandy.setup({});

    return {
        core: createCore(apiKey),
        call
    }
}
