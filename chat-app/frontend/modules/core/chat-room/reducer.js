import { asyncAction } from '@core/utils/action';
import axios from 'axios';
import { handleActions } from 'redux-actions';
import { ENV_URL } from '@core/chat-room/constants';
import { createAction } from '@reduxjs/toolkit';

const initial_state = {
    selectedRoom: null,
    searchedUsers: []
};

export const clearRoom = createAction('CHAT_ROOM/CLEAR_ROOM');

export const fetchRoom = asyncAction('CHAT_ROOM/FETCH_ROOM', async ({ room }) => {
    return axios.get(`${ENV_URL}rooms/${room.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
});

export const addMessage = asyncAction('CHAT_ROOM/ADD_MESSAGE', async ({ content, id }) => {
    const form = new FormData();
    form.append('content', content);
    form.append('id', id);
    return axios.post(`${ENV_URL}messages/add-message`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
});

export const searchUsers = asyncAction('CHAT_ROOM/SEARCH_USERS', async ({ keyword }) => {
    return axios.get(`${ENV_URL}users/suggest-user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: {
            username_contains: keyword
        }
    });
});
export const getChatRoom = (state) => state?.core?.chatRoom;

export default handleActions(
    {
        [fetchRoom.START]: (state) => ({
            ...state
        }),

        [fetchRoom.SUCCESS]: (state, { payload }) => ({
            ...state,
            selectedRoom: payload?.data
        }),

        [fetchRoom.FAILURE]: (state) => ({
            ...state
        }),

        [addMessage.START]: (state) => ({
            ...state
        }),

        [addMessage.SUCCESS]: (state, { payload }) => ({
            ...state,
            selectedRoom: payload?.data
        }),

        [addMessage.FAILURE]: (state) => ({
            ...state
        }),

        [searchUsers.START]: (state) => ({
            ...state,
            searchedUsers: []
        }),

        [searchUsers.SUCCESS]: (state, { payload }) => ({
            ...state,
            searchedUsers: []
        }),

        [searchUsers.FAILURE]: (state) => ({
            ...state,
            searchedUsers: []
        }),

        'CHAT_ROOM/CLEAR_ROOM': (state) => ({
            ...state,
            selectedRoom: null
        })
    },
    initial_state
);
