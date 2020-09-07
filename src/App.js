import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid'
import Tweet from './views/Tweet';
import { Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
function App() {
  return (
    <div>
      <header>        
      <Grid item spacing={64} >
        <Grid style={{height:'10vh'}} >
        <AppBar style={{backgroundColor:'#1da1f2'}}>
        <Toolbar >
          <Typography variant="h6">Dissappearing Tweets</Typography>
        </Toolbar>
        </AppBar>
        </Grid>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Tweet />
        </Grid>
      </Grid>
      </header>
    </div>
  );
}

export default App;
