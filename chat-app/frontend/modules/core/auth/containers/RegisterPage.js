import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button, makeStyles, TextField } from '@material-ui/core';
import Link from 'next/link';
import { fetchMe, fetchRegister, fetchToken, getAuthData, logout } from '../reducer';

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

const RegisterPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();

    const { token, userError } = useSelector((state) => getAuthData(state));

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const registerSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        dispatch(fetchRegister({ email, username, password }));
    };

    useEffect(() => {
        if (token) {
            router.push('/chat-room').then();
            localStorage.setItem('token', token);
        }
    }, [token]);

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
                            Create an account
                        </Typography>
                    </div>
                    <form onSubmit={registerSubmit}>
                        <Container className={classes.form}>
                            <Typography component="p">EMAIL</Typography>
                            <TextField
                                id="email"
                                name="Email"
                                type="email"
                                variant="outlined"
                                error={userError && submitted}
                                helperText="Email, username or password is invalid."
                                FormHelperTextProps={{
                                    style: {
                                        display: userError && submitted ? 'block' : 'none',
                                        backgroundColor: '#36393f',
                                        margin: '0px',
                                        padding: '5px 10px'
                                    }
                                }}
                                className={classes.textField}
                                onChange={(event) => setEmail(event.target.value)}
                            />

                            <Typography component="p">USERNAME</Typography>
                            <TextField
                                id="username"
                                name="Username"
                                variant="outlined"
                                error={userError && submitted}
                                helperText="Email, username or password is invalid."
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
                                helperText="Email, username or password is invalid."
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
                                Continue
                            </Button>

                            <div className={classes.register}>
                                <span>Already have an account?</span>
                                <Link href="/login">
                                    <Typography component="a" color="textPrimary">
                                        Login
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

export default RegisterPage;
