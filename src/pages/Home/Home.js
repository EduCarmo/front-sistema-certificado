import React from 'react'
import Layout from '../Layout/Layout'
import ConteudoHome from '../../ConteudoPages/ConteudoHome/ConteudoHome'

function Home() {
    return (
        <>
            < Layout 
                children={
                   < ConteudoHome />
                }
            />
        </>
    )
}

export default Home