import React from "react";
import Form from "react-bootstrap/Form";
import "./FormComponents.css";

function FormComponens({tituloLabel, type, value, onChange}) {
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>{tituloLabel}</Form.Label>
          <Form.Control
            type={type}
            value={value}
            onChange={onChange}
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default FormComponens;
