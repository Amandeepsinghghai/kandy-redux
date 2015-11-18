import constants from '../src/constants';
import callsReducer from '../src/reducers/calls';
import authReducer from '../src/reducers/auth';
import {makeCall} from '../src/actions';

describe('reducers', function() {
    it('call reducer default state to be returned', function() {
        const expectation = [];
        const state = callsReducer(undefined, {});

        expect(state).to.deep.equal(expectation);
    });

    it('call reducer to add call to state', function() {
        const call = {callId: 'foo'};
        const action = {type: constants.CALL_INITIATED, payload: call};
        const state = callsReducer([], action);

        expect(state.length).to.equal(1);
        expect(state[0].callId).to.equal(call.callId);
        expect(state[0].status).to.equal('initiated');
    });

    it('call reducer to remove call from state', function() {
        const call = {callId: 'foo'};
        const action = {type: constants.CALL_ENDED, payload: call};
        const expectation = [];
        const state = callsReducer([call], action);

        expect(state).to.deep.equal(expectation);
    });

    it('auth reducer default state to be returned', function() {
        const expectation = {};
        const state = authReducer(undefined, {});

        expect(state).to.deep.equal(expectation);
    });

    it('auth reducer to set logged in state', function() {
        const username = 'foo';
        const action = {type: constants.LOGIN_FINISH, payload: {username}};
        const expectation = {currentUsername: username, isAuthenticated: true};
        const state = authReducer({}, action);

        expect(state.currentUsername).to.equal(expectation.currentUsername);
        expect(state.isAuthenticated).to.equal(expectation.isAuthenticated);
    });

    it('auth reducer to set logged in state', function() {
        const username = 'foo';
        const action = {type: constants.LOGOUT, payload: {username}};
        const expectation = {currentUsername: '', isAuthenticated: false};
        const state = authReducer({}, action);

        expect(state.currentUsername).to.equal(expectation.currentUsername);
        expect(state.isAuthenticated).to.equal(expectation.isAuthenticated);
    });
});
