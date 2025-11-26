import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6750A4', // MD3 Purple 40
            light: '#EADDFF', // MD3 Purple 90
            dark: '#21005D', // MD3 Purple 10
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#625B71',
            light: '#E8DEF8',
            dark: '#1D192B',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#B3261E',
        },
        background: {
            default: '#FFFBFE', // Surface
            paper: '#FFFBFE', // Surface
        },
        text: {
            primary: '#1C1B1F',
            secondary: '#49454F',
        },
    },
    typography: {
        fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
        h1: {
            fontSize: '3.5rem', // Display Large
            fontWeight: 400,
            lineHeight: 1.125,
        },
        h2: {
            fontSize: '2.8rem', // Display Medium
            fontWeight: 400,
            lineHeight: 1.2,
        },
        h3: {
            fontSize: '2.25rem', // Display Small
            fontWeight: 400,
            lineHeight: 1.28,
        },
        h4: {
            fontSize: '2rem', // Headline Large
            fontWeight: 400,
            lineHeight: 1.25,
        },
        h5: {
            fontSize: '1.75rem', // Headline Medium
            fontWeight: 400,
            lineHeight: 1.28,
        },
        h6: {
            fontSize: '1.375rem', // Headline Small
            fontWeight: 500,
            lineHeight: 1.36,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20, // Pill shape
                    padding: '10px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
                    },
                },
                contained: {
                    backgroundColor: '#6750A4',
                    color: '#FFFFFF',
                },
                outlined: {
                    borderColor: '#79747E',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Remove default overlay in dark mode if we switch
                },
                rounded: {
                    borderRadius: 16,
                },
                elevation1: {
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)', // MD3 Elevation 1
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: '#F3EDF7', // Surface Container Low
                    boxShadow: 'none', // Filled card style
                    border: 'none',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F3EDF7', // Surface Container Low
                    color: '#1C1B1F', // On Surface
                    boxShadow: 'none',
                    borderBottom: '1px solid #E7E0EC', // Outline variant
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 4, // Text fields usually have smaller radius
                    },
                },
            },
        },
    },
});

export default theme;
