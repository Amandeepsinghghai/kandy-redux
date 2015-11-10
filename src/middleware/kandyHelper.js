import kandy from 'kandy-js';
import createCore from './kandy.core';

export default function createKandyHelper(apiKey) {
    kandy.setup({});

    return {
        core: createCore(apiKey)
    }
}
