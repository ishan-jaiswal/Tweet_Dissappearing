import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Typography} from '@material-ui/core'
import DateTimePicker from 'react-datetime-picker';
import Grid from '@material-ui/core/Grid';
import Jadu from './Jadu';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// const useStyles = makeStyles({
//     root: {
//       width: '80vh',              
//       marginTop:'2vh'
//     },
    
//     title: {
//       fontSize: 14,
//     },
//     pos: {
//       marginBottom: 12,
//     },
//   });  
export default function Tweet() {
    const [open, setOpen] = React.useState(false);
    const [size,setSize]=React.useState(0.1*window.innerWidth);    
    const [content,setContent]=useLocalStorage('content','');
    const [date,setDate]=React.useState(new Date());
    const [tweet,setTweet]=useLocalStorage('tweet',[]);    
    const [expiry,setExpiry]=useLocalStorage('expiry',[]);
    //const [click,setClick]=React.useState(false);    
    React.useEffect(() => {
        setInterval(() => {
            setSize(0.1*window.innerWidth);                         
          }, 1000);                    
    }, [])
    function handleClick()
    {        
        setTweet([...tweet,content]) 
        setExpiry([...expiry,date])       
        setContent('')
        console.log(tweet);
        var now=new Date();
        if (now.getMinutes()+now.getHours()*60>=date.getMinutes()+date.getHours()*60)
        {
            setOpen(true)
        }
    }        
      const handleClose = () => {
        setOpen(false);
      };
    function useLocalStorage(key, initialValue) {
        // State to store our value
        // Pass initial state function to useState so logic is only executed once
        const [storedValue, setStoredValue] = React.useState(() => {
          try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
          } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
          }
        });        
        // Return a wrapped version of useState's setter function that ...
        // ... persists the new value to localStorage.
        const setValue = value => {
          try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
              value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
          }
        };
      
        return [storedValue, setValue];
    }                  
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">                    
                <DialogTitle id="alert-dialog-title">Input Error</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Enter Date after Current Date.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Ohkay
                </Button>               
                </DialogActions>
            </Dialog>
            <Grid container justify='flex-start' alignItems='flex-start' direction='column' >            
                <Grid container direction='column' justify='flex-start' alignItems='flex-end'>
                    <Grid>                        
                        <TextareaAutosize aria-label="Tweet" cols={size} rowsMin={5} placeholder="Enter the Tweet" value={content} maxLength={200} onChange={e=>setContent(e.target.value)}/>
                    </Grid>
                    <Grid>
                        <p>
                            {content.length}/{200}
                        </p>
                    </Grid>
                </Grid>
            
                <Grid container direction='row'  alignItems='flex-start' justify='flex-start'> 
                    <Typography style={{marginRight:'2vh'}}>Enter the Expiry Date</Typography>
                    <DateTimePicker                            
                        onChange={e=>{setDate(e)}}
                        value={date}
                        minDate={new Date()}
                    />
                </Grid>                        
                <Grid style={{paddingTop:'1vh'}}>
                    <Button variant="contained" style={{backgroundColor:'#1da1f2',color:'white'}}  disabled={content===''} onClick={handleClick}>Tweet</Button>           
                </Grid>
                <Grid container justify='center' alignItems='center' direction='column' >
                    {(
                        tweet.map((item,i)=>{
                            const exp=new Date(expiry[i])
                            console.log(tweet);
                            console.log(expiry);
                            return [
                                new Date()<=exp && (
                                    <Jadu exp={exp} item={item}/>
                                )                
                            ]
                        })                                    
                    )}
                </Grid>                
            </Grid>
        </div>
    )
}
