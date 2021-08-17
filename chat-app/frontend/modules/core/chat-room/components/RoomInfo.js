import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { useSelector } from 'react-redux';
import { getChatRoom } from '@core/chat-room/reducer';
import AddPerson from '@core/chat-room/components/AddPerson';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light
    },
    toolbar: {
        padding: theme.spacing(0, 2)
    },
    button: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        fontSize: '1rem',
        fontWeight: 700,
        color: theme.palette.text.primary
    }
}));

const RoomInfo = () => {
    const classes = useStyles();
    const { name } = useSelector((state) => getChatRoom(state)?.selectedRoom);
    return (
        <AppBar position="sticky" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <ChatIcon className={classes.button} />
                <Typography variant="h3" className={classes.title}>
                    {name}
                </Typography>
                <AddPerson />
            </Toolbar>
        </AppBar>
    );
};

export default RoomInfo;
