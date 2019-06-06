import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, CircularProgress } from '@material-ui/core';

export default class SimpleButton extends React.Component {
  render () {
    const { type, className, showLoader, variant, color, children, ...rest } = this.props
    return (
      <Button
        color={color}
        className={className}
        type={type || 'button'}
        variant={variant || 'contained'}
        {...rest}
      >
        { showLoader ? <ButtonLoader buttonColor={color} /> : children }
      </Button>
    )
  }
}

const useLoaderStyles = makeStyles(theme => ({
  loaderWrapper: {
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}))

function ButtonLoader (props) {
  const c = useLoaderStyles()
  const { buttonColor, color } = props
  let progressColor = 'primary'
  if (color != undefined) {
    progressColor = color
  } else if (buttonColor === 'primary') {
    progressColor = 'secondary'
  }

  return (
    <div className={c.loaderWrapper}>
      <CircularProgress
        size={20}
        className={c.loader}
        color={progressColor}
      />
    </div>
  )

}
