import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom, getAuthData, resetSearchedRooms } from '@core/auth/reducer';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.primary.light,
        border: 'none',
        outlineWidth: '0',
        color: 'white',
        fontSize: 'large',
        minHeight: '100%'
    },
    title: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '0',
        marginBottom: '30px',
        '& h2': {
            fontWeight: '600',
            color: 'white'
        }
    },
    button: {
        marginTop: theme.spacing(3)
    },
    input: {
        backgroundColor: theme.palette.primary.main,
        fontSize: '14px',
        borderRadius: '5px',
        width: '100%',
        padding: '0px'
    },
    icon: {
        color: theme.palette.primary.contrastText
    }
}));

const addRoomPaperProps = {
    style: {
        backgroundColor: '#36393f',
        padding: '20px',
        minWidth: '300px',
        minHeight: '200px'
    }
};

const AddRoom = () => {
    const dispatch = useDispatch();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [name, setName] = useState('');

    const classes = useStyles();

    const toggleDialog = () => {
        if (!dialogOpen) dispatch(resetSearchedRooms());
        setDialogOpen(!dialogOpen);
    };

    const createNewRoom = async (e) => {
        e.preventDefault();
        await dispatch(addRoom({ name }));
        setDialogOpen(false);
    };

    return (
        <>
            <IconButton onClick={toggleDialog} className={classes.icon}>
                <Add />
            </IconButton>
            <Dialog open={dialogOpen} onClose={toggleDialog} PaperProps={addRoomPaperProps}>
                <DialogTitle className={classes.title}>Create New Room</DialogTitle>
                <Paper className={classes.paper}>
                    <form onSubmit={createNewRoom} className={classes.form}>
                        <TextField
                            placeholder="Enter room name"
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            className={classes.input}
                        />
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            fullWidth
                        >
                            create
                        </Button>
                    </form>
                </Paper>
            </Dialog>
        </>
    );
};

export default AddRoom;
