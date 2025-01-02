import { useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import "./ConteudoCadastroUsuario.css";

function ConteudoCadastroUsuario() {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [editMessage, setEditmessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const newErrors = {};

    const name = form["formNameCompleto"].value;
    const email = form["formEmail"].value;
    const senha = form["formSenha"].value;
    const confirmarSenha = form["formConfirmarSenha"].value;

    if (!name) {
      newErrors.formNameCompleto = "Por favor, insira o Nome Completo.";
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.formEmail = "Por favor, insira um email válido.";
    }

    if (!senha) {
      newErrors.formSenha = "Por favor, insira uma senha.";
    }

    if (!confirmarSenha || confirmarSenha !== senha) {
      newErrors.formConfirmarSenha = "As senhas não coincidem.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newUser = { id: Date.now(), name, email, senha };
      setUsers([...users, newUser]);
      setSuccessMessage("Usuário cadastrado com sucesso!");
      form.reset();
      setErrors({});
      setTimeout(() => setSuccessMessage(""), 3000); // Remove a mensagem após 5 segundos
    }
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setDeleteMessage("Usuário deletado com sucesso!");
    setTimeout(() => setDeleteMessage(""), 3000);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    setUsers(
      users.map((user) =>
        user.id === editingUser.id ? editingUser : user,
        setEditmessage("Usuário editado com sucesso!"),
        setTimeout(() => setEditmessage(""), 3000) // Remove a mensagem após 5 segundos
      )
    );
    
    setEditingUser(null);
    setShowModal(false);
 
  };

  const handleModalChange = (field, value) => {
    setEditingUser({ ...editingUser, [field]: value });
  };

  return (
    <>
    {/* Mensagem de sucesso */}
      <div className="alert-success">
        {successMessage && (
          <Alert
            variant="success"
            onClose={() => setSuccessMessage("")}
            dismissible
          >
            {successMessage}
          </Alert>
        )}

      {/* Mensagem de editar */}
      
        {editMessage && (
          <Alert
            variant="info"
            onClose={() => setEditmessage("")}
            dismissible
          >
            {editMessage}
          </Alert>
        )}

      {/* Mensagem de deletar */}
      
        {deleteMessage && (
          <Alert
            variant="danger"
            onClose={() => setDeleteMessage("")}
            dismissible
          >
            {deleteMessage}
          </Alert>
        ) }
      </div>
      <Container>
        <h1 className="title mt-4">Cadastro de Usuário</h1>
        <div className="container-form">
          <Form className="form" noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNameCompleto">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control type="text" placeholder="Nome Completo" />
              {errors.formNameCompleto && (
                <div className="text-danger">{errors.formNameCompleto}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" />
              {errors.formEmail && (
                <div className="text-danger">{errors.formEmail}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" />
              {errors.formSenha && (
                <div className="text-danger">{errors.formSenha}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmarSenha">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control type="password" placeholder="Confirmar Senha" />
              {errors.formConfirmarSenha && (
                <div className="text-danger">{errors.formConfirmarSenha}</div>
              )}
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Cadastrar
            </Button>
          </Form>
        </div>
      </Container>
      <Container className="mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody >
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.senha}</td>
                <td className="text-end">
                  <Button
                    className="m-1"
                    variant="warning"
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="m-1"
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal para editar usuário */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingUser && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    handleModalChange("name", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    handleModalChange("email", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  value={editingUser.senha}
                  onChange={(e) =>
                    handleModalChange("senha", e.target.value)
                  }
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConteudoCadastroUsuario;
