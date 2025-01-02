import React from 'react'
import Layout from "../Layout/Layout";
import ConteudoUsuario from '../../ConteudoPages/ConteudoUsuario/ConteudoUsuario';


function Usuario() {
    return (
        <>
            <Layout 
                children={
                    <ConteudoUsuario />
                }
            />
        </>
    )
}

export default Usuario