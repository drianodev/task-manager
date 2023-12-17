import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Substitua a URL pela rota correta do seu backend
    fetch('http://localhost:8080/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Erro ao buscar tarefas:', error));
  }, []); // O segundo argumento [] garante que o efeito ocorra apenas uma vez durante a montagem

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
