import React from 'react'
import Layout from '../Layout/Layout'
import ConteudoCadastroEquipamento from '../../ConteudoPages/ConteudoCadastroEquipamento/ConteudoCadastroEquipamento'

function CadastroEquipamento() {
    return (
        <>
            <Layout 
                children={
                    <ConteudoCadastroEquipamento />
                }
            />
        </>
    )
}

export default CadastroEquipamento