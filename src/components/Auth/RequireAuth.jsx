import React, { useGlobal } from 'reactn';
import { withRouter, Redirect } from 'react-router-dom';
import { Routes } from 'utils/constants';

const RequireAuth = Component => withRouter((props) => {
  /* eslint-disable-next-line */
  const [ loggedIn ] = useGlobal('loggedIn');
  if (loggedIn) {
    return (<Component {...props} />);
  }
  return (<Redirect to={Routes.LOGIN} />);
});

export default RequireAuth;
