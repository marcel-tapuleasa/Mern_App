import React from 'react';

function Hotel (props) {


    return(
        <div>
            <h1>{props.title}</h1>
            <h1>{props.location}</h1>
        </div>
    )
}

export default Hotel;