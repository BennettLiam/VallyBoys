import React from "react"
import SprayComponent from "./SprayComponent"
import { Container, Row } from "react-bootstrap"

export default function CardList( {sprays, deleteSpray} ){
    return (
        <Container>
            <Row>
            {sprays.map(spray => {
                return <SprayComponent key={spray.id} spray={spray} deleteSpray={deleteSpray}/>
            })}
            </Row>
        </Container>
    )
}