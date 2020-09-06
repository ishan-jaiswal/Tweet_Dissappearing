import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core'
import DateTimePicker from 'react-datetime-picker';
//import Slider from '@material-ui/core/Slider';
// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: '25ch',
//     },
//   }));
export default function Tweet() {
    // const classes = useStyles();
    const today=new Date();
    const [date,setDate]=React.useState(new Date());
    const [content,setContent]=React.useState('');
    const [click,setClick]=React.useState(false);
    const [difference,setDifference]=React.useState({day:0,year:0,month:0,hour:0,min:0})
    React.useEffect(() => {                
    }, [])
    function handleClick()
    {
        setClick(true);
        setTimeout(()=>{        
            setContent('')},1000*(difference.day*86400+difference.month*86400*30+difference.year*364*86400+difference.hour*3600+difference.min*60));
    }    

    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // var dateTime = date+' '+time;             
    const handleDateChange = (date) => {
        if (date!==null)
        {
            setDate(date);
            const days=date.getDate()-today.getDate();
            const years=date.getFullYear()-today.getFullYear();
            const months=date.getMonth()-today.getMonth();
            const hours=date.getHours()-today.getHours();
            const mins=date.getMinutes()-today.getMinutes();
            setDifference({day:days,year:years,month:months,hour:hours,min:mins})
            console.log(difference);
        }
        else{
            setDate(date)
        }
    };
    return (
        <div>
            <TextField
                id="filled-full-width"
                label="Tweet"
                style={{ margin: 8 }}
                placeholder="Type here"
                helperText="Enter the tweet."
                fullWidth
                onChange={e=>setContent(e.target.value)}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
            />
             {/* <Slider
                defaultValue={1}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                onChange={handleChange}
                //onChange={e=>setDate(e.target.value)}
                marks
                min={1}
                max={10}
            /> */}
            <DateTimePicker
                onChange={handleDateChange}
                value={date}
            />
            <br />
            <br />
            <Button style={{borderRadius:'5vh',backgroundColor:'lightblue'}} onClick={handleClick}>Tweet</Button>           
            {content!=='' && click===true && (
                <Typography>
                    {content}
                </Typography>
            )}
        </div>
    )
}
