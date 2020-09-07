import React from 'react';
import { Button, Typography} from '@material-ui/core'
import DateTimePicker from 'react-datetime-picker';
import Grid from '@material-ui/core/Grid';
import Jadu from './Jadu';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import useLocalStorage from './useLocalStorage';

export default function Tweet() {
    const [open, setOpen] = React.useState(false);
    const [size,setSize]=React.useState(0.1*window.innerWidth);    
    const [content,setContent]=useLocalStorage('content','');
    const [date,setDate]=React.useState(new Date());
    const [tweet,setTweet]=useLocalStorage('tweet',[]);    
    const [expiry,setExpiry]=useLocalStorage('expiry',[]);    
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
        var now=new Date();
        if (now.getMinutes()+now.getHours()*60>=date.getMinutes()+date.getHours()*60)
        {
            setOpen(true)
        }
    }        

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }        
        setOpen(false);    
        setDate(new Date());        
      };    
      
    return (
        <div>            
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Wrong Time Input"
                action={
                <React.Fragment>
                    <Button color="secondary" size="small" onClick={handleClose}>
                    UNDO
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />

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
                            const exp=new Date(expiry[i]);                            
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
