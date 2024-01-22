import { createTheme } from '@mui/material/styles';
import { green, blue, yellow, orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[800],
    },
    secondary: {
      main: yellow[500],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
});

export { theme };
