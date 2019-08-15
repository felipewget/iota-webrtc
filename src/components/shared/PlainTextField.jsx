import React from 'react';
import TextField from '@material-ui/core/TextField';

const PlainTextField = ({ setValue, value, label }) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    label={label}
    type="text"
    id={label.toLowerCase()}
    value={value}
    onChange={e => setValue(e.target.value)}
  />
);

export default PlainTextField;
