import React from 'react';
import dayjs from 'dayjs'
import { generalToast } from '../common/simple-toast/simple-toast.js';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core'

export default class AuditTrail extends React.Component {
  constructor() {
    super();
    this.state = {
      auditEvents: [],
    };
  }
  componentWillMount() {
    fetch('/api/auditlog', {credentials: 'same-origin'})
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(json => {
              this.setState({
                auditEvents: json,
              });
            })
            .catch(err => {
              generalToast(err)
            });
        } else {
          generalToast(`Could not retrieve audit events, server responded with '${response.status}'`);
        }
      })
      .catch(err => {
        generalToast(err);
      });
  }
  render() {
    return (
      <Container>
        <Paper>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.auditEvents.map((auditEvent, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {eventToString(auditEvent)}
                    </TableCell>
                    <TableCell>
                      {auditEvent.user}
                    </TableCell>
                    <TableCell>
                      {dayjs(auditEvent.date).calendar()}
                    </TableCell>
                    <TableCell>
                      {
                        JSON
                          .stringify(auditEvent.event_data, null, 4)
                          .split("\n")
                          .map((line, index) => {
                            return (
                              <div key={index}>
                                {line.replace(/ /g, "\u00a0")}
                              </div>
                            );
                          })
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    );
  }
}

function eventToString(auditEvent) {
  const eventNameMap = {
    "toggle.switch": "Turn feature "
  };
  let suffix = "";
  if (auditEvent.event === 'toggle.switch') {
    suffix = auditEvent.event_data.new_state.toLowerCase();
  }
  const string = eventNameMap[auditEvent.event] || auditEvent.event;
  return string + suffix;
}
