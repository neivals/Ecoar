import React, { useState } from 'react';
import FormularioEmissao from './components/FormularioEmissao';
import Resultado from './components/Resultado';
import './App.css'


function App() {
    const [meusDados, setMeusDados] = useState(null);

    const handleReceberDados = (dadosDoFormulario) => {
        setMeusDados(dadosDoFormulario);
        };

    return (
        <div className="paginacalculadora">
                <FormularioEmissao onResultado={handleReceberDados} />
                <Resultado dados={meusDados} />
            </div>
        );

    }

export default App;