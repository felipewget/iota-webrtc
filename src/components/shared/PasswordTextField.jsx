import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const PasswordTextField = ({
  setShowPassword, password, setPassword, showPassword,
}) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    name="password"
    label="Password"
    type={showPassword ? 'text' : 'password'}
    id="password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            edge="end"
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(prevState => !prevState)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
);

export default PasswordTextField;
