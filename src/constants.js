import kandy from 'kandy-js';
const prefix = '@@kandy-redux/';

export default {
    LOGIN: prefix + 'login',
    LOGIN_SSO: prefix + 'login-sso',
    LOGIN_FINISH: prefix + 'login-finish',
    LOGOUT: prefix + 'logout',
    SEND_MESSAGE: prefix + 'send-message',
    SEND_MESSAGE_FINISH: prefix + 'send-message-finish',
    MESSAGE_RECEIVED: prefix + 'message-received',
    MAKE_CALL: prefix + 'make-call',
    CALL_INITIATED: prefix + 'call-initiated',
    END_CALL: prefix + 'end-call',
    CALL_ENDED: prefix + 'call-ended',
    CALL_ESTABLISHED: prefix + 'call-established',
    HOLD_CALL: prefix + 'hold-call',
    UNHOLD_CALL: prefix + 'unhold-call',
    MUTE_CALL: prefix + 'mute-call',
    UNMUTE_CALL: prefix + 'unmute-call',
    INIT_MEDIA: prefix + 'init-media',
    INIT_MEDIA_FINISH: prefix + 'init-media-finish',
    MEDIA_ERROR: prefix + 'media-error',

    /**
     * mediaErrors
     * Use Kandy's constants for the media [error] event.
     * Export as a separate, named export since they are
     * only used for a particular scenario.
     */
    mediaErrors: kandy.call.mediaErrors
};
