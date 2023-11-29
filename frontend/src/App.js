import React, { useState } from 'react';
import './App.css';
import CodeTextarea from './components/CodeTextarea';

function App() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    console.log(code)
    try {
      const response = await fetch('http://127.0.0.1:5000/compilar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo: code,
          lenguaje: selectedLanguage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.resultado);
      } else {
        setResult('Error al compilar');
      }
    } catch (error) {
      setResult('Error en la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const handleClean = () => {
    setCode('');
    setResult('');
  };

  const handleLanguageChange = (event) => {
    console.log('Selected Language:', event.target.value);
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1>Santiste Online</h1>
        <div className='items-header'>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Compilando...' : 'Run'}
          </button>
          <button onClick={handleClean}>Clean</button>
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option>Selected Language</option>
            <option value="c_cpp">C/C++</option>
            <option value="Python">Python</option>
            <option value="javascript">Javascript</option>
          </select>
        </div>
      </header>
      <div className="code-container">
        <CodeTextarea code={code} onChange={setCode} />
        <div className="result-output">
          {result && <pre>{result}</pre>}
        </div>
      </div>
    </div>
  );
}

export default App;
