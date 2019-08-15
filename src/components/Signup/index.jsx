import React, { useState, useContext } from 'reactn';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PasswordTextField from 'components/shared/PasswordTextField';
import PlainTextField from 'components/shared/PlainTextField';
import { isTrytes } from '@iota/validators';
import Snackbar from 'components/shared/Snackbar';
import { getUserHash, generateTrytes } from 'utils';
import { DBContext } from 'store';
import { Color, SEED_LENGTH } from 'utils/constants';
import uuidv4 from 'uuid/v4';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
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
  seedGen: {
    margin: theme.spacing(2, 0, 0),
  },
}));

export default function Signup({ history }) {
  const db = useContext(DBContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [seed, setseed] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [snackbarVariant, setSnackbarVariant] = useState('info');
  const [snackbarMessage, setSnackbarMessage] = useState('Info');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  function openSnackbar(message, variant) {
    setSnackbarMessage(message);
    setSnackbarVariant(variant);
    setSnackbarOpen(true);
  }

  function generateSeed() {
    setseed(generateTrytes(SEED_LENGTH));
  }

  const classes = useStyles();

  function login() {
    history.push('/login');
  }

  function signup() {
    const userCollection = db.getCollection('users');
    const existingUser = userCollection.findOne({ username });
    const existingSeed = userCollection.findOne({ seed });
    if (!username || !seed || !password) {
      return openSnackbar('Please enter all required field', 'error');
    }
    if (existingUser) {
      return openSnackbar('Username existed', 'error');
    }
    if (existingSeed) {
      return openSnackbar('Account for seed existed', 'error');
    }
    if (!isTrytes(seed, SEED_LENGTH)) {
      return openSnackbar('Invalid Seed', 'error');
    }
    const userHash = getUserHash(username, password);
    const myId = uuidv4();
    userCollection.insert({
      username,
      userHash,
      seed,
      myId,
    });

    openSnackbar('Account created', 'success');
    history.push('/login');
  }

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <PlainTextField
            label="Username"
            value={username}
            setValue={setUsername}
          />
          <PasswordTextField
            setShowPassword={setShowPassword}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
          />
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className={classes.seedGen}
            onClick={generateSeed}
          >
            Generate Seed
          </Button>

          <PlainTextField
            label="Seed"
            value={seed}
            setValue={setseed}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signup}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={login}>
                Already have an account? Log in
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
