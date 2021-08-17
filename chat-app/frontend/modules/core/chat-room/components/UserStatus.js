import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        color: theme.palette.grey[500],
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '5px',
            color: theme.palette.grey[100],
            opacity: '1 !important'
        },
        display: 'flex',
        alignItems: 'center'
    },
    image: {
        width: '35px',
        height: '35px',
        borderRadius: '100%'
    },
    username: {
        fontSize: '1rem',
        marginLeft: theme.spacing(1.5)
    },
    offline: {
        opacity: 0.3
    }
}));

const UserStatus = ({ username, isOnline }) => {
    const classes = useStyles();
    return (
        <Container component="div" className={clsx(classes.root, !isOnline && classes.offline)} disableGutters>
            <img src={`avatar/${isOnline ? 'online' : 'offline'}-avatar.png`} className={classes.image} />
            <Typography component="p" className={classes.username}>
                {username}
            </Typography>
        </Container>
    );
};

UserStatus.defaultProps = {
    username: true,
    isOnline: true
};

UserStatus.propTypes = {
    username: PropTypes.string,
    isOnline: PropTypes.bool
};

export default UserStatus;
