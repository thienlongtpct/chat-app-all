import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import TypeBar from '@core/chat-room/components/TypeBar';
import Message from '@core/chat-room/components/Message';
import RoomInfo from '@core/chat-room/components/RoomInfo';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { MessagePaginate } from '@core/chat-room/components/MessagePaginate';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.lighter,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    messageBox: {
        flex: 1,
        overflow: 'scroll',
        /* Hide scrollbar for Chrome, Safari and Opera */
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        /* Hide scrollbar for IE, Edge and Firefox */
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
    }
}));

const MessageContainer = () => {
    const {
        selectedRoom: { messages = [] }
    } = useSelector((state) => state.core.chatRoom);
    let currentDate = '';
    const classes = useStyles();
    useEffect(() => {
        const messageBox = document.getElementById('message-box');
        messageBox.scrollTop = messageBox.scrollHeight;
    }, [messages]);
    return (
        <Grid item sm={8} md={9} lg={8} className={classes.root}>
            <RoomInfo />
            <div className={classes.messageBox} id="message-box">
                {messages.map((message) => {
                    if (moment(message.createdAt).format('DD/MM/YYYY') !== currentDate) {
                        currentDate = moment(message.createdAt).format('DD/MM/YYYY');
                        return (
                            <div key={message.createdAt}>
                                <MessagePaginate content={moment(currentDate, 'DD/MM/YYYY').format('ll')} />
                                <Message message={message} />
                            </div>
                        );
                    }
                    return <Message message={message} key={message.createdAt} />;
                })}
            </div>
            <TypeBar />
        </Grid>
    );
};

export default MessageContainer;
