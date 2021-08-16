import React from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@material-ui/core';
import withDarkMode from 'next-dark-mode';

import store from '../store';

const darkTheme = createTheme({
    palette: {
        primary: {
            darker: '#1f2225',
            dark: '#2e3136',
            main: '#32353b',
            light: '#36393f',
            lighter: '#34373c',
            contrastText: '#bdbdbd'
        },
        secondary: {
            light: '#7986cb',
            main: '#3f51b5',
            dark: '#303f9f',
            contrastText: '#fff'
        },
        text: {
            primary: '#f5f5f5',
            secondary: '#bdbdbd'
        }
    },
    typography: {
        fontFamily: [
            'Whitney',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Oxygen',
            'Ubuntu',
            'Cantarell',
            'Fira Sans',
            'Droid Sans',
            'Helvetica Neue',
            'sans-serif'
        ].join(',')
    }
});

const lightTheme = createTheme({
    palette: {
        primary: {
            dark: '#1f2225',
            main: '#2e3136',
            light: '#36393f',
            lighter: '#34373c',
            contrastText: '#bdbdbd'
        },
        secondary: {
            light: '#7986cb',
            main: '#3f51b5',
            dark: '#303f9f',
            contrastText: '#fff'
        },
        text: {
            primary: '#f5f5f5',
            secondary: '#bdbdbd'
        }
    }
});

function MyApp({ Component, pageProps, darkMode }) {
    const { darkModeActive } = darkMode;

    return (
        <ThemeProvider theme={darkModeActive ? darkTheme : lightTheme}>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
                <title>Finseed DATA88</title>
                <meta name="description" content="MARS PROJECT" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default store.withRedux(withDarkMode(MyApp));
