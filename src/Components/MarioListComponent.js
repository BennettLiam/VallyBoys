import React from "react"
import MarioComponent from "./MarioComponent"
import { Container, Row } from "react-bootstrap"

export default function MarioList( {marios, deleteMario} ){
    return (
        <Container>
            <Row>
            {marios.map(mario => {
                return <MarioComponent key={mario.id} mario={mario} deleteMario={deleteMario}/>
            })}
            </Row>
        </Container>
    )
}