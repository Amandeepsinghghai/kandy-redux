import {handleActions} from 'redux-actions';
import constants from '../constants';

const chatReducers = {};
/*
 * This reducer maintains an array of chatMessage objects sent/received successfully for a single chat
 */
chatReducers[constants.SEND_MESSAGE_FINISH] = (state = [], action) => {
    return [...state,
        Object.assign({}, action.payload.message)
    ];
};

chatReducers[constants.MESSAGE_RECEIVED] = (state = [], action) => {
    return [...state,
        Object.assign({}, action.payload.message)
    ];
};

const chat = handleActions(chatReducers, []);

const chatsReducers = {};
/*
 * This reducer maintains the collection of chats keyed to the destination userId
 */
chatsReducers[constants.SEND_MESSAGE_FINISH] = (state = {}, action) => {
    return Object.assign({}, state, {
        [action.payload.message.destination]: chat(state[action.payload.message.destination], action)
    });
};

chatsReducers[constants.MESSAGE_RECEIVED] = (state = {}, action) => {
    return Object.assign({}, state, {
        [action.payload.message.sender.full_user_id]: chat(state[action.payload.message.sender.full_user_id], action)
    });
};

// This creates a reducer function made up of many reducers.
// The key is the action type for each reducer. The `next`
// function is for successful actions and `throw` is for
// error actions. When a value is a function instead of
// an object, the same function is used for success and failure
export default handleActions(chatsReducers, {});
