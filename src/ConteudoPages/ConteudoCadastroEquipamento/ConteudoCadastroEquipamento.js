import { React, useState } from "react";
import { Container, Card, Form, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import "./ConteudoCadastroEquipamento.css";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import AlertComponents from "../../components/AlertComponents/AlertComponents";
import Table from "react-bootstrap/Table";
import SearchComponents from "../../components/SearchComponents/SearchComopnents";

function ConteudoCadastroEquipamento() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [equipamentos, setEquipamentos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [editingEquipamento, setEditingEquipamento] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [clientes, setClientes] = useState([
    { value: "total-tecnologia", label: "Total Tecnologia" },
    { value: "tech-libra", label: "TechLibra" },
    { value: "total-balancas", label: "Total Balanças" },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      id: editingEquipamento ? editingEquipamento.id : Date.now(),
      cliente: selectedCliente ? selectedCliente.label : "",
      marca: form["marca"].value,
      modelo: form["modelo"].value,
      serie: form["serie"].value,
      patrimonio: form["patrimonio"].value,
      classe: form["classe"].value,
      tag: form["tag"].value,
      capacidade: form["capacidade"].value,
      resolucaod: form["resolucaod"].value,
      resolucaoe: form["resolucaoe"].value,
    };

    if (
      !data.cliente ||
      !data.marca ||
      !data.modelo ||
      !data.serie ||
      !data.patrimonio ||
      !data.classe ||
      !data.tag ||
      !data.capacidade ||
      !data.resolucaod ||
      !data.resolucaoe
    ) {
      setAlertMessage("Por favor, preencha todos os campos.");
      setAlertVariant("danger");
      setTimeout(() => setAlertMessage(""), 3000);
      return;
    }

    if (editingEquipamento) {
      setEquipamentos((prevEquipamentos) =>
        prevEquipamentos.map((equipamento) =>
          equipamento.id === editingEquipamento.id ? data : equipamento
        )
      );

      setAlertMessage("Equipamento editado com sucesso!");
      setAlertVariant("info");
      setTimeout(() => setAlertMessage(""), 3000);
    } else {
      setEquipamentos((prevEquipamentos) => [...prevEquipamentos, data]);
      setAlertMessage("Equipamento cadastrado com sucesso!");
      setAlertVariant("success");
      setTimeout(() => setAlertMessage(""), 3000);
    }

    setSelectedCliente(null);
    setEditingEquipamento(null);
    form.reset();
  };

  const handleEdit = (equipamento) => {
    setEditingEquipamento(equipamento);
    setSelectedCliente(
      clientes.find((cliente) => cliente.label === equipamento.cliente)
    );
  };

  const handleDelete = (id) => {
    setEquipamentos((prevEquipamentos) =>
      prevEquipamentos.filter((equipamento) => equipamento.id !== id)
    );
    setAlertMessage("Equipamento excluído com sucesso!");
    setAlertVariant("danger");
    setTimeout(() => setAlertMessage(""), 3000);
  };

  const filteredEquipamentos = equipamentos.filter((equipamento) => {
    return (
      equipamento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamento.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamento.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamento.serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamento.patrimonio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamento.classe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamento.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamento.capacidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamento.resolucaod.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamento.resolucaoe.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      {alertMessage && (
        <AlertComponents message={alertMessage} variant={alertVariant} />
      )}
      <Container>
        <h2 className="title mt-4">Cadastro de Equipamento</h2>
        <Card className="shadow p-1 containerCadastroEquipamento">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <div className="">
                  <Form.Label>Cliente</Form.Label>
                  <Select
                    options={clientes}
                    placeholder="Selecione o Cliente"
                    isSearchable
                    name="cliente"
                    value={selectedCliente}
                    onChange={(selectedOption) =>
                      setSelectedCliente(selectedOption)
                    }
                  />
                </div>
              </Row>
              <Row>
                <Form.Group className="mt-3" as={Col} md="4">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    name="marca"
                    placeholder="Marca"
                    defaultValue={
                      editingEquipamento ? editingEquipamento.marca : ""
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-3" as={Col} md="4">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    type="text"
                    name="modelo"
                    placeholder="Modelo"
                    defaultValue={
                      editingEquipamento ? editingEquipamento.modelo : ""
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-3" as={Col} md="4">
                  <Form.Label>Nº Série</Form.Label>
                  <Form.Control
                    type="text"
                    name="serie"
                    placeholder="Nº Série"
                    defaultValue={
                      editingEquipamento ? editingEquipamento.serie : ""
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mt-3" as={Col} md="4">
                  <Form.Label>Patrimônio</Form.Label>
                  <Form.Control
                    type="text"
                    name="patrimonio"
                    placeholder="Patrimônio"
                    defaultValue={
                      editingEquipamento ? editingEquipamento.patrimonio : ""
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-3" as={Col} md="4">
                    <Form.Label>Classe</Form.Label>
                    <Form.Control
                      type="text"
                      name="classe"
                      placeholder="Classe"
                      defaultValue={
                        editingEquipamento ? editingEquipamento.classe : ""
                      }
                    />
                </Form.Group>
                <Form.Group className="mt-3" as={Col} md="4">
                  <Form.Label>Tag</Form.Label>
                  <Form.Control
                    type="text"
                    name="tag"
                    placeholder="Tag"
                    defaultValue={
                      editingEquipamento ? editingEquipamento.tag : ""
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mt-3" as={Col} md="4">
                  <Form.Label>Capacidade</Form.Label>
                  <Form.Control
                    type="text"
                    name="capacidade"
                    placeholder="Capacidade"
                    defaultValue={
                      editingEquipamento ? editingEquipamento.capacidade : ""
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-3" as={Col} md="4">
                  <Form.Label>Resolução d =</Form.Label>
                  <Form.Control
                    type="text"
                    name="resolucaod"
                    placeholder="Resolução"
                    defaultValue={
                      editingEquipamento ? editingEquipamento.resolucao : ""
                    }
                  />
                </Form.Group>
                <Form.Group className="mt-3" as={Col} md="4">
                  <Form.Label>Resolução e =</Form.Label>
                  <Form.Control
                    type="text"
                    name="resolucaoe"
                    placeholder="Resolução"
                    defaultValue={
                      editingEquipamento ? editingEquipamento.resolucao : ""
                    }
                  />
                </Form.Group>
              
              </Row>
              <div className="mt-4">
                <ButtonComponents
                  variant="success"
                  type="submit"
                  texto={editingEquipamento ? "Salvar" : "Cadastrar"}
                />
              </div>
            </Form>
          </Card.Body>
        </Card>

        <SearchComponents
          titulo="Buscar Equipamento"
          textPlaceholder="Buscar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Marca</th>
              <th>Nº Série</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipamentos.length > 0 ? (
              filteredEquipamentos.map((equipamento) => (
                <tr key={equipamento.id}>
                  <td>{equipamento.cliente}</td>
                  <td>{equipamento.marca}</td>
                  <td>{equipamento.serie}</td>
                  <td className="text-end">
                    <div className="buttonCadastroEquipamentosAcoes">
                      <ButtonComponents
                        variant="warning"
                        type="button"
                        texto="Editar"
                        onClick={() => handleEdit(equipamento)}
                      />
                      <ButtonComponents
                        variant="danger"
                        type="button"
                        texto="Excluir"
                        onClick={() => handleDelete(equipamento.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">
                  Nenhum equipamento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default ConteudoCadastroEquipamento;