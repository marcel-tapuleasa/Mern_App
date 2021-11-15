import React from 'react';

function Hotel (props) {


    return(
        <div>
            <h1>{props.title}</h1>
            <h2>{props.location}</h2>
        </div>
    )
}

export default Hotel;