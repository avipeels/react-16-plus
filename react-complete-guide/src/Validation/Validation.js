import React from 'react';
const Validation = (props) => {
    const {textLength} = props;
    const minLength = 5;
    let validationMessage = '';
    validationMessage = textLength > minLength? 'Text long enough' : 'Text too short';
    return (
        <p>
            {validationMessage}
        </p>
    )
}

export default Validation;