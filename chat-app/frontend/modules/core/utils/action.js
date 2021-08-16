import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const notLoggedIn = createAction('AUTH/NOT_LOGGED_IN');

const setAxiosHeader = async (dispatch, getState) => {
    const token = getState()?.auth?.token;

    if (!token) {
        dispatch(notLoggedIn());
        return;
    }
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
};

export const asyncAction = (type, requestFunc) => {
    const TYPE_START = `${type}_START`;
    const TYPE_SUCCESS = `${type}_SUCCESS`;
    const TYPE_FAILURE = `${type}_FAILURE`;

    const actions = {
        [TYPE_START]: createAction(
            TYPE_START,
            (input, response) => ({}),
            (input, response) => input
        ),
        [TYPE_SUCCESS]: createAction(
            TYPE_SUCCESS,
            (input, response) => ({
                payload: {
                    data: response?.data || response
                }
            }),
            (input, response) => input
        ),
        [TYPE_FAILURE]: createAction(
            TYPE_FAILURE,
            (input, error) => ({
                payload: {
                    input,
                    error: error?.message
                }
            }),
            (input, error) => input
        )
    };

    const thunkAction = (input) => async (dispatch, getState) => {
        await setAxiosHeader(dispatch, getState);
        dispatch(actions[TYPE_START](input));

        return requestFunc(input)
            .then((response) => {
                dispatch(actions[TYPE_SUCCESS](input, response));
                return response;
            })
            .catch((error) => {
                dispatch(actions[TYPE_FAILURE](input, error));
                return { error };
            });
    };
    thunkAction.START = actions[TYPE_START].toString();
    thunkAction.SUCCESS = actions[TYPE_SUCCESS].toString();
    thunkAction.FAILURE = actions[TYPE_FAILURE].toString();

    return thunkAction;
};
