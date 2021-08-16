import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { fetchMe, getAuthData, logout } from '@core/auth/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchRoom, getChatRoom } from '@core/chat-room/reducer';
import RoomList from './containers/RoomList';
import MessageContainer from './containers/MessageContainer';
import UserList from './containers/UserList';

const ChatRoomPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { userError, user } = useSelector((state) => getAuthData(state));
    const { selectedRoom } = useSelector((state) => getChatRoom(state));

    useEffect(() => {
        if (!user) dispatch(fetchMe());
        else {
            const { rooms } = user;
            if (!selectedRoom) dispatch(fetchRoom({ room: rooms[0] }));
        }
    }, [user]);

    if (userError) {
        router.push('/login').then();
        dispatch(logout());
    }
    if (!selectedRoom) return <>Loading ...</>;
    return (
        <Grid container>
            <RoomList />
            <MessageContainer />
            <UserList />
        </Grid>
    );
};

export default ChatRoomPage;
