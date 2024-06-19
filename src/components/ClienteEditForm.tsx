import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cliente, Endereco } from '../types';

const initialEndereco: Endereco = {
    id: 0,
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    codigoPostal: '',
    informacoesAdicionais: '',
};

const initialCliente: Partial<Cliente> = {
    nome: '',
    nomeSocial: '',
    email: '',
    endereco: initialEndereco,
    telefones: [],
};

const ClienteEditForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [cliente, setCliente] = useState<Partial<Cliente>>(initialCliente);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:32831/cliente/${id}`)
            .then(response => response.json())
            .then(data => setCliente(data))
            .catch(error => console.error('Houve um erro!', error));
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleEnderecoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCliente({
            ...cliente,
            endereco: { ...cliente.endereco, [name]: value } as Endereco,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:32831/cliente/atualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        })
        .then(response => {
            if (response.ok) {
                navigate('/');
            } else {
                console.error('Houve um erro ao atualizar o cliente!');
            }
        })
        .catch(error => console.error('Houve um erro!', error));
    };

    return (
        <div className="container mt-5">
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" name="nome" value={cliente.nome} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nome Social</label>
                    <input type="text" className="form-control" name="nomeSocial" value={cliente.nomeSocial} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={cliente.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Endereço</label>
                    <input type="text" className="form-control mb-2" placeholder="Estado" name="estado" value={cliente.endereco?.estado} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control mb-2" placeholder="Cidade" name="cidade" value={cliente.endereco?.cidade} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control mb-2" placeholder="Bairro" name="bairro" value={cliente.endereco?.bairro} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control mb-2" placeholder="Rua" name="rua" value={cliente.endereco?.rua} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control mb-2" placeholder="Número" name="numero" value={cliente.endereco?.numero} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control mb-2" placeholder="Código Postal" name="codigoPostal" value={cliente.endereco?.codigoPostal} onChange={handleEnderecoChange} />
                    <input type="text" className="form-control" placeholder="Informações Adicionais" name="informacoesAdicionais" value={cliente.endereco?.informacoesAdicionais} onChange={handleEnderecoChange} />
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
};

export default ClienteEditForm;
