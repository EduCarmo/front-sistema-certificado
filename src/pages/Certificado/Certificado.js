import React from 'react'
import Layout from '../Layout/Layout'
import ConteudoCertificado from '../../ConteudoPages/ConteudoCertificado/ConteudoCertificado'

function Certificado() {
    return (
        <>
            <Layout 
                children={
                    <ConteudoCertificado />
                }
            />
        </>
    )
}

export default Certificado