import React from 'react'
import Layout from '../Layout/Layout'
import ConteudoCadastroUsuario from '../../ConteudoPages/ConteudoCadastroUsuario/ConteudoCadastroUsuario'

function CadastroUsuario() {
    return (
        <>
           <Layout 
                children={
                    <ConteudoCadastroUsuario />
                }
            />
        </>   
    )
}

export default CadastroUsuario