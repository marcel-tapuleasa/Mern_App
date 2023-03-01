import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import Box from '@mui/material/Box';


const styles = {
    hotelCard: {
        boxShadow: '5px 5px 20px -4px #EACDF2',
        marginTop: '20px',
        width: '370px',
        height: '400px',
        marginBottom: '1%',
    }
}


function Hotel (props) {

    const {title, location, description, id, classes, images} = props;

    return(
        <Box>
             <Card className={classes.hotelCard} variant='outlined'>
                <CardMedia
                    component="img"
                    alt="generic hotel"
                    height="150"
                    image={images[0].url}
                    style={{objectFit: 'cover'}}
                />
                <CardContent>
                    <div>
                        <Typography gutterBottom variant="h4">{title}</Typography>
                        <Typography variant="h7" color="primary">{location}</Typography>
                    </div>
                    <hr></hr>
                <Typography variant="body2" color="text.secondary">{description.substring(0,100)}...</Typography>
                </CardContent>
                <CardActions>
                    <Button href={`/hotels/${id}`} size="small">Details</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default withStyles(styles)(Hotel);