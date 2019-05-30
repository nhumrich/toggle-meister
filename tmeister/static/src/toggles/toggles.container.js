import React, {useState} from 'react';
import ToggleControls from './toggle-controls.component.js';
import ToggleTable from './table/toggle-table.component.js';
import styles from './toggles.container.css';
import { useFetchToggles, useFilterToggles } from './toggles.hooks.js'
import { Container, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: '8px'
  },
  controls: {
    marginBottom: '16px'
  },
  container: {
    padding: 16,
  }
}))

export default function TogglesContainer (props) {
  const classes = useStyles()
  const [ search, setSearch ] = useState()
  const [ toggles, refetch ] = useFetchToggles()
  const [ envs, setEnvs ] = useState(['production'])
  const filteredToggles = useFilterToggles(envs, toggles, search)

  return (
    <Container className={`${styles.root}`}>
      <Paper className={classes.container}>
        <Typography className={classes.header} variant='h2'>
          Manage feature toggles
        </Typography>
        <div className={classes.controls}>
          <ToggleControls
            toggles={toggles}
            searchToggles={setSearch}
            refetchToggles={refetch}
            setEnvs={setEnvs}
            envs={envs}
          />
        </div>
        <ToggleTable
          toggles={filteredToggles}
          refetchToggles={refetch}
        />
      </Paper>
    </Container>
  );
}
