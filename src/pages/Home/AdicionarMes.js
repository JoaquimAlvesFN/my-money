import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
const minAno = 2019;
const maxAno = 2025;

const AdicionarMes = () => {
  const refAno = useRef();
  const refMes = useRef();
  const [redir, setRedir] = useState('');
  const anos = [];
  const meses = [];

  for(let i = minAno; i <= maxAno; i++){
    anos.push(i);
  }

  for(let m = 1; m <= 12; m++){
    meses.push(m);
  }

  const zeroPad = num => {
    if(num < 10){
      return '0'+num;
    }
    return num;
  }

  const verMes = () => {
    setRedir(refAno.current.value + '-' + refMes.current.value)
  }

  if(redir !== ''){
    return <Redirect to={'/movimentacoes/'+redir}/>
  }

    return(
        <>
            <h2>Adicionar Mês</h2>
            <select ref={refAno}>
              { anos.map(ano => <option key={ano} value={ano}>{ano}</option> )}
            </select>
            <select ref={refMes}>
              { meses.map(zeroPad).map(mes => <option key={mes} value={mes}>{mes}</option> )}
            </select>
        
            <button onClick={verMes} className="btn btn-primary">Adicionar mês</button>
        </>
    )    
}

export default AdicionarMes;