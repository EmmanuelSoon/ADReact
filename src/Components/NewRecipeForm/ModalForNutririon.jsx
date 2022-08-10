import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
function ModalForNutrition(props) {
    const{show, setShow, fullNutritionInfo} = props
    return (
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nutrition Information Summary</Modal.Title>
                </Modal.Header>
                    <Modal.Body>{fullNutritionInfo}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Continue</Button>
                </Modal.Footer>
            </Modal>
    )
}
export default ModalForNutrition