import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClienteList from './components/ClienteList';
import ClienteForm from './components/ClienteForm';
import ClienteDetail from './components/ClienteDetail';
import ClienteEditForm from './components/ClienteEditForm';
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {
    return (
        <Router>
            <div>
                <h1>Gestão de Clientes</h1>
                <Routes>
                    <Route path="/" element={<ClienteList />} />
                    <Route path="/cadastrar" element={<ClienteForm />} />
                    <Route path="/cliente/:id" element={<ClienteDetail />} />
                    <Route path="/editar/:id" element={<ClienteEditForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
