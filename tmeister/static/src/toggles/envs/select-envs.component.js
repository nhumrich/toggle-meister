import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Input, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox, Chip } from '@material-ui/core';
import { getEnvList } from '../table/toggle-table.helpers.js';
import { getSelectedEnvs } from './select-envs.helpers.js';
import { chain, uniq, includes, partial } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 1,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectEnvs({toggles = [], setEnvs, envs}) {
  const envList = getEnvList(toggles);
  const selectedEnvs = envs;
  useInitializeSelectedEnvs(setEnvs)
  const classes = useStyles()

  const selectedItems = envList.filter(item => includes(selectedEnvs, item));


  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="select-multiple-chip">Environments</InputLabel>
      <Select
        multiple
        value={selectedItems}
        onChange={itemsChanged}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => {
              return (
                <Chip key={value} label={value} className={classes.chip} />
              )
            })}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {envList.map(v => (
          <MenuItem key={v} value={v}>
            {v}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )

  function itemsChanged(e) {
    const value = e.target.value
    setSelectedEnvs(value)
  }

  function setSelectedEnvs(envItems) {
    const envs = chain(envItems)
      .concat("production")
      .uniq()
      .value();

    window.localStorage.setItem(`selected-envs`, JSON.stringify(envs));
    setEnvs(envs)
  }
}

function toPillboxItem(env) {
  return {
    label: env,
    value: env,
  };
}

function useInitializeSelectedEnvs(setEnvs) {
  useEffect(() => {
    setEnvs(getSelectedEnvs())
  }, [])
}

