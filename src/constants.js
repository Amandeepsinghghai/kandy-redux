import kandy from 'kandy-js';
const prefix = '@@kandy-redux/';

export default {
    LOGIN: prefix + 'login',
    LOGIN_FINISH: prefix + 'login-finish',
    LOGOUT: prefix + 'logout',
    MAKE_CALL: prefix + 'make-call',
    CALL_INITIATED: prefix + 'call-initiated',
    END_CALL: prefix + 'end-call',
    CALL_ENDED: prefix + 'call-ended',
    CALL_ESTABLISHED: prefix + 'call-established',
    INIT_MEDIA: prefix + 'init-media',
    INIT_MEDIA_FINISH: prefix + 'init-media-finish',
    MEDIA_ERROR: prefix + 'media-error'
};

export const mediaErrors = kandy.call.mediaErrors;
