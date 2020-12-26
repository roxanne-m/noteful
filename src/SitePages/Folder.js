import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Split.css';



function Folder(props) {console.log(`${props.id}`);
    return (
        <div>
            <fieldset className='folder-style'>
                <NavLink to = {`/folder/${props.id}`}>
                    {props.name}{': '}
                </NavLink>
                {props.number}
            </fieldset>
        </div> 
    )
    
}

export default Folder;