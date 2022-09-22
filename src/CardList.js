import React from "react"
import Card from "./Card"
import { Col, Container, Row } from "react-bootstrap"

export default function CardList( {cards, deleteCard} ){
    return (
        <Container>
            <Row>
            {cards.map(card => {
                return <Card key={card.id} card={card} deleteCard={deleteCard}/>
            })}
            </Row>
        </Container>
    )
}