import { React, useState } from "react";
import { Container, Card, Form, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import "./ConteudoCadastroEquipamento.css";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import AlertComponents from "../../components/AlertComponents/AlertComponents";
import Table from "react-bootstrap/Table";

function ConteudoCadastroEquipamento() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [equipamentos, setEquipamentos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [editingEquipamento, setEditingEquipamento] = useState(null);

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
    };

    if (!data.cliente || !data.marca) {
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
      )

      setAlertMessage("Equipamento editado com sucesso!");
      setAlertVariant("info");
      setTimeout(() => setAlertMessage(""), 3000);

    }else {
      setEquipamentos((prevEquipamentos) => [...prevEquipamentos, data]);
      setAlertMessage("Equipamento cadastrado com sucesso!");
      setAlertVariant("success");
      setTimeout(() => setAlertMessage(""), 3000);
    }
    
    
    setSelectedCliente(null);
    setEditingEquipamento(null)
    form.reset();
  };

  const handleEdit = (equipamento) => {
    setEditingEquipamento(equipamento);
    setSelectedCliente(
      clientes.find((cliente) => cliente.label === equipamento.cliente)
    )

  }

  const handleDelete = (id) => {
    setEquipamentos((prevEquipamentos) =>
      prevEquipamentos.filter((equipamento) => equipamento.id !== id)
    );
    setAlertMessage("Equipamento excluído com sucesso!");
    setAlertVariant("danger");
    setTimeout(() => setAlertMessage(""), 3000);
  }

  

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
                <Form.Group className="mt-3" as={Col} md="3">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control 
                  type="text" 
                  name="marca" 
                  placeholder="Marca" 
                  defaultValue={editingEquipamento ? editingEquipamento.marca : ""}
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

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Marca</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipamentos.map((equipamento) => (
              <tr key={equipamento.id}>
                <td>{equipamento.cliente}</td>
                <td>{equipamento.marca}</td>
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
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default ConteudoCadastroEquipamento;
