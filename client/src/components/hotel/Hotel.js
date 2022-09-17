import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';


const styles = {
    hotelCard: {
        boxShadow: '5px 5px 20px -4px #EACDF2',
        marginTop: '20px',
        maxWidth: 400,
        marginBottom: '30px'
    }
}


function Hotel (props) {

    const {title, location, description, id, classes, images} = props;

    return(
        <div>
             <Card className={classes.hotelCard} variant='outlined' >
                <CardMedia
                    component="img"
                    alt="generic hotel"
                    height="140"
                    image={images[0].url}
                    // image="https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                />
                <CardContent>
                    <div>
                        <Typography gutterBottom variant="h4">{title}</Typography>
                        <Typography variant="h7" color="primary">{location}</Typography>
                    </div>
                    <hr></hr>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
                </CardContent>
                <CardActions>
                    <Button href={`/hotels/${id}`} size="small">Details</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default withStyles(styles)(Hotel);