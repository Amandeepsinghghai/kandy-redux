import auth from './auth';
import calls from './calls';
import webRTC from './webRTC';

const defaultStateWebRTC = {
    initialized: false
}

export default function(state={}, action) {
    return {
        auth: auth(state.auth, action),
        calls: calls(state.calls, action),
        webRTC: webRTC(state.webRTC = defaultStateWebRTC, action)
    };
};
