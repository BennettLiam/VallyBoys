import React from "react"
import CardComponent from "./CardComponent"
import { Container, Row } from "react-bootstrap"

export default function CardList( {cards, deleteCard} ){
    return (
        <Container>
            <Row>
            {cards.map(card => {
                return <CardComponent key={card.id} card={card} deleteCard={deleteCard}/>
            })}
            </Row>
        </Container>
    )
}