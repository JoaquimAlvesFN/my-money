import React, { useState } from 'react';
import Rest from '../utils/rest';

const baseURL = 'https://hunt-722c4.firebaseio.com';
const { useGet, usePost, useDelete } = Rest(baseURL);

const Movimentacoes = ({ match }) => {
    const data = useGet(`/movimentacoes/${match.params.data}`);
    const [postData, salvar] = usePost(`/movimentacoes/${match.params.data}`);
    const [removeData, remover] = useDelete();

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    const onChangeDescricao = evt => {
        setDescricao(evt.target.value);
    }

    const onChangeValor = evt => {
        setValor(evt.target.value);
    }

    const salvarMovimentacao = async () => {
        if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0){
            await salvar({
                descricao,
                valor: parseFloat(valor)
            });
    
            setDescricao('');
            setValor(0);
            data.refetch();
        }
    }

    const removerMovimentacao = async(id) => {
        await remover(`/movimentacoes/${match.params.data}/${id}`);
        data.refetch();
    }

    return(
        <div className="container">
            <h1>Movimentacoes</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    { data.data &&
                        Object
                        .keys(data.data)
                        .map(movimentacao => {
                            return(
                                <tr key={movimentacao}>
                                    <td>{data.data[movimentacao].descricao}</td>
                                    <td>
                                        {data.data[movimentacao].valor}
                                        &nbsp;
                                        <button className="btn btn-danger" onClick={() => removerMovimentacao(movimentacao)}>Remover</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td>
                            <input type="text" value={descricao} onChange={onChangeDescricao} />
                        </td>
                        <td>
                            <input type="text" value={valor} onChange={onChangeValor} />
                            &nbsp;
                            <button className="btn btn-primary" onClick={salvarMovimentacao}>Salvar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Movimentacoes;