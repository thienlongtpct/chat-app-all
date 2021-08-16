import React from 'react';
import { Divider, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '0.8rem',
        color: theme.palette.grey[600],
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
}));

export const MessagePaginate = ({ content }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <p>{content}</p>
        </div>
    );
};

MessagePaginate.defaultProps = {
    content: true
};

MessagePaginate.propTypes = {
    content: PropTypes.string
};
