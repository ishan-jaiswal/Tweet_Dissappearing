import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography} from '@material-ui/core'
import DateTimePicker from 'react-datetime-picker';
import Grid from '@material-ui/core/Grid';
import { Card,CardContent } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles({
    root: {
      width: '80%',              
      margin:'1vh'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
export default function Tweet() {
    const classes = useStyles();
    //const today=new Date();
    // const minDate=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const [content,setContent]=React.useState('');
    const [date,setDate]=React.useState(new Date());
    const [tweet,setTweet]=React.useState([]);
    const [expiry,setExpiry]=React.useState([]);
    const [click,setClick]=React.useState(false);
    //const [difference,setDifference]=React.useState([{day:0,year:0,month:0,hour:0,min:0}])    
    function handleClick()
    {
        setClick(true);
        setTweet([...tweet,content]) 
        setExpiry([...expiry,date])       
        setContent('')
        // setTimeout(()=>{        
        //     setContent('')},1000*(difference.day*86400+difference.month*86400*30+difference.year*364*86400+difference.hour*3600+difference.min*60));
    }                
    // const handleDateChange = (date) => {
    //     if (date!==null)
    //     {
    //         setDate(date);
    //         // const days=date.getDate()-today.getDate();
    //         // const years=date.getFullYear()-today.getFullYear();
    //         // const months=date.getMonth()-today.getMonth();
    //         // const hours=date.getHours()-today.getHours();
    //         // const mins=date.getMinutes()-today.getMinutes();
    //         //setDifference(...difference,{day:days,year:years,month:months,hour:hours,min:mins})        
    //     }
    //     else{
    //         setDate(date);
    //     }                
    // };
    return (
        <div>
            <Grid container justify='flex-start' alignItems='flex-start' direction='column' >            
                <Grid container direction='row' justify='flex-start' alignItems='flex-end'>
                    <Grid>
                        <TextareaAutosize aria-label="Tweet" cols={200} rowsMin={5} placeholder="Enter the Tweet" value={content} maxLength={200} onChange={e=>setContent(e.target.value)}/>
                    </Grid>
                    <Grid>
                        <p>
                            {content.length}/{200}
                        </p>
                    </Grid>
                </Grid>
            
                <Grid>
                    <Typography>Enter the Expiry Date</Typography>
                    <DateTimePicker                            
                        onChange={e=>{setDate(e)}}
                        value={date}
                        minDate={new Date()}
                    />
                </Grid>                        
                <Grid style={{paddingTop:'1vh'}}>
                    <Button variant="outlined" color="primary" disabled={content===''} onClick={handleClick}>Tweet</Button>           
                </Grid>
                <Grid container justify='center' alignItems='center' direction='row' >
                    {click===true && (
                        tweet.map((item,i)=>{
                            const exp=expiry[i]                            
                            return [
                                <Card className={classes.root} raised={true}>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Tweet
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {item}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Expiry Date
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {exp.getDate()+'/'+(exp.getMonth()+1)+'/'+exp.getFullYear()}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Expiry Time
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {exp.getHours()+':'+exp.getMinutes()}
                                        </Typography>
                                    </CardContent>                    
                                </Card>
                
                            ]
                        })                                    
                    )}
                </Grid>                
            </Grid>
        </div>
    )
}
