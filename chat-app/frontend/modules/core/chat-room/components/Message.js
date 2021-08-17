import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timezone';
import { getChatRoom } from '@core/chat-room/reducer';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: 'flex-start',
        fontSize: '1rem',
        color: theme.palette.grey[200],
        padding: theme.spacing(1, 2),
        marginBottom: theme.spacing(2),
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    messageInfo: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: theme.spacing(0.75)
    },
    avatar: {
        width: '35px',
        borderRadius: '100%',
        marginRight: theme.spacing(2)
    },
    username: {
        color: theme.palette.secondary.light,
        fontWeight: 600,
        marginRight: theme.spacing(1)
    },
    date: {
        fontSize: '0.75rem',
        color: theme.palette.grey[600]
    },
    content: {
        whiteSpace: 'pre-line'
    }
}));

const Message = ({ message: { user, content, createdAt, updatedAt } }) => {
    const classes = useStyles();
    const { users } = useSelector((state) => getChatRoom(state)?.selectedRoom);
    return (
        <Grid container className={classes.root}>
            <img src="avatar/online-avatar.png" className={classes.avatar} alt="online" />
            <div>
                <div className={classes.messageInfo}>
                    <Typography className={classes.username}>
                        {users.filter(({ id }) => id === user)[0].username}
                    </Typography>
                    <Typography className={classes.date}>
                        {moment(createdAt).calendar()}
                    </Typography>
                </div>
                <Typography className={classes.content}>{content}</Typography>
            </div>
        </Grid>
    );
};

Message.defaultProps = {
    message: true
};

Message.propTypes = {
    message: PropTypes.object
};

export default Message;
