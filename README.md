# Task Manager - Frontend

## Descrição
Frontend do projeto Task Manager, desenvolvido como parte do desafio da Brickup. Este aplicativo é um gerenciador de tarefas que se comunica com o backend para realizar operações como listar tarefas, criar, atualizar e excluir tarefas.

## Tecnologias Utilizadas
- [React](https://reactjs.org/) - Biblioteca JavaScript para construir interfaces de usuário.
- [Ant Design](https://ant.design/) - Biblioteca de componentes de interface do usuário.
- [React Router](https://reactrouter.com/) - Roteamento para aplicativos React.
- [Redux](https://redux.js.org/) - Gerenciamento de estado global.
- [Redux Saga](https://redux-saga.js.org/) - Middleware para gerenciar efeitos colaterais no Redux.
- [Axios](https://axios-http.com/) - Cliente HTTP para fazer requisições.

## Scripts

- **dev:** Executa o aplicativo em modo de desenvolvimento.
- **build:** Compila o aplicativo para produção.
- **lint:** Executa a verificação de linting usando ESLint.
- **preview:** Prévia do aplicativo construído.

## Pré-requisitos
- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Configuração
1. Clone o repositório do frontend.
2. Execute o seguinte comando para instalar as dependências:

```bash
npm install
# ou
yarn
```
## Executando o Projeto
1. Execute o seguinte comando para iniciar o aplicativo em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

2. O aplicativo estará disponível em [http://localhost:5173](http://localhost:5173).

## Estrutura de Pastas
A estrutura de pastas padrão do projeto é organizada da seguinte maneira:

- **src:** Contém o código-fonte do aplicativo.
  - **components:** Componentes React reutilizáveis.
  - **pages:** Páginas do aplicativo.
  - **redux:** Configurações do Redux (actions, reducers, sagas).
  - **services:** Configuração de serviços, como chamadas à API.
