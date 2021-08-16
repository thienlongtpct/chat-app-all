import React from 'react';
import Grid from '@material-ui/core/Grid';
import UserStatus from '@core/chat-room/components/UserStatus';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { getChatRoom } from '@core/chat-room/reducer';
import PropTypes from 'prop-types';

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
            {users.map(({ username, isOnline }) => (
                <UserStatus username={username} isOnline={isOnline} />
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
    users: PropTypes.object
};

const UserList = () => {
    const classes = useStyles();
    const {
        selectedRoom: { users }
    } = useSelector((state) => getChatRoom(state));
    return (
        <Grid item lg={2} className={classes.root}>
            <UserPaginate title="ONLINE" users={users} />
            {/* <UserPaginate title="ONLINE" users={users.filter((user) => user.isOnline)} /> */}
            {/* <UserPaginate title="OFFLINE" users={users.filter((user) => !user.isOnline)} /> */}
        </Grid>
    );
};

export default UserList;
