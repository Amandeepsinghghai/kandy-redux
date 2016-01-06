import {login, loginSSO} from '../src/actions';
import kandyCreateMiddleware from '../src/middleware/createMiddleware';
import constants from '../src/constants';
import kandy from 'kandy-js';
import _ from 'lodash';

describe('middleware', function() {
    const apiKey = 'apikey';
    // setup the middleware
    const kandyMiddleware = kandyCreateMiddleware(apiKey);

    const dispatch = sinon.spy();
    const next = sinon.spy();

    /**
     * login tests.
     */
    describe('login middleware', function() {
        const username = 'username';
        const password = 'password';

        const mockLogin = sinon.mock(kandy).expects('login');
        // Set expectations for how login should be called.
        mockLogin.once(); // Once per test.
        mockLogin.withArgs(sinon.match.string); // With a string.

        // Verify the expectations, then reset everything after each test.
        afterEach(function() {
            mockLogin.verify();
            mockLogin.reset();
            dispatch.reset();
            next.reset();
        });

        // As of this writing, this middleware should not modify any actions
        it('should call next middleware with same action', function() {
            const loginAction = login(username, password);
            const loginActionCopy = _.cloneDeep(loginAction);

            kandyMiddleware({dispatch})(next)(loginAction);

            expect(next).to.be.calledWithExactly(loginActionCopy);
        });

        it('should call kandy login if login action is dispatched', function() {
            const loginAction = login(username, password);

            kandyMiddleware({dispatch})(next)(loginAction);
        });

        it('should dispatch login success if kandy login succeeds', function() {
            const loginAction = login(username, password);
            kandyMiddleware({dispatch})(next)(loginAction);

            // fake a successful kandy login
            mockLogin.callArg(3);

            // Make sure login success was dispatched
            expect(dispatch).to.be.calledWithMatch({
                type: constants.LOGIN_FINISH,
                error: undefined
            });
        });

        it('should dispatch login failure if kandy login fails', function() {
            const loginAction = login(username, password);
            kandyMiddleware({dispatch})(next)(loginAction);

            // fake a successful kandy login
            mockLogin.callArg(4);

            // Make sure login failure was dispatched
            expect(dispatch).to.be.calledWithMatch({
                type: constants.LOGIN_FINISH,
                error: true
            });
        });
    });

    /**
     * loginSSO tests.
     */
    describe('loginSSO middleware', function() {
        const userAccessToken = 'userAccessToken';
        const anonUserAccessToken = 'AUATanonUserAccessToken';

        const mockLoginSSO = sinon.mock(kandy).expects('loginSSO');
        // Set expectations for how loginSSO should be called.
        mockLoginSSO.once(); // Once per test.
        mockLoginSSO.withArgs(sinon.match.string); // With a string.

        // Verify the expectations, then reset everything after each test.
        afterEach(function() {
            mockLoginSSO.verify();
            mockLoginSSO.reset();
            dispatch.reset();
            next.reset();
        });

        // As of this writing, this middleware should not modify any actions
        it('should call next middleware with same action', function() {
            const loginAction = loginSSO(userAccessToken);
            const loginActionCopy = _.cloneDeep(loginAction);

            kandyMiddleware({dispatch})(next)(loginAction);

            expect(next).to.be.calledWithExactly(loginActionCopy);
        });

        it('should call kandy loginSSO if loginSSO action is dispatched', function() {
            const loginAction = loginSSO(userAccessToken);

            kandyMiddleware({dispatch})(next)(loginAction);
        });

        it('should dispatch login success if kandy loginSSO succeeds', function() {
            const loginAction = loginSSO('userAccessTokenaa');
            kandyMiddleware({dispatch})(next)(loginAction);

            // fake a successful kandy loginSSO
            mockLoginSSO.callArgWith(1, {user_id: 'user_id'});

            // Make sure loginSSO success was dispatched
            expect(dispatch).to.be.calledWithMatch({
                type: constants.LOGIN_FINISH,
                error: undefined,
                payload: {
                    isAnonymous: false
                }
            });
        });

        it('should dispatch login failure if kandy loginSSO fails', function() {
            const loginAction = loginSSO(userAccessToken);
            kandyMiddleware({dispatch})(next)(loginAction);

            // fake a successful kandy loginSSO
            mockLoginSSO.callArg(2);

            // Make sure login failure was dispatched
            expect(dispatch).to.be.calledWithMatch({
                type: constants.LOGIN_FINISH,
                error: true
            });
        });

        it('should mark a user as anonymous if using an AUAT', function() {
            const loginAction = loginSSO(anonUserAccessToken);
            kandyMiddleware({dispatch})(next)(loginAction);

            // fake a successful kandy loginSSO
            mockLoginSSO.callArgWith(1, {user_id: 'user_id'});

            // Make sure login success was dispatched
            expect(dispatch).to.be.calledWithMatch({
                type: constants.LOGIN_FINISH,
                error: undefined,
                payload: {
                    isAnonymous: true
                }
            });
        });

    });
});
