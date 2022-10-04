import React from "react"
import { Modal, Button } from "react-bootstrap"

export default function ModalComponent({ handleYes, handleNo, title, body }) {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleNo}>
                    No
                </Button>
                <Button variant="primary" onClick={handleYes}>
                    Yes
                </Button>
            </Modal.Footer>
        </>
    )
}