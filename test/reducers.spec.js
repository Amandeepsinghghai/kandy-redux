import constants from '../src/constants';
import callsReducer from '../src/reducers/calls';
import authReducer from '../src/reducers/auth';
import {makeCall} from '../src/actions';

describe('reducers', function() {
    it('call reducer default state to be returned', function() {
        const expectation = [];
        const state = undefined;
        const newState = callsReducer(state, {});

        expect(newState).to.deep.equal(expectation);
        // Check that state is not mutated
        expect(newState).not.to.equal(state);
    });

    it('call reducer to add call to state', function() {
        const call = {callId: 'foo'};
        const action = {type: constants.CALL_INITIATED, payload: call};
        const state = [];
        const newState = callsReducer(state, action);

        expect(newState.length).to.equal(1);
        expect(newState[0].callId).to.equal(call.callId);
        expect(newState[0].status).to.equal('initiated');
        // Check that state is not mutated
        expect(newState).not.to.equal(state);
    });

    it('call reducer to remove call from state', function() {
        const call = {callId: 'foo'};
        const action = {type: constants.CALL_ENDED, payload: call};
        const expectation = [];
        const state = [call];
        const newState = callsReducer(state, action);

        expect(newState).to.deep.equal(expectation);
        // Check that state is not mutated
        expect(newState).not.to.equal(state);
    });

    it('auth reducer default state to be returned', function() {
        const expectation = {};
        const state = undefined;
        const newState = authReducer(state, {});

        expect(newState).to.deep.equal(expectation);
        // Check that state is not mutated
        expect(newState).not.to.equal(state);
    });

    it('auth reducer to set logged in state', function() {
        const username = 'foo';
        const action = {type: constants.LOGIN_FINISH, payload: {username}};
        const expectation = {currentUsername: username, isAuthenticated: true};
        const state = {};
        const newState = authReducer(state, action);

        expect(newState.currentUsername).to.equal(expectation.currentUsername);
        expect(newState.isAuthenticated).to.equal(expectation.isAuthenticated);
        // Check that state is not mutated
        expect(newState).not.to.equal(state);
    });

    it('auth reducer to set logged in state', function() {
        const username = 'foo';
        const action = {type: constants.LOGOUT, payload: {username}};
        const expectation = {currentUsername: '', isAuthenticated: false};
        const state = {};
        const newState = authReducer(state, action);

        expect(newState.currentUsername).to.equal(expectation.currentUsername);
        expect(newState.isAuthenticated).to.equal(expectation.isAuthenticated);
        // Check that state is not mutated
        expect(newState).not.to.equal(state);
    });
});
