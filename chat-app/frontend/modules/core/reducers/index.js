import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../auth/reducer';
import chatRoomReducer from '../chat-room/reducer';

export default combineReducers({
    auth: authReducer,
    chatRoom: chatRoomReducer
});
