import React from "react"
import { Col, Container } from "react-bootstrap"
import styles from './card.module.css'

export default function Card( {card, deleteCard} ){
    function handleDeleteClick(){
        deleteCard(card.id)
    }
    return (
            <Col xs={2} className={styles.bigblue}> 
            <h2>{card.name}</h2>
                <img src={card.image} alt={card.name}></img>
                <button onClick={handleDeleteClick}>Delete Card</button>
            </Col>
    )
}