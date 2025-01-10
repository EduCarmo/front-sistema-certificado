import React from "react";
import { Form } from "react-bootstrap";

function SearchComponents({ titulo, type, textPlaceholder, value, onChange }) {
  return (
    <>
      <div className="search mt-4">
        <Form.Group controlId="formSearch">
          <Form.Label>{titulo}</Form.Label>
          <Form.Control
            type={type}
            placeholder={textPlaceholder}
            value={value}
            onChange={onChange}
          />
        </Form.Group>
      </div>
    </>
  );
}

export default SearchComponents;
