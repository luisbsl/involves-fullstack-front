import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const Loading = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100%' }}
    >
      <Grid item xs={12}>
        <CircularProgress style={{ color: '#000' }} />
      </Grid>
    </Grid>
  )
}

export default Loading