import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRoom, getChatRoom } from '@core/chat-room/reducer';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.grey[500],
        marginBottom: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.primary.lighter,
            color: theme.palette.grey[300],
            borderRadius: '5px'
        }
    },
    selected: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.grey[200],
        borderRadius: '5px',
        marginBottom: theme.spacing(1)
    },
    roomName: {
        padding: theme.spacing(2),
        fontWeight: 'bold',
        fontSize: '0.9rem'
    }
}));

const RoomName = ({ room }) => {
    const classes = useStyles();
    const { selectedRoom } = useSelector((state) => getChatRoom(state));
    const dispatch = useDispatch();
    return (
        <Container
            component="div"
            disableGutters
            className={room.id === selectedRoom.id ? classes.selected : classes.root}
            onClick={() => dispatch(fetchRoom({ room }))}
        >
            <Typography component="h2" className={classes.roomName}>
                # {room.name}
            </Typography>
        </Container>
    );
};

RoomName.defaultProps = {
    room: true
};

RoomName.propTypes = {
    room: PropTypes.object
};

export default RoomName;
