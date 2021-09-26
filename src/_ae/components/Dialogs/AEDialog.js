/* eslint-disable no-restricted-imports */
import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {AEButton} from "../buttons";
import {AEAlert} from "../toastify/AEAlert";


/* example */
const example = {
  title:"Delete user",
  content:"Are you sure ?",
  buttons:{
    cancel:{
      title:"Cancel",
      onClick:()=>{

      },
    }
  }
}

export const useAlert = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //TODO Make alert effect
  return {
    Dialog: <AEAlert show={show} />,
    handleClose,
    handleShow,
  }
}


export function AEDialog({_show = false, title, content, buttons}) {
  const [show, setShow] = useState(_show);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <Modal show={show} onHide={handleClose} >
      <Modal.Header closeButton>
        {
          title &&
          <Modal.Title id="example-modal-sizes-title-lg">
            { title }
          </Modal.Title>
        }
      </Modal.Header>
      <Modal.Body>
        { content }
      </Modal.Body>
      <Modal.Footer>
        {
          Object.keys(buttons).map((title, onClick= ()=>{})=>{
            return <AEButton onClick={onClick} >{title}</AEButton>
          })
        }
      </Modal.Footer>
    </Modal>
  );
}
