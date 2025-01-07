import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FaUserEdit } from "react-icons/fa";
import "./ConteudoUsuario.css";
import AlertComponents from "../../components/AlertComponents/AlertComponents";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";

function ConteudoUsuario() {
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditmessage] = useState("");

  const [userData, setUserData] = useState({
    nome: "Edu Edu",
    email: "edu@edu",
    senha: "eduedu",
  });

  const toggleEdit = () => {
    if (isEditing) {
      setEditmessage("Dados atualizados com sucesso!");
      setTimeout(() => setEditmessage(""), 3000);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {editMessage && (
        <AlertComponents
          message={editMessage}
          variant="success"
          onClose={() => setEditmessage("")}
        />
      )}
      <Container className="">
        <h1 className="title mt-4">Dados do Usuário</h1>
        <Card className="shadow containerEditUsers">
          <div className="iconsUser">
            <FaUserEdit className="iconUser" />
          </div>
          <Card.Body>
            <Form.Label id="formNameCompleto" name="formNameCompleto">
              Nome Completo
            </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                name="nome"
                type="text"
                value={userData.nome}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </InputGroup>

            <Form.Label id="formEmail" name="formNameEmail">
              Email
            </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </InputGroup>

            <Form.Label id="formSenha" name="formSenha">
              Senha
            </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                name="senha"
                type="password"
                value={userData.senha}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </InputGroup>

            <div className="text-end buttonUserEdit">
              <ButtonComponents
                variant={isEditing ? "success" : "warning"}
                type="button"
                texto={isEditing ? "Salvar" : "Editar"}
                onClick={toggleEdit}
              />
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ConteudoUsuario;
