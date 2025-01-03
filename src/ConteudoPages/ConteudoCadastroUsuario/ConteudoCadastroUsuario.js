import { useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import "./ConteudoCadastroUsuario.css";
import AlertComponents from "../../components/AlertComponents/AlertComponents";

function ConteudoCadastroUsuario() {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [editMessage, setEditmessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const newErrors = {};

    const nome = form["formNameCompleto"].value;
    const email = form["formEmail"].value;
    const senha = form["formSenha"].value;
    const confirmarSenha = form["formConfirmarSenha"].value;

    if (!nome) {
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
      const newUser = { id: Date.now(), nome, email, senha };
      setUsers([...users, newUser]);
      setSuccessMessage("Usuário cadastrado com sucesso!");
      form.reset();
      setErrors({});
      setTimeout(() => setSuccessMessage(""), 3000);
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
      users.map(
        (user) => (user.id === editingUser.id ? editingUser : user),
        setEditmessage("Usuário editado com sucesso!"),
        setTimeout(() => setEditmessage(""), 3000)
      )
    );

    setEditingUser(null);
    setShowModal(false);
  };

  const handleModalChange = (field, value) => {
    setEditingUser({ ...editingUser, [field]: value });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="alert-success">
        <AlertComponents
          message={successMessage}
          variant="success"
          onClose={() => setSuccessMessage("")}
        />

        <AlertComponents
          message={editMessage}
          variant={"info"}
          onClose={() => setEditmessage("")}
        />

        <AlertComponents
          message={deleteMessage}
          variant={"danger"}
          onClose={() => setDeleteMessage("")}
        />
      </div>

      <Container>
        <h1 className="title mt-4">Cadastro de Usuário</h1>
        <div className="container-form">
          <Form className="form" noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNameCompleto">
              <Form.Label id="formNameCompleto" name="formNameCompleto">
                Nome Completo
              </Form.Label>
              <Form.Control
                type="text"
                maxLength={70}
                placeholder="Nome Completo"
              />
              {errors.formNameCompleto && (
                <div className="text-danger">{errors.formNameCompleto}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" maxLength={50} placeholder="Email" />
              {errors.formEmail && (
                <div className="text-danger">{errors.formEmail}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                maxLength={10}
                placeholder="Senha"
              />
              {errors.formSenha && (
                <div className="text-danger">{errors.formSenha}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmarSenha">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control
                type="password"
                maxLength={10}
                placeholder="Confirmar Senha"
              />
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
        <div className="search">
        <Form.Group controlId="formSearch">
          <Form.Label>Buscar Usuários</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome ou email do usuário"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        </div>
      </Container>

      <Container className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
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
                  value={editingUser.nome}
                  onChange={(e) => handleModalChange("name", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => handleModalChange("email", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  value={editingUser.senha}
                  onChange={(e) => handleModalChange("senha", e.target.value)}
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
