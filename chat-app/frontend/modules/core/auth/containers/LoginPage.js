import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button, makeStyles, TextField } from '@material-ui/core';
import Link from 'next/link';
import { fetchMe, fetchToken, getAuthData, logout } from '../reducer';
import { socket } from '../../../../config/web-sockets';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(/login_cover.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.grey[400],
        padding: theme.spacing(6),
        borderRadius: '5px',
        maxWidth: '500px',
        userSelect: 'none'
    },
    login: {
        display: 'flex',
        justifyContent: 'center'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '30px',
        color: theme.palette.grey[600]
    },
    welcome: {
        paddingBottom: '5px',
        fontSize: '30px',
        color: theme.palette.grey[200]
    },
    form: {
        flexDirection: 'column',
        padding: '0'
    },
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        width: '100%',
        backgroundColor: theme.palette.primary.main
    },
    register: {
        marginTop: theme.spacing(2),
        '& span': {
            marginRight: theme.spacing(1)
        }
    }
}));

const LoginPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();

    const { token, userError } = useSelector((state) => getAuthData(state));

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const loginSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        dispatch(fetchToken({ identifier: username, password }));
    };

    useEffect(() => {
        if (userError) dispatch(logout(''));
        else if (localStorage.getItem('token')) router.push('/chat-room').then();
        else if (token) {
            router.push('/chat-room').then();
            localStorage.setItem('token', token);
            socket.emit('join', { username }, (error) => alert(error));
        } else dispatch(fetchMe());
    }, [token]);

    if (typeof localStorage !== 'undefined' && (token || localStorage.getItem('token'))) return <p>Loading ...</p>;
    return (
        <>
            <header>
                <title>Login ChatApp</title>
                <meta name="description" content="Login UI for ChatApp" />
            </header>
            <main className={classes.root}>
                <Container className={classes.main}>
                    <div className={classes.header}>
                        <Typography variant="h6" component="p" color="textPrimary" className={classes.welcome}>
                            Welcome Back!
                        </Typography>
                        <Typography component="p">We're so excited to see you again!</Typography>
                    </div>
                    <form onSubmit={loginSubmit}>
                        <Container className={classes.form}>
                            <Typography component="p">USERNAME</Typography>
                            <TextField
                                id="username"
                                name="Username"
                                variant="outlined"
                                error={userError && submitted}
                                helperText="Username or password is invalid."
                                FormHelperTextProps={{
                                    style: {
                                        display: userError && submitted ? 'block' : 'none',
                                        backgroundColor: '#36393f',
                                        margin: '0px',
                                        padding: '5px 10px'
                                    }
                                }}
                                className={classes.textField}
                                onChange={(event) => setUsername(event.target.value)}
                            />

                            <Typography component="p">PASSWORD</Typography>
                            <TextField
                                id="password"
                                name="Password"
                                type="password"
                                variant="outlined"
                                error={userError && submitted}
                                helperText="Username or password is invalid."
                                FormHelperTextProps={{
                                    style: {
                                        display: userError && submitted ? 'block' : 'none',
                                        backgroundColor: '#36393f',
                                        margin: '0px',
                                        padding: '5px 10px'
                                    }
                                }}
                                className={classes.textField}
                                onChange={(event) => setPassword(event.target.value)}
                            />

                            <Button variant="contained" color="secondary" type="submit" fullWidth>
                                Login
                            </Button>

                            <div className={classes.register}>
                                <span>Need an account?</span>
                                <Link href="/register">
                                    <Typography component="a" color="textPrimary">
                                        Register
                                    </Typography>
                                </Link>
                            </div>
                        </Container>
                    </form>
                </Container>
            </main>
        </>
    );
};

export default LoginPage;
