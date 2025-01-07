import React from 'react';
import Button from 'react-bootstrap/Button';

function ButtonComponents({variant, type, texto, onClick}) {
    return (
        <Button variant={variant} type={type} onClick={onClick}>{texto}</Button>
    );
}

export default ButtonComponents;