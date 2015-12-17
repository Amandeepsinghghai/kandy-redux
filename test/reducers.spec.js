import constants, { mediaErrors } from '../src/constants';
import callsReducer from '../src/reducers/calls';
import authReducer from '../src/reducers/auth';
import webRTCReducer from '../src/reducers/webRTC';
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

    describe('webRTC reducer', function() {

        it('returns default state', function() {
            const state = undefined;
            const action = {};
            const newState = webRTCReducer(state, action);

            const expectation = {};
            expect(newState).to.deep.equal(expectation);
            // Check that state is not mutated.
            expect(newState).not.to.equal(state);
        });

        it('sets webRTC support on initMedia success', function() {
            const state = undefined;
            const action = {
                type: constants.INIT_MEDIA_FINISH
            };
            const newState = webRTCReducer(state, action);

            const expectation = {
                callSupport: true,
                screenshareSupport: true
            };
            expect(newState).to.deep.equal(expectation);
            // Check that state is not mutated.
            expect(newState).not.to.equal(state);
        });

        it('sets webRTC support on media error', function() {
            const state = undefined;
            const action = {
                type: constants.MEDIA_ERROR,
                payload: {
                    error: {
                        type: 'error type'
                    }
                }
            };
            const newState = webRTCReducer(state, action);

            const expectation = {
                callSupport: false,
                screenshareSupport: false,
                error: {
                    type: 'error type'
                }
            };
            expect(newState).to.deep.equal(expectation);
            // Check that state is not mutated.
            expect(newState).not.to.equal(state);
        });

        it('sets webRTC support on media error, with URLs', function() {

            const urlWin32bit = 'This is a URL.';
            const urlWin64bit = 'No, really, it is.';
            const urlMacUnix = 'Definitely a URL...';

            const state = undefined;
            const action = {
                type: constants.MEDIA_ERROR,
                payload: {
                    error: {
                        type: 'error type, with urls',
                        urlWin32bit: urlWin32bit,
                        urlWin64bit: urlWin64bit,
                        urlMacUnix: urlMacUnix
                    }
                }
            };
            const newState = webRTCReducer(state, action);

            const expectation = {
                callSupport: false,
                screenshareSupport: false,
                error: {
                    type: 'error type, with urls',
                    urls: {
                        win32bit: urlWin32bit,
                        win64bit: urlWin64bit,
                        macUnix: urlMacUnix
                    }
                }
            };
            expect(newState).to.deep.equal(expectation);
            // Check that state is not mutated.
            expect(newState).not.to.equal(state);
        });

        it('handles the NO_SCREENSHARING_WARNING scenario', function() {
            const state = undefined;
            const errorAction = {
                type: constants.MEDIA_ERROR,
                payload: {
                    error: {
                        type: mediaErrors.NO_SCREENSHARING_WARNING
                    }
                }
            };
            const successAction = {
                type: constants.INIT_MEDIA_FINISH
            };

            // In this scenario, two actions are triggered.
            const newState = webRTCReducer(state, errorAction);
            const newestState = webRTCReducer(newState, successAction);

            const expectation = {
                callSupport: true,
                screenshareSupport: false,
                error: {
                    type: mediaErrors.NO_SCREENSHARING_WARNING
                }
            };

            expect(newestState).to.deep.equal(expectation);
            // Check that state is not mutated.
            expect(newestState).not.to.equal(state);
            expect(newestState).not.to.equal(newState);
        });
    });
});
