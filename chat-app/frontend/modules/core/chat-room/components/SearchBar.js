import React from 'react';
import { InputBase, makeStyles, Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { getAuthData, searchRoom } from '@core/auth/reducer';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.darker,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '5px',
        marginBottom: theme.spacing(2),
        color: theme.palette.text.primary,
        padding: theme.spacing(1, 2)
    },
    input: {
        flex: 1,
        marginRight: theme.spacing(1)
    }
}));

const SearchBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { rooms } = useSelector((state) => getAuthData(state)?.user);

    const getSuggestion = (event) => {
        const searchedRooms = rooms.filter((room) => room.name.includes(event.target.value));
        dispatch(searchRoom({ searchedRooms }));
    };

    return (
        <Paper component="form" className={classes.root}>
            <InputBase className={classes.input} placeholder="Search room" onChange={getSuggestion} />
            <Search />
        </Paper>
    );
};

export default SearchBar;
