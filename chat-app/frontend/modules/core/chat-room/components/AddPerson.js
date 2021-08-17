import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, IconButton, InputBase, makeStyles, TextField } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getChatRoom, searchUsers } from '@core/chat-room/reducer';
import Typography from '@material-ui/core/Typography';

const addPersonPaperProps = {
    style: {
        backgroundColor: '#2e3136',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        minWidth: '400px'
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        justifySelf: 'flex-end',
        color: theme.palette.primary.contrastText
    },
    userContainer: {
        color: theme.palette.grey[500],
        display: 'flex',
        flexDirection: 'column'
    },
    user: {
        color: theme.palette.grey[300],
        marginTop: theme.spacing(1),
        padding: theme.spacing(2),
        '&:hover': {
            backgroundColor: theme.palette.primary.lighter,
            borderRadius: '5px'
        }
    },
    title: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '0',
        marginBottom: '20px',
        '& h2': {
            fontWeight: '600',
            color: 'white'
        }
    },
    userTitle: {
        color: theme.palette.grey[500],
        fontSize: '0.8rem',
        fontWeight: 600
    },
    input: {
        marginBottom: theme.spacing(3),
        backgroundColor: theme.palette.primary.darker
    }
}));

const AddPerson = () => {
    const classes = useStyles();
    const { searchedUsers = [] } = useSelector((state) => getChatRoom(state));
    const [dialog, setDialog] = useState(false);

    const [chosenUsers, setChosenUsers] = useState([]);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(searchUsers({ keyword: '' }));
    // }, [])

    const toggleDialog = () => {
        setDialog(!dialog);
    };

    const searchForUsers = (event) => {
        const keyword = event.target.value;
        dispatch(searchUsers({ keyword }));
    };

    const handleChooseUser = (newUser) => {
        if (chosenUsers.every((username) => username !== newUser)) setChosenUsers([...chosenUsers, newUser]);
        else setChosenUsers([...chosenUsers].map((username) => username !== newUser));
    };

    console.log(searchedUsers);
    return (
        <>
            <IconButton onClick={toggleDialog} className={classes.root}>
                <PersonAdd />
            </IconButton>
            <Dialog open={dialog} onClose={toggleDialog} PaperProps={addPersonPaperProps}>
                <DialogTitle className={classes.title}>Add member</DialogTitle>
                <TextField
                    variant="outlined"
                    placeholder="Search for users"
                    onChange={searchForUsers}
                    className={classes.input}
                />
                <div>
                    {chosenUsers.map((username) => {
                        return <div> {username} </div>;
                    })}
                </div>
                <Typography component="h6" className={classes.userTitle}>
                    {`USERS - ${searchedUsers.length}`}
                </Typography>
                <div className={classes.userContainer}>
                    {searchedUsers.map((username) => {
                        return (
                            <div className={classes.user} onClick={(username) => handleChooseUser(username)}>
                                {username}
                            </div>
                        );
                    })}
                </div>
            </Dialog>
        </>
    );
};

export default AddPerson;
