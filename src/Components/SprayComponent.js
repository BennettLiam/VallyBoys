import React from "react"
import { Card, Button } from "react-bootstrap"

export default function SprayComponent({ spray, deleteSpray }) {
    function handleDeleteClick() {
        deleteSpray(spray.id)
    }
    return (
        <Card style={{ width:'12rem', textAlign:"center"}} text="white" bg="dark" border="light" className="m-2">
            <Card.Img variant="top" src={spray.fullTransparentIcon} alt={spray.name} />
            <Card.Body>
                <Card.Title>{spray.name}</Card.Title>
                <Card.Text>
                    <Card.Link href={spray.fullTransparentIcon}>Image link</Card.Link>
                </Card.Text>
                <Button onClick={handleDeleteClick} variant="danger">Delete Card</Button>
            </Card.Body>
        </Card>
    )
}