import './App.css';
import Layout from './pages/Layout/Layout';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
