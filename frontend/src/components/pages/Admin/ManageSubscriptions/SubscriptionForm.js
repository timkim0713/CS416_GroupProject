import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {Button} from "../../../Button";
import Modal from "react-bootstrap/Modal";
import {Col} from "react-bootstrap";

export default function SubscriptionForm (prop) {
  return (
    <div style={{margin: "auto"}} className="subscription-form-container">
      <Form validated onSubmit={prop.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md={"4"} controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={prop.handleName} placeholder='Enter Name' required/>
          </Form.Group>
          <Form.Group as={Col} md={"2"} controlId="formSubscribed">
            <Form.Label>Subscribe?</Form.Label>
            <div className="isSubscribed_checkbox-container">
              <input name="isSubscribed" type="checkbox" onChange={prop.handleSubscribed} defaultChecked="true"/>
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={"4"} controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" onChange={prop.handleEmail} placeholder='Enter Email' required/>
          </Form.Group>
        </Form.Row>
        <Modal.Footer>
          <Button onClick={prop.handleClose} buttonColor="msc_orange_invert"
                  buttonSize="btn--medium">Close</Button>
          <Button type="submit" buttonColor="msc_orange" buttonSize="btn--medium">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </div>
  );
}