import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, IconButton, InputBase, makeStyles } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getChatRoom, searchUsers } from '@core/chat-room/reducer';

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

        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            borderRadius: '5px'
        },
        padding: '10px'
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
    input: {
        marginBottom: '15px',
        backgroundColor: theme.palette.primary.dark,
        paddingLeft: '15px'
    }
}));

const AddPerson = () => {
    const classes = useStyles();
    const { searchedUsers } = useSelector((state) => getChatRoom(state));
    const [dialog, setDialog] = useState(false);

    const [chooseUserList, setChooseUserList] = useState([]);
    const dispatch = useDispatch();

    const toggleDialog = () => {
        setDialog(!dialog);
    };

    const searchForUsers = (event) => {
        const keyword = event.target.value;
        dispatch(searchUsers({ keyword }));
    };

    return (
        <>
            <IconButton onClick={toggleDialog} className={classes.root}>
                <PersonAdd />
            </IconButton>
            <Dialog open={dialog} onClose={toggleDialog} PaperProps={addPersonPaperProps}>
                <DialogTitle className={classes.title}>Add member</DialogTitle>
                <InputBase placeholder="Search for users" onChange={searchForUsers} className={classes.input} />
                <div>
                    {chooseUserList.map((username) => {
                        return <div> {username} </div>;
                    })}
                </div>
                <div className={classes.userContainer}>
                    {searchedUsers.map((username) => {
                        return <div className={classes.user}>{username}</div>;
                    })}
                </div>
            </Dialog>
        </>
    );
};

export default AddPerson;
