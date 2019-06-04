import React from 'react';
import { Router, Route, Link, Redirect, hashHistory } from 'react-router';
import TogglesContainer from './toggles/toggles.container.js';
import RootContainer from './menu/root.container.js';
import AuditTrail from './audit-trail/audit-trail.container.js';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles'
import ReleaseNotes from './release-notes/release-notes.component.js'

const palette = {
  primary: {
    main: '#00BF4B',
    contrastText: '#ffffff',
  },
  secondary: { main: '#3399ff' }
};

const theme = createMuiTheme({palette})

export default class RootComponent extends React.Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={hashHistory}>
          <Route path="/" component={RootContainer}>
            <Route path="audit-trail" component={AuditTrail} />
            <Route path="toggles" component={TogglesContainer} />
            <Route path="release-notes" component={ReleaseNotes} />
          </Route>
        </Router>
      </ThemeProvider>
    );
  }
}
