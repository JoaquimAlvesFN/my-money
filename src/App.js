import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Rest from './utils/rest';
import Header from './components/Header';
import Home from './pages/Home';
import Movimentacoes from './pages/Movimentacoes';

const baseURL = 'https://hunt-722c4.firebaseio.com';
const { useGet } = Rest(baseURL);

function App() {
  const data = useGet('/meses');

  return (
    <Router>
      <div>
        <Header/>      
        <Route path="/" exact component={Home} />
        <Route path="/movimentacoes/:data" component={Movimentacoes} />
      </div>
    </Router>
  );
}

export default App;
