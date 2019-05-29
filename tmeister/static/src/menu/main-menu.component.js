import React from 'react';
import styles from './main-menu.styles.css';
import { Tooltip, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary[400]
  },
  menuItem: {
    textDecoration: 'none',
    '&.active' : {
      backgroundColor: theme.palette.primary[700]
    }
  }
}))

export default function MainMenu(props) {
  const classes = useStyles()
	return (
		<Paper className={`${styles.menu} `} classes={classes}>
			<Tooltip title="Manage toggles">
        <a
          className={`${styles.menuItem} ${classes.menuItem} ${activeIcon("toggles")}`}
          title="Manage toggles"
          href="/#/toggles"
        >
					<img src='/resources/toggle-icon.png' className={`${styles.icon}`} />
				</a>
			</Tooltip>
			<Tooltip title="Audit trail">
        <a
          className={`${styles.menuItem} ${classes.menuItem} ${activeIcon("audit-trail")}`}
          href="/#/audit-trail"
        >
					<img src='/resources/audit-icon.png' className={`${styles.icon}`} />
				</a>
			</Tooltip>
		</Paper>
	);
}

function activeIcon(urlFragment) {
	return window.location.hash.indexOf(urlFragment) >= 0 ? 'active' : '';
}
