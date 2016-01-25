import auth from './auth';
import calls from './calls';
import chatMessages from './chatMessages';
import webRTC from './webRTC';

export default function(state={}, action) {
    return {
        auth: auth(state.auth, action),
        calls: calls(state.calls, action),
        chatMessages: chatMessages(state.chatMessages, action),
        webRTC: webRTC(state.webRTC, action)
    };
};
