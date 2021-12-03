import React from 'react';




function Hotel (props) {


    return(
        <div>
            <h1>{props.title}</h1>
            <h3>{props.location}</h3>
        </div>
    )
}

export default Hotel;