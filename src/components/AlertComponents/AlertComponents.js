import React from 'react'
import Alert from 'react-bootstrap/Alert'
import './AlertComponents.css'

function AlertComponents({message, variant, onClose}) {

    if (!message) return null;

    return (
        <Alert variant={variant} onClose={onClose} dismissible>
            {message}
        </Alert>
    )
}

export default AlertComponents