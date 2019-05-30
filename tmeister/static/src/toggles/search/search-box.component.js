import React from 'react';
import { InputBase, Paper, Icon, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    height: 40,
    marginRight: 8,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  icon: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

export default function SearchBox ({search}) {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder='Search features'
        type='text'
        onChange={e => search(e.target.value)}
      />
      <Divider className={classes.divider} />
      <Icon className={classes.icon}>
        search
      </Icon>
    </Paper>
  );
}
