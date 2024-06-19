import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cliente } from '../types';

const ClienteList: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:32831/cliente/clientes')
            .then(response => response.json())
            .then(data => setClientes(data))
            .catch(error => console.error('Houve um erro!', error));
    }, []);

    const handleDelete = (id: number) => {
        fetch('http://localhost:32831/cliente/excluir', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
            .then(response => {
                if (response.ok) {
                    setClientes(clientes.filter(cliente => cliente.id !== id));
                } else {
                    console.error('Erro ao excluir cliente');
                }
            })
            .catch(error => console.error('Houve um erro!', error));
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Clientes</h2>
            <Link to="/cadastrar" className="btn btn-primary mb-3">Cadastrar Novo Cliente</Link>
            <ul className="list-group">
                {clientes.map(cliente => (
                    <li key={cliente.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{cliente.nome}</h5>
                            <p>Email: {cliente.email}</p>
                        </div>
                        <div>
                            <Link to={`/cliente/${cliente.id}`} className="btn btn-info me-2">Ver Detalhes</Link>
                            <button className="btn btn-warning me-2" onClick={() => navigate(`/editar/${cliente.id}`)}>Editar</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(cliente.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClienteList;
