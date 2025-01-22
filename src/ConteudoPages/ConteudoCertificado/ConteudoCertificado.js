import React, { useState } from "react";
import {
  Card,
  Container,
  Form,
  Button,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import Select from "react-select";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import "./ConteudoCertificado.css";
import exentricidadeImage from "../../assets/image/exentricidade.png";
import SearchComponents from "../../components/SearchComponents/SearchComopnents";
import AlertComponents from "../../components/AlertComponents/AlertComponents";

function ConteudoCertificado() {
  const [step, setStep] = useState(1);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);
  const [savedData, setSavedData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [clientes] = useState([
    { value: "total-tecnologia", label: "Total Tecnologia" },
    { value: "tech-libra", label: "TechLibra" },
    { value: "total-balancas", label: "Total Balanças" },
  ]);

  const [equipamentos] = useState([
    { value: "toleto-do-brasil", label: "Toleto do Brasil" },
    { value: "balmak", label: "Balmak" },
    { value: "gehaka", label: "Gehaka" },
  ]);

  const [formData, setFormData] = useState({
    setor: "",
    pontoTrabalho: "",
    instalacao: "",
    primeiraCarga: "",
    primeiraLeitura: "",
    primeiraErro: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSave = () => {
    const newData = {
      id: editingId || Date.now(),
      cliente: selectedCliente?.label || "",
      equipamento: selectedEquipamento?.label || "",
      ...formData,
    };

    if (
      !newData.cliente ||
      !newData.equipamento ||
      !newData.setor ||
      !newData.pontoTrabalho ||
      !newData.instalacao ||
      !newData.primeiraCarga ||
      !newData.primeiraLeitura ||
      !newData.primeiraErro
    ) {
      setAlertMessage("Preencha todos os campos!");
      setAlertVariant("danger");
      setTimeout(() => setAlertMessage(""), 3000);
      return;
    }

    if (editingId) {
      setSavedData((prev) =>
        prev.map((item) => (item.id === editingId ? newData : item))
      );
      setAlertMessage("Certificado editado com sucesso!");
      setAlertVariant("info");
      setTimeout(() => setAlertMessage(""), 3000);
      setEditingId(null);
    } else {
      setSavedData((prev) => [...prev, newData]);
      setAlertMessage("Certificado cadastrado com sucesso!");
      setAlertVariant("success");
      setTimeout(() => setAlertMessage(""), 3000);
    }

    resetForm();
    setStep(1);
  };

  const handleEdit = (equipamento) => {
    setSelectedCliente({
      value: equipamento.cliente,
      label: equipamento.cliente,
    });
    setSelectedEquipamento({
      value: equipamento.equipamento,
      label: equipamento.equipamento,
    });
    setFormData({
      setor: equipamento.setor || "",
      pontoTrabalho: equipamento.pontoTrabalho || "",
      instalacao: equipamento.instalacao || "",
      primeiraCarga: equipamento.primeiraCarga || "",
      primeiraLeitura: equipamento.primeiraLeitura || "",
      primeiraErro: equipamento.primeiraErro || "",
    });

    setEditingId(equipamento.id);
  };

  const handleDelete = (id) => {
    setSavedData((prev) => prev.filter((item) => item.id !== id));
    setAlertMessage("Certificado excluído com sucesso!");
    setAlertVariant("danger");
    setTimeout(() => setAlertMessage(""), 3000);
  };

  const resetForm = () => {
    setSelectedCliente(null);
    setSelectedEquipamento(null);
    setFormData({
      setor: "",
      pontoTrabalho: "",
      instalacao: "",
      primeiraCarga: "",
      primeiraLeitura: "",
      primeiraErro: "",
    });
  };

  const filteredData = savedData.filter(
    (item) =>
      item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.equipamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.setor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instalacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {alertMessage && (
        <AlertComponents message={alertMessage} variant={alertVariant} />
      )}
      <Container>
        <h2 className="title mt-4">Certificado de Calibração</h2>
        <Card className="shadow p-1 containerCadastroEquipamento">
          <Card.Body>
            {step === 1 && (
              <>
                <Form>
                  <Row>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Cliente</Form.Label>
                      <Select
                        options={clientes}
                        placeholder="Selecione o Cliente"
                        isSearchable
                        value={selectedCliente}
                        onChange={(selectedOption) =>
                          setSelectedCliente(selectedOption)
                        }
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Equipamento</Form.Label>
                      <Select
                        options={equipamentos}
                        placeholder="Selecione o Equipamento"
                        isSearchable
                        value={selectedEquipamento}
                        onChange={(selectedOption) =>
                          setSelectedEquipamento(selectedOption)
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mt-3" as={Col} md="6">
                      <Form.Label>Setor</Form.Label>
                      <Form.Control
                        type="text"
                        name="setor"
                        value={formData.setor}
                        onChange={handleChange}
                        placeholder="Setor do cliente"
                      />
                    </Form.Group>
                    <Form.Group className="mt-3" as={Col} md="6">
                      <Form.Label>Ponto de Trabalho</Form.Label>
                      <Form.Control
                        type="text"
                        name="pontoTrabalho"
                        value={formData.pontoTrabalho}
                        onChange={handleChange}
                        placeholder="Ex.: 0, 50, 100, 150 kg"
                      />
                    </Form.Group>
                  </Row>
                  <div className="mt-3">
                    <span>Instalações</span>
                  </div>
                  <Row>
                    <div className="d-flex mt-3">
                      <Form.Check
                        inline
                        label="TOTAL BALANÇAS"
                        type="radio"
                        name="instalacao"
                        value="TOTAL BALANÇAS"
                        checked={formData.instalacao === "TOTAL BALANÇAS"}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        label="CLIENTE"
                        type="radio"
                        name="instalacao"
                        value="Cliente"
                        checked={formData.instalacao === "Cliente"}
                        onChange={handleChange}
                      />
                    </div>
                  </Row>
                </Form>
              </>
            )}

            {step === 2 && (
              <>
                <Form>
                  <Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>1º Carga</Form.Label>
                      <Form.Control
                        type="text"
                        name="primeiraCarga"
                        value={formData.primeiraCarga}
                        onChange={handleChange}
                        placeholder="Ex.: 0, 50, 100, 150 kg"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Leitura</Form.Label>
                      <Form.Control
                        type="text"
                        name="primeiraLeitura"
                        value={formData.primeiraLeitura}
                        onChange={handleChange}
                        placeholder="Ex.: 0, 50, 100, 150 kg"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Erro</Form.Label>
                      <Form.Control
                        type="text"
                        name="primeiraErro"
                        value={formData.primeiraErro}
                        onChange={handleChange}
                        placeholder="Ex.: 0, 50, 100, 150 kg"
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </>
            )}

            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="secondary"
                onClick={prevStep}
                disabled={step === 1}
              >
                Voltar
              </Button>
              {step === 2 ? (
                <Button variant="success" onClick={handleSave}>
                  Salvar
                </Button>
              ) : (
                <Button variant="primary" onClick={nextStep}>
                  Avançar
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>

        <SearchComponents
          titulo="Certificados Cadastrados"
          textPlaceholder="Buscar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Equipamento</th>
              <th>Setor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data) => (
                <tr key={data.id}>
                  <td>{data.cliente}</td>
                  <td>{data.equipamento}</td>
                  <td>{data.setor}</td>
                  <td>{data.instalacao}</td>
                  <td className="text-end">
                    <div className="buttonCadastroCertificadoAcoes">
                      <ButtonComponents
                        variant="warning"
                        type="button"
                        texto="Editar"
                        onClick={() => handleEdit(data)}
                      />
                      <ButtonComponents
                        variant="danger"
                        type="button"
                        texto="Excluir"
                        onClick={() => handleDelete(data.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  Nenhum certificado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default ConteudoCertificado;
