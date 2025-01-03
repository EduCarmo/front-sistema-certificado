import React, { useState } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";

import "./Login.css";
import AlertComponents from "../../components/AlertComponents/AlertComponents";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erros, setErros] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.formEmail = "Por favor, insira um email válido.";
    }

    if (!password) {
      newErrors.formSenha = "Por favor, insira uma senha.";
    }

    setErros(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setAlertMessage("Login realizado com sucesso!");
      setAlertVariant("success");
      setTimeout(() => setAlertMessage(""), 3000);
    } else {
      setAlertMessage("Erro ao realizar login.");
      setAlertVariant("danger");
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  return (
    <>
      <div className="alert-success">
        {alertMessage && (
          <AlertComponents
            message={alertMessage}
            variant={alertVariant}
            onClose={() => setAlertMessage("")}
          />
        )}
      </div>
      <header className="topo"></header>
      <div className="background-fundo">
        <Container fluid>
          <Row>
            <Col md={7} className="logo-container flex-column text-center">
              <h1 className="logo-title">
                TOTAL <span>BALANÇAS</span>
              </h1>
              <p className="description">Balanças e Serviços</p>
            </Col>
            <Col md={5}>
              <Card className="form-login shadow">
                <Card.Body>
                  <h2 className="text-center mb-4 login-title">Login</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={erros.formEmail}
                        required
                      />
                      {erros.formEmail && (
                        <Form.Control.Feedback type="invalid">
                          {erros.formEmail}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formSenha" className="mb-3">
                      <Form.Label>Senha</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={erros.formSenha}
                        required
                      />
                      {erros.formSenha && (
                        <Form.Control.Feedback type="invalid">
                          {erros.formSenha}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <button className="loginButton w-100 mt-4" type="submit">Entrar</button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Login;
