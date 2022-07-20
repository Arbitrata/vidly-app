import React from 'react';


const Buttons = ({label,onClick,history}) => {
    return ( 
        <button onClick={onClick} className="btn btn-primary ">{label}</button>

     );
}
 
export default Buttons;