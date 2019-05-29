import React from 'react';
import { Router, Route, Link, Redirect, hashHistory } from 'react-router';
import TogglesContainer from './toggles/toggles.container.js';
import RootContainer from './menu/root.container.js';
import AuditTrail from './audit-trail/audit-trail.container.js';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles'
import { green, blue } from '@material-ui/core/colors'
console.log('green', green)

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: blue,
  }
})

export default class RootComponent extends React.Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={hashHistory}>
          <Route path="/" component={RootContainer}>
            <Route path="audit-trail" component={AuditTrail} />
            <Route path="toggles" component={TogglesContainer} />
          </Route>
        </Router>
      </ThemeProvider>
    );
  }
}
