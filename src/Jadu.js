import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardContent,Typography} from '@material-ui/core';
const useStyles = makeStyles({
    root: {
      width: '80vh',              
      marginTop:'2vh'
    },
    
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });  
export default function Jadu(props) {
    const classes = useStyles();
    const [check,setCheck]=React.useState(false);
    React.useEffect(() => {
        setInterval(() => {
            if(new Date()>=props.exp)
            {
                setCheck(false)            
            }
            else
            {
                setCheck(true)
            }    
          }, 1000);                    
    }, [])
    return (
        <div>
            {check===true && (
                <Card className={classes.root} raised={true}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Tweet
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {props.item}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Expiry Date
                        </Typography>
                        <Typography variant="body2" component="p">
                            {props.exp.getDate()+'/'+(props.exp.getMonth()+1)+'/'+props.exp.getFullYear()}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Expiry Time
                        </Typography>
                        <Typography variant="body2" component="p">
                            {props.exp.getHours()+':'+props.exp.getMinutes()}
                        </Typography>
                    </CardContent>                    
                </Card>
            )}
        </div>
    )
}
