import React from 'react';

import Review from './Review';

function ReviewList (props) {

  
// let {reviews} = props;
const reviews = props.reviews?.slice(0).reverse().map((review, idx) => {
    return <Review toggleUpdate={props.toggleUpdate} hotelId={props.hotelId} key ={idx} review={review}/>;
    
})
            
    return(

       
        <div style={{marginTop: 60, border: '0.5px solid #b7edea'}}>
           {reviews} 
          
        </div>
        
    )

}

export default ReviewList;