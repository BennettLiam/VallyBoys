import React from "react"
import { Card, Button } from "react-bootstrap"

export default function CardComponent({ card, deleteCard }) {
    function handleDeleteClick() {
        deleteCard(card.id)
    }
    return (
        <Card style={{ width:'12rem', textAlign:"center"}} text="white" bg="dark" border="light" className="m-2">
            <Card.Img variant="top" src={card.displayIcon} alt={card.name} />
            <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>
                    <Card.Link href={card.displayIcon}>Image link</Card.Link>
                </Card.Text>
                <Button onClick={handleDeleteClick} variant="danger">Delete Card</Button>
            </Card.Body>
        </Card>
    )
}