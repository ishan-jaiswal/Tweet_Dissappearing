import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core'
import Slider from '@material-ui/core/Slider';
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
    const [date,setDate]=React.useState(0);
    const [content,setContent]=React.useState('');
    const [click,setClick]=React.useState(false);
    React.useEffect(() => {                
    }, [])
    function handleClick()
    {
        setClick(true);
        setTimeout(()=>{        
            setContent('')},86400*date);
    }
    function valuetext(value) {
        return `${value}°C`;
      }            
      const handleChange = (event, newValue) => {
        setDate(newValue);
        
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
             <Slider
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
            />
            <Button style={{borderRadius:'5vh',backgroundColor:'lightblue'}} onClick={handleClick}>Tweet</Button>           
            {content!=='' && click===true && (
                <Typography>
                    {content}
                </Typography>
            )}
        </div>
    )
}
