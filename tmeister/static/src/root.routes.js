import React from 'react';
import { Router, Route, Link, Redirect, hashHistory } from 'react-router';
import TogglesContainer from './toggles/toggles.container.js';
import RootContainer from './menu/root.container.js';
import AuditTrail from './audit-trail/audit-trail.container.js';

export default class RootComponent extends React.Component {

  render() {

    return (
      <Router history={hashHistory}>
        <Route path="/" component={RootContainer}>
          <Route path="audit-trail" component={AuditTrail} />
          <Route path="toggles" component={TogglesContainer} />
        </Route>
      </Router>
    );
  }
}
