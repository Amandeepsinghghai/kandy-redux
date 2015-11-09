import auth from './auth';

export default function(state={}, action) {
    return {
        auth: auth(state.auth, action)
    };
};
