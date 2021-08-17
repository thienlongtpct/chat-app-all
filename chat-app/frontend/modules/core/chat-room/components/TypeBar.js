import React, { useEffect, useState } from 'react';
import { InputBase, makeStyles } from '@material-ui/core';
import { AddCircle, CardGiftcard, EmojiEmotions, GifTwoTone } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, getChatRoom } from '@core/chat-room/reducer';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.contrastText,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        margin: theme.spacing(2),
        padding: theme.spacing(1, 2),
        borderRadius: '5px',
        backgroundColor: '#40444b'
    },
    input: {
        flex: 1,
        borderWidth: '0',
        padding: theme.spacing(0, 2)
    },
    iconSpacing: {
        marginRight: theme.spacing(1)
    }
}));

const TypeBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const { id } = useSelector((state) => getChatRoom(state)?.selectedRoom);

    useEffect(() => {
        setContent('');
    }, [id]);

    const handleSubmit = () => {
        dispatch(
            addMessage({
                content: content.trim(),
                id
            })
        );
        setContent('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && content.trim()) handleSubmit();
    };

    return (
        <div className={classes.root}>
            <AddCircle />
            <InputBase
                multiline
                placeholder="Write Message"
                type="submit"
                variant="outlined"
                tabIndex="-1"
                onChange={(event) => event.target.value !== '\n' && setContent(event.target.value)}
                onKeyDown={handleKeyDown}
                className={classes.input}
                value={content}
            />
            <CardGiftcard className={classes.iconSpacing} />
            <GifTwoTone className={classes.iconSpacing} />
            <EmojiEmotions />
        </div>
    );
};

export default TypeBar;
