import './App.css';
import CadastroCliente from './pages/CadastroCliente/CadastroCliente';
import CadastroEquipamento from './pages/CadastroEquipamento/CadastroEquipamento';
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario';
import Certificado from './pages/Certificado/Certificado';

import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Usuario from './pages/Usuario/Usuario';
import Login from './pages/Login/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          <Route path="/cadastro-equipamento" element={<CadastroEquipamento />} />
          <Route path="/certificado" element={ <Certificado />} />
          <Route path="/cadastro-usuario" element={ <CadastroUsuario /> } />
          <Route path="/usuario" element={ <Usuario />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
