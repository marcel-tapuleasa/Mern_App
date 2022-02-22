import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withStyles } from '@mui/styles';

import { useFormik } from 'formik';
import * as yup from 'yup';



const theme = createTheme();

const styles = {
  main: {
    margin: '7% auto',
    padding: '32px',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(6, 122, 184)',
    borderRadius: 3,
    backgroundColor: 'white',
    boxShadow: '5px 5px 20px -4px #EACDF2'

  },
  sloganText: {
    padding: '40px',
    color: '3C4257',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '30px'

  },
  inputField: {
  }
}

const validationSchema = yup.object({
    title: yup
      .string('Enter Hotel Name')
      .required('Name is required'),
    location: yup
      .string('Enter location')
      .required('Location is required'),
    description: yup
    .string('Enter description')
    .min(20, 'Description shold be of minimum 20 characters length')
    .required('Description is required'),
    price: yup
    .number('Enter price')
    .min(0, 'Price should be greater than 0')
    .required('Price is required')


  });

function NewHotelForm (props) {

// const [title, setTitle] = useState('');
// const [location, setLocation] = useState('');
// const [description, setDescription] = useState('');
// const [price, setPrice] = useState('');
let navigate = useNavigate();
const {classes} = props;


const onSubmit = (values) => {
    const {title, location, description, price} = values;
    axios.post('http://localhost:5000/addhotel', {title: title, location: location, description: description, price: price});
    navigate('/hotels')
    
};

// const onSubmit = (values) => {
//     alert(JSON.stringify(values))
// }

const formik = useFormik({
    initialValues: {title: '', location: '', description: '', price: ''},
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit
});

return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
            <Box
            component='form'
            noValidate
            onSubmit={formik.handleSubmit}
            className={classes.main}
            >
              
                <Typography className={classes.sloganText}>Enlist your Hotel with us</Typography>
              <TextField
                fullWidth
                sx={{mt:'32px'}}
                variant='outlined'
                label='Hotel Name'
                name='title'
                value={formik.values.title}
                placeholder='Enter Hotel Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                />
                
            
             <TextField
                fullWidth
                className={classes.inputField}
                variant='outlined'
                sx={{mt:'32px',}}
                label='Location'
                name='location'
                value={formik.values.location}
                placeholder='Enter Location'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
                />
             <TextField
                sx={{mt:'32px'}}
                fullWidth
                className={classes.inputField}
                variant='outlined'
                label='Description'
                name='description'
                value={formik.values.description}
                placeholder='Enter Description'
                multiline
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                />

            <div>
            <MonetizationOnTwoToneIcon sx={{color: 'green', mt: 4}}/>     
            <TextField
                sx={{mt:'45px', mr: 'auto'}}
                id="filled-number"
                name='price'
                value={formik.values.price}
                label="Price/night"
                type="number"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
            />
            </div>
                <Button
                    sx={{mt:'32px'}}
                    fullWidth
                    variant='contained'
                    type='submit'>Add Hotel
                </Button>
            
        </Box>
    </ThemeProvider>        
)

}

export default withStyles(styles)(NewHotelForm);
