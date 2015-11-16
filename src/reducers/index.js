import auth from './auth';
import calls from './calls';

export default function(state={}, action) {
    return {
        auth: auth(state.auth, action),
        calls: calls(state.calls, action)
    };
};
