import React from 'react'
import Layout from '../Layout/Layout';
import ConteudoCadastroCliente from '../../ConteudoPages/ConteudoCadastroCliente/ConteudoCadastroCliente';


function CadastroCliente() {
    return (
        <>
            <Layout 
                children={
                    <ConteudoCadastroCliente />
                }
            />
        </>
    );
}

export default CadastroCliente