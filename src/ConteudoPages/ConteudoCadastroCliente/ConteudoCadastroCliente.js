import React from "react";
import { useState, useRef } from "react";
import { Card, Container, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { FaSearch } from "react-icons/fa";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import AlertComponents from "../../components/AlertComponents/AlertComponents";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import "./ConteudoCadastroCliente.css";
import SearchComponents from "../../components/SearchComponents/SearchComopnents";

function ConteudoCadastroCliente() {
  const [cnpj, setCnpj] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [clienteParaEditar, setClienteParaEditar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      id: Date.now(),
      cnpj: form["cnpj"].value,
      razaoSocial: form["razaoSocial"].value,
      nomeFantasia: form["nomeFantasia"].value,
      email: form["email"].value,
      ddd: form["ddd"].value,
      telefone: form["telefone"].value,
      celular: form["celular"].value,
      cep: form["cep"].value,
      tipoEndereco: form["tipoEndereco"].value,
      endereco: form["endereco"].value,
      numero: form["numero"].value,
      complemento: form["complemento"].value,
      bairro: form["bairro"].value,
      cidade: form["cidade"].value,
      estado: form["estado"].value,
    };

    if (
      !data.cnpj ||
      !data.razaoSocial ||
      !data.nomeFantasia ||
      !data.email ||
      !data.ddd ||
      !data.telefone ||
      !data.celular ||
      !data.cep ||
      !data.endereco ||
      !data.numero ||
      !data.bairro ||
      !data.cidade ||
      !data.estado
    ) {
      setAlertMessage("Por favor, preencha todos os campos.");
      setAlertVariant("danger");
      setTimeout(() => setAlertMessage(""), 3000);
      return;
    }

    if (clienteParaEditar) {
      const updatedTableData = tableData.map((cliente) =>
        cliente.id === clienteParaEditar.id ? data : cliente
      );
      setTableData(updatedTableData);
      setClienteParaEditar(null);
      setAlertMessage("Cadastro atualizado com sucesso!");
      setAlertVariant("info");
      setTimeout(() => setAlertMessage(""), 3000);
      setIsEditing(false);
    } else {
      setTableData((prevTableData) => [...prevTableData, data]);
      setAlertMessage("Cadastro realizado com sucesso!");
      setAlertVariant("success");
    }
    setTimeout(() => setAlertMessage(""), 3000);
    handleClear();
  };

  const handleDelete = (id) => {
    const updatedTableData = tableData.filter((cliente) => cliente.id !== id);
    setTableData(updatedTableData);
    setAlertMessage("Cadastro excluído com sucesso!");
    setAlertVariant("danger");
    setTimeout(() => setAlertMessage(""), 3000);
  };

  const handleEdit = (cliente) => {
    setIsEditing(true);
    setClienteParaEditar(cliente);
    setFormData({
      cnpj: cliente.cnpj,
      razao_social: cliente.razaoSocial,
      estabelecimento: {
        nome_fantasia: cliente.nomeFantasia,
        email: cliente.email,
        ddd1: cliente.ddd,
        telefone1: cliente.telefone,
        celular: cliente.celular,
        cep: cliente.cep,
        tipo_logradouro: cliente.tipoEndereco,
        logradouro: cliente.endereco,
        numero: cliente.numero,
        complemento: cliente.complemento,
        bairro: cliente.bairro,
        cidade: { nome: cliente.cidade },
        estado: { nome: cliente.estado },
      },
    });
  };

  const formRef = useRef(null);

  const handleClear = () => {
    formRef.current.reset();
    setCnpj("");
    setFormData(null);
    setClienteParaEditar(null)
  };

  const filteredClientes = tableData.filter(
    (cliente) =>
      (cliente.cnpj?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (cliente.razaoSocial?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (cliente.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (cliente.ddd?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (cliente.telefone?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (cliente.celular?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (cliente.cep?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (cliente.endereco?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (cliente.numero?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (cliente.bairro?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (cliente.cidade?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (cliente.estado?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const handleSearch = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.get(`https://publica.cnpj.ws/cnpj/${cnpj}`);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
      setAlertMessage("Por favor, insira um CNPJ válido.");
      setAlertVariant("danger");
      setTimeout(() => setAlertMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {alertMessage && (
        <AlertComponents message={alertMessage} variant={alertVariant} />
      )}

      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="success" />
        </div>
      )}

      <Container>
        <h2 className="title mt-4">Cadastro de Cliente</h2>
        <Card className="shadow p-1 containerCadastroCliente">
          <Card.Body>
            <Form className="form" ref={formRef} onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col} md="5" className="form-group-search">
                  <div className="label-group-search">
                    <Form.Label className="mb-1" controlId="formCNPJ">
                      CNPJ
                    </Form.Label>
                    <Form.Control
                      name="cnpj"
                      type="text"
                      maxLength={14}
                      placeholder="CNPJ"
                      value={formData?.cnpj || cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                    />
                  </div>
                  <button className="buttonSearch" onClick={handleSearch}>
                    <FaSearch />
                  </button>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  md="6"
                  className="mb-1 mt-2"
                  controlId="formRazaoSocial"
                >
                  <Form.Label>Razão Social</Form.Label>
                  <Form.Control
                    name="razaoSocial"
                    type="text"
                    placeholder="Razão Social"
                    value={formData?.razao_social || ""} 
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        razao_social: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  className="mb-1 mt-2"
                  controlId="formNomeFantasia"
                >
                  <Form.Label>Nome Fantasia</Form.Label>
                  <Form.Control
                    name="nomeFantasia"
                    type="text"
                    placeholder="Nome Fantasia"
                    value={formData?.estabelecimento?.nome_fantasia || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          nome_fantasia: e.target.value,
                        },
                      }))
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  md="4"
                  className="mb-1 mt-2"
                  controlId="formEmail"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData?.estabelecimento?.email || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          email: e.target.value,
                        },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="2"
                  className="mb-1 mt-2"
                  controlId="formDDD"
                >
                  <Form.Label>DDD</Form.Label>
                  <Form.Control
                    name="ddd"
                    type="text"
                    placeholder="085"
                    value={formData?.estabelecimento?.ddd1 || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          ddd1: e.target.value,
                        },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="3"
                  className="mb-1 mt-2"
                  controlId="formTelefone"
                >
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    name="telefone"
                    type="text"
                    placeholder="Telefone"
                    value={formData?.estabelecimento?.telefone1 || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          telefone1: e.target.value,
                        },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="3"
                  className="mb-1 mt-2"
                  controlId="formCelular"
                >
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    name="celular"
                    type="text"
                    placeholder="Celular"
                    value={formData?.estabelecimento?.celular || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          celular: e.target.value,
                        },
                      }))
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  md="2"
                  className="mb-1 mt-2"
                  controlId="formCEP"
                >
                  <Form.Label>CEP</Form.Label>
                  <Form.Control
                    name="cep"
                    type="text"
                    placeholder="CEP"
                    value={formData?.estabelecimento?.cep || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          cep: e.target.value,
                        },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="3"
                  className="mb-1 mt-2"
                  controlId="formEndereco"
                >
                  <Form.Label>Tipo de End.</Form.Label>
                  <Form.Control
                    name="tipoEndereco"
                    type="text"
                    placeholder="Rua"
                    value={formData?.estabelecimento?.tipo_logradouro || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          tipo_logradouro: e.target.value,
                        },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="5"
                  className="mb-1 mt-2"
                  controlId="formEndereco"
                >
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    name="endereco"
                    type="text"
                    placeholder="Endereço"
                    value={formData?.estabelecimento?.logradouro || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          logradouro: e.target.value,
                        },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="2"
                  className="mb-1 mt-2"
                  controlId="formNumero"
                >
                  <Form.Label>N°</Form.Label>
                  <Form.Control
                    name="numero"
                    type="text"
                    placeholder="N°"
                    value={formData?.estabelecimento?.numero || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          numero: e.target.value,
                        },
                      }))
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  md="3"
                  className="mb-1 mt-2"
                  controlId="formComplemento"
                >
                  <Form.Label>Complemento</Form.Label>
                  <Form.Control
                    name="complemento"
                    type="text"
                    placeholder="Complemento"
                    value={formData?.estabelecimento?.complemento || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          complemento: e.target.value,
                        },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="3"
                  className="mb-1 mt-2"
                  controlId="formBairro"
                >
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                    name="bairro"
                    type="text"
                    placeholder="Bairro"
                    value={formData?.estabelecimento?.bairro || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          bairro: e.target.value,
                        },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="3"
                  className="mb-1 mt-2"
                  controlId="formCidade"
                >
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    name="cidade"
                    type="text"
                    placeholder="Cidade"
                    value={formData?.estabelecimento?.cidade?.nome || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev?.estabelecimento,
                          cidade: {
                            ...prev?.estabelecimento?.cidade,
                            nome: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="3"
                  className="mb-1 mt-2"
                  controlId="formEstado"
                >
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    name="estado"
                    type="text"
                    placeholder="Estado"
                    value={formData?.estabelecimento?.estado?.nome || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estabelecimento: {
                          ...prev.estabelecimento,
                          estado: {
                            ...prev?.estabelecimento?.estado,
                            nome: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </Form.Group>
              </Row>
              <div className="buttonCadastrarCliente mt-3">
                <ButtonComponents
                  variant="success"
                  type="submit"
                  texto={isEditing ? "Salvar" : "Cadastrar"}
                />
                <ButtonComponents
                  variant="primary"
                  type="reset"
                  texto="Limpar"
                  onClick={handleClear}
                />
              </div>
            </Form>
          </Card.Body>
        </Card>

        <SearchComponents
          titulo="Buscar Cliente"
          type="text"
          textPlaceholder="Buscar Cliente"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>CNPJ</th>
              <th>Razão Social</th>
              <th>Nome Fantasia</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.cnpj}</td>
                  <td>{cliente.razaoSocial}</td>
                  <td>{cliente.nomeFantasia}</td>
                  <td className="text-end">
                    <div className="buttonCadastrarClienteAcoes">
                      <ButtonComponents
                        variant="warning"
                        type="button"
                        texto="Editar"
                        onClick={() => handleEdit(cliente)}
                      />
                      <ButtonComponents
                        variant="danger"
                        type="button"
                        texto="Excluir"
                        onClick={() => handleDelete(cliente.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default ConteudoCadastroCliente;