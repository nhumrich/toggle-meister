import React from 'react';
import { Tooltip, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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
    backgroundColor: theme.palette.primary[400]
  },
  menuItem: {
    padding: 8,
    textDecoration: 'none',
    '&.active' : {
      backgroundColor: theme.palette.primary[700],
    },
    '&:hover': {
      backgroundColor: theme.palette.primary[700],
    },
  },
  icon: {
    width: '100%',
    height: '100%'
  }
}))

export default function MainMenu(props) {
  const classes = useStyles()
	return (
		<Paper className={classes.menu} classes={classes}>
			<Tooltip title="Manage toggles">
        <a
          className={`${classes.menuItem} ${activeIcon("toggles")}`}
          title="Manage toggles"
          href="/#/toggles"
        >
					<img src='/resources/toggle-icon.png' className={classes.icon} />
				</a>
			</Tooltip>
			<Tooltip title="Audit trail">
        <a
          className={`${classes.menuItem} ${activeIcon("audit-trail")}`}
          href="/#/audit-trail"
        >
					<img src='/resources/audit-icon.png' className={classes.icon} />
				</a>
			</Tooltip>
		</Paper>
	);
}

function activeIcon(urlFragment) {
	return window.location.hash.indexOf(urlFragment) >= 0 ? 'active' : '';
}
