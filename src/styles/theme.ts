import types from '@material-ui/lab/themeAugmentation';
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#035885',
    },
    secondary: {
      main: '#f9bb23',
      contrastText: '#035885'
    },
  },
});

export default theme;