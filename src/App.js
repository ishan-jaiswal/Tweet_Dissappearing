import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid'
import Tweet from './Tweet';

function App() {
  return (
    <div className="App">
      <header>        
      <Grid item spacing={64} >
        <Grid style={{height:'20vh'}} className='App-logo' container direction='column' justify='center' alignItems='center'>
          <img src={logo} alt='logo' />        
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
