import './App.css';
import CadastroCliente from './pages/CadastroCliente/CadastroCliente';
import CadastroEquipamento from './pages/CadastroEquipamento/CadastroEquipamento';
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario';
import Certificado from './pages/Certificado/Certificado';

import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          <Route path="/cadastro-equipamento" element={<CadastroEquipamento />} />
          <Route path="/certificado" element={ <Certificado />} />
          <Route path="/cadastro-usuario" element={ <CadastroUsuario /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
