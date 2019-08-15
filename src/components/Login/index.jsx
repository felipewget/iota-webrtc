import React, {
  useGlobal, useState, getGlobal, useEffect, useContext,
} from 'reactn';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { getUserHash } from 'utils';
import PasswordTextField from 'components/shared/PasswordTextField';
import PlainTextField from 'components/shared/PlainTextField';
import Snackbar from 'components/shared/Snackbar';
import { DBContext } from 'store';
import { Color } from 'utils/constants';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: Color.PRIMARY,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: Color.PRIMARY,
  },
}));

export default function Login({ history }) {
  const db = useContext(DBContext);
  let login;

  const [, setSeed] = useGlobal('seed');
  const [, setLoggedIn] = useGlobal('loggedIn');
  const [, setUsername] = useGlobal('username');
  const [, setMyId] = useGlobal('myId');

  const [snackbarVariant, setSnackbarVariant] = useState('info');
  const [snackbarMessage, setSnackbarMessage] = useState('Info');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  function openSnackbar(message, variant) {
    setSnackbarMessage(message);
    setSnackbarVariant(variant);
    setSnackbarOpen(true);
  }

  const [seedInput, setSeedInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [loginWithSeed, setLoginWithSeed] = useState(false);

  if (db) {
    login = () => {
      const userCollection = db.getCollection('users');
      let user = null;
      let userHash = '';
      if (loginWithSeed) {
        user = userCollection.findOne({ seed: seedInput });
      } else {
        userHash = getUserHash(usernameInput, passwordInput);
        user = userCollection.findOne({ userHash });
      }
      if (!user) {
        return openSnackbar('User not found', 'error');
      }
      const userData = JSON.stringify(user);
      localStorage.setItem('userData', userData);
      setSeed(user.seed);
      setMyId(user.myId);
      setUsername(user.username);
      setLoggedIn(true);
      return console.log(getGlobal());
    };
  }


  const signup = () => {
    history.push('/signup');
  };

  const toggleLoginWithSeed = () => {
    setLoginWithSeed(prevState => !prevState);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {`Login with ${(loginWithSeed ? 'seed' : 'username/password')}`}
        </Typography>
        <form className={classes.form}>
          {!loginWithSeed
            ? (
              <>
                <PlainTextField
                  label="Username"
                  value={usernameInput}
                  setValue={setUsernameInput}
                />
                <PasswordTextField
                  setShowPassword={setShowPasswordInput}
                  password={passwordInput}
                  setPassword={setPasswordInput}
                  showPassword={showPasswordInput}
                />
              </>
            )
            : (
              <PlainTextField
                label="Seed"
                value={seedInput}
                setValue={setSeedInput}
              />
            )}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Button type="button" onClick={toggleLoginWithSeed}>
                {loginWithSeed ? 'Login with name/password' : 'Login with seed'}
              </Button>
            </Grid>
            <Grid item>
              <Button type="button" onClick={signup}>
                {'Create an account'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        variant={snackbarVariant}
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={2000}
      />
    </Container>
  );
}
