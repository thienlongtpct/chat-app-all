import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import UserStatus from '@core/chat-room/components/UserStatus';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { getChatRoom } from '@core/chat-room/reducer';
import PropTypes from 'prop-types';
import { socket } from '../../../../config/web-sockets';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(2)
    },
    paginate: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    title: {
        color: theme.palette.grey[500],
        fontSize: '0.8rem',
        fontWeight: 600
    }
}));

const UserPaginate = ({ title, users }) => {
    const classes = useStyles();
    return (
        <Container component="div" className={classes.paginate} disableGutters>
            <Typography component="h6" className={classes.title}>
                {`${title} - ${users.length}`}
            </Typography>
            {users.map(({ username, id }) => (
                <UserStatus username={username} isOnline={title === 'ONLINE'} key={id} />
            ))}
        </Container>
    );
};

UserPaginate.defaultProps = {
    title: true,
    users: true
};

UserPaginate.propTypes = {
    title: PropTypes.string,
    users: PropTypes.array
};

const UserList = () => {
    const classes = useStyles();

    const {
        selectedRoom: { users: initialUsers }
    } = useSelector((state) => getChatRoom(state));

    const [newLoginUsers, setNewLoginUsers] = useState([]);
    const [newLogoutUsers, setNewLogoutUsers] = useState([]);

    useEffect(async () => {
        console.log('socket change');
        await socket.on('newLogin', ({ username }) => {
            setNewLoginUsers([...newLoginUsers, username]);
            setNewLogoutUsers([...newLogoutUsers].filter((user) => user.username !== username));
        });
        await socket.on('newLogout', ({ username }) => {
            console.log(username);
            setNewLogoutUsers([...newLogoutUsers, username]);
            setNewLoginUsers([...newLoginUsers].filter((user) => user.username !== username));
        });
    }, [socket]);

    return (
        <Grid item lg={2} className={classes.root}>
            <UserPaginate
                title="ONLINE"
                users={initialUsers.filter(
                    (user) =>
                        (user.isOnline || newLoginUsers.includes(user.username)) &&
                        !newLogoutUsers.includes(user.username)
                )}
            />
            <UserPaginate
                title="OFFLINE"
                users={initialUsers.filter(
                    (user) =>
                        (!user.isOnline || newLogoutUsers.includes(user.username)) &&
                        !newLoginUsers.includes(user.username)
                )}
            />
        </Grid>
    );
};

export default UserList;
