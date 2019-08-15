import React, { useGlobal } from 'reactn';
import { withRouter, Redirect } from 'react-router-dom';
import { Routes } from 'utils/constants';

const RedirectIfLoggedIn = Component => withRouter((props) => {
  /* eslint-disable-next-line */
  const [ loggedIn ] = useGlobal('loggedIn');
  if (loggedIn) {
    return (<Redirect to={Routes.HOME} />);
  }
  return (<Component {...props} />);
});

export default RedirectIfLoggedIn;
