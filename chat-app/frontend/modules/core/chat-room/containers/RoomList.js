import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, makeStyles } from '@material-ui/core';
import SearchBar from '@core/chat-room/components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import RoomName from '@core/chat-room/components/RoomName';
import { getAuthData, logout } from '@core/auth/reducer';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { clearRoom } from '@core/chat-room/reducer';
import AddRoom from '@core/chat-room/components/AddRoom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.dark,
        height: '100vh',
        padding: theme.spacing(2)
    },
    bar: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.text.primary
    },
    list: {
        flex: 1,
        overflow: 'scroll',
        /* Hide scrollbar for Chrome, Safari and Opera */
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        /* Hide scrollbar for IE, Edge and Firefox */
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
    },
    title: {
        color: theme.palette.grey[500],
        fontSize: '0.8rem',
        fontWeight: 600,
        justifyContent: 'space-between'
    }
}));

const RoomList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();

    const { searchedRooms } = useSelector((state) => getAuthData(state));
    const { username } = useSelector((state) => getAuthData(state)?.user);

    const handleLogout = () => {
        router.push('/login').then();
        dispatch(logout({ username }));
        dispatch(clearRoom());
    };

    return (
        <Grid item sm={4} md={3} lg={2} className={classes.root}>
            <SearchBar />
            <Typography component="h6" className={classes.title}>
                {`CHAT ROOM - ${searchedRooms.length}`}
                <AddRoom />
            </Typography>
            <Container component="div" className={classes.list} disableGutters>
                {searchedRooms.map((room) => (
                    <RoomName room={room} key={room.id} />
                ))}
            </Container>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
                Log out
            </Button>
        </Grid>
    );
};

export default RoomList;
