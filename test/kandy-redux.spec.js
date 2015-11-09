import {login} from '../src/actions';
import kandyCreateMiddleware from '../src/middleware';
import * as constants from '../src/constants';
import kandy from 'kandy-js';
import _ from 'lodash';

describe('kandy-redux', function() {
    const username = 'username';
    const password = 'password';
    const apiKey = 'apikey';

    // setup the middleware
    const kandyMiddleware = kandyCreateMiddleware(apiKey);

    const dispatch = sinon.spy();
    const next = sinon.spy();
    const mockLogin = sinon.mock(kandy).expects('login');

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
        // This makes sure kandy login was called and with the right args
        mockLogin.atLeast(1);
        mockLogin.withArgs(apiKey, username, password);

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
            type: constants.LOGIN_FINISHED,
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
            type: constants.LOGIN_FINISHED,
            error: true
        });
    });
});
