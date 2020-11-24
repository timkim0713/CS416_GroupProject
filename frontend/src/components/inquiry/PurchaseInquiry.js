import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import InputGroup from "react-bootstrap/InputGroup";
import SampleImage from "../../images/s1.jpg";
import ReactImageAppear from "react-image-appear";

const axios = require("axios");
const apiBaseUrl =
  "https://sunyk-msc-backend.herokuapp.com/inquiry/general/send/";

const schema = yup.object({
  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  message: yup
    .string()
    .min(10, "Please provide more details (10-300 characters)")
    .max(300, "Too Long!")
    .required("Last name is required"),
  type: yup.string().required(),
});

const purchaseMapping = (option) => {
  if (option === "Cash") {
    return 0;
  } else if (option === "Wire Bank Account") {
    return 1;
  } else if (option === "Card") {
    return 2;
  } else {
    return -1;
  }
};
function PurchaseInquiry(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ opacity: 1 }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Purchase Inquiry
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br></br>

        <h4>
          Fill out the inquiry form below about the Product ID:{" "}
          {props.dataToModal}
        </h4>
        <br></br>

        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            let payload = {
              first_name: values.firstName,
              last_name: values.lastName,
              email: values.email,
              message: values.message,
              purchase_method_id: purchaseMapping(values.type),
              // collection_item_id:
            };

            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(payload, null, 2));

            axios
              .post(apiBaseUrl, payload) //values is the form's data
              .then((response) => {
                // Check if internet connection was working
                if (response.status === 200) {
                  if (response.data.res_code === 1) {
                    // Everything worked correctly
                    // Do something with the returned data
                    console.log("Post SUCCESS", response.data.res_msg);
                    alert("Successfully Sent.");
                    window.location.reload();
                    // } else if (){
                    // Check other res_code with else if
                    // }
                  } else {
                    // Unhandled res_code
                    alert(
                      "Post: Unhandled res_code / the entered email may be wrong "
                    );
                  }
                } else {
                  // TODO handle unable to connect with database
                  alert("Post: unable to connect with database");
                }
              })
              .catch(function (error) {
                // TODO handle error with the call
                alert("Post: Call error");
                console.log(error);
              });
          }}
          initialValues={{}}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationFormikProduct">
                  <Form.Label>Product Information</Form.Label>
                  <br />
                  <Form.Text style={{ fontSize: "15px" }}>
                    Product ID is {props.dataToModal}
                  </Form.Text>{" "}
                  <br />
                  <Form.Text style={{ fontSize: "15px" }}>
                    Product Name is ... {props.dataToModal}
                  </Form.Text>{" "}
                  <br />
                  <Form.Text style={{ fontSize: "15px" }}>
                    Product Price is ... {props.dataToModal}
                  </Form.Text>{" "}
                  <br />
                  <Form.Text style={{ fontSize: "15px" }}>
                    Product Image{" "}
                    <ReactImageAppear
                      src={SampleImage}
                      alt={"img"}
                      animation="bounceIn"
                    />
                  </Form.Text>{" "}
                  <br />
                </Form.Group>
                <Form.Group as={Col} md="1"></Form.Group>
                {/* space between product and form */}
                <Form.Group as={Col} md="4" controlId="userForm">
                  <Form.Row>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={!!errors.lastName}
                      size="lg"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={!!errors.firstName}
                      size="lg"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Row>

                  <br />
                  <Form.Row>
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      size="lg"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Row>
                  <br />
                  <br />
                  <Form.Row>
                    <Form.Label>Purchase Methods</Form.Label>
                    <Form.Control
                      as="select"
                      value={values.type}
                      onChange={handleChange}
                      size="lg"
                    >
                      <option>Cash</option>
                      <option>Wire Bank Account</option>
                    </Form.Control>
                  </Form.Row>
                </Form.Group>
              </Form.Row>

              <br />
              <Form.Row>
                {/* <Form.Group as={Col} md="4" controlId="validationFormikType">
       
                </Form.Group> */}

                <Form.Group
                  as={Col}
                  md="11"
                  size="lg"
                  controlId="validationFormikNotes"
                >
                  <Form.Label size="lg">Note</Form.Label>
                  <Form.Text style={{ fontSize: "15px" }}>
                    In the message below, please include your preferred option
                    (size / color / quantity) of the product, and we will
                    proceed your purchase after contacting you through your
                    email again shortly.{" "}
                  </Form.Text>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  md="11"
                  controlId="validationFormikMessage"
                >
                  <Form.Label>Message</Form.Label>

                  <Form.Control
                    placeholder="Your detailed purchasing inquiry on color, size, quantity, and anything else ."
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                    size="lg"
                    as="textarea"
                    rows="10"
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <br />
              <br />
              <div align="right">
                <Button variant="light" size="lg" onClick={props.onHide}>
                  Close
                </Button>
                <Button type="submit" size="lg" variant="dark">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default PurchaseInquiry;
