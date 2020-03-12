import React from 'react';
import './Char.css';
const Char = (props) => {
    const { character, clicked } = props;
    return (
        <div onClick={clicked} className="Char">
            <p >
                {character}
            </p>
        </div>
    )
}

export default Char; 