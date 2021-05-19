import { EntityError, SaveError } from "breeze-client/src/entity-manager";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const SaveErrorDialog = (props: { title: string, saveError: SaveError | null, onClose: () => void})  => {
  
  return (
    <>
      <Modal
        show={props.saveError!=null}
        onHide={props.onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {props.saveError?.entityErrors.map( (err: EntityError) => 
              <li key={err.propertyName}>{err.errorMessage}</li>
            )}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}