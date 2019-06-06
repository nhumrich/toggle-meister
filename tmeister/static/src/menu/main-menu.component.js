import React from 'react';
import { Tooltip, Paper, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import useLocalStorageAsToggle from 'common/use-localstorage-as-toggle.hook.js'

const useStyles = makeStyles(theme => ({
  menu: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  menuItem: {
    padding: 8,
    textDecoration: 'none',
    '&.active' : {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  icon: {
    color: theme.palette.text.primary,
    width: '100%',
    height: '100%',
    fontSize: '3rem',
  }
}))

export default function MainMenu(props) {
  const classes = useStyles()
  const releaseNotesActive = useLocalStorageAsToggle('release-notes')
  return (
    <Paper className={classes.menu} classes={classes}>
      <Tooltip title="Manage toggles">
        <a
          className={`${classes.menuItem} ${activeIcon("toggles")}`}
          href="/#/toggles"
        >
          <Icon className={classes.icon}>
            toggle_on
          </Icon>
        </a>
      </Tooltip>
      <Tooltip title="Audit trail">
        <a
          className={`${classes.menuItem} ${activeIcon("audit-trail")}`}
          href="/#/audit-trail"
        >
          <Icon className={classes.icon}>
            history
          </Icon>
        </a>
      </Tooltip>
      {
        releaseNotesActive && (
          <Tooltip title="Release Notes">
            <a
              className={`${classes.menuItem} ${activeIcon("release-notes")}`}
              href="/#/release-notes"
            >
              <Icon className={classes.icon}>
                notes
              </Icon>
            </a>
          </Tooltip>
        )
      }
    </Paper>
  );
}

function activeIcon(urlFragment) {
  return window.location.hash.indexOf(urlFragment) >= 0 ? 'active' : '';
}
