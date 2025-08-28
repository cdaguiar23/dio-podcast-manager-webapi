# API de Podcasts em Node.js

Este é um projeto de API RESTful construído com Node.js e TypeScript, focado em fornecer endpoints para listar e filtrar episódios de podcasts. A aplicação foi desenvolvida seguindo uma arquitetura modular e utilizando as melhores práticas de desenvolvimento para garantir um código limpo, organizado e escalável.

## ✨ Funcionalidades

- **Listagem Completa**: Endpoint para retornar todos os episódios de podcasts disponíveis.
- **Filtragem por Nome**: Endpoint para buscar podcasts específicos através de um parâmetro na URL (ex: `?p=nomedopodcast`).
- **Arquitetura Modular**: O código é organizado em camadas de `Controllers`, `Services` e `Repositories`, facilitando a manutenção e a extensibilidade.
- **Tratamento de Respostas**: A API retorna códigos de status HTTP adequados (`200 OK` para sucesso, `204 No Content` para buscas sem resultado).

## 🚀 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)**: Ambiente de execução para o JavaScript no lado do servidor.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática e melhora a robustez do código.
- **[Express (implícito via `http` nativo)]**: Embora não use o framework Express diretamente, a estrutura de roteamento e controllers é inspirada nele, utilizando o módulo `http` nativo do Node.js.

## 📂 Estrutura do Projeto

O projeto segue uma estrutura de diretórios que separa as responsabilidades da aplicação:

```
/src
|-- /controllers       # Camada responsável por receber as requisições e enviar as respostas.
|-- /models            # Contém os modelos e tipos de dados da aplicação.
|-- /repositories      # Camada de acesso aos dados (neste caso, o arquivo .json).
|-- /routes            # Define as rotas da API e as associa aos controllers.
|-- /services          # Contém a lógica de negócio da aplicação.
|-- /utils             # Módulos utilitários (constantes, helpers, etc.).
|-- app.ts             # Ponto de entrada que configura e inicializa o servidor.
|-- server.ts          # Arquivo que levanta o servidor HTTP.
```

## 🛠️ Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   O projeto utiliza `tsx` para rodar o código TypeScript diretamente.
   ```bash
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:3333`.

## 📡 Endpoints da API

A API possui os seguintes endpoints:

### 1. Listar todos os podcasts

- **URL**: `/api/podcasts`
- **Método**: `GET`
- **Descrição**: Retorna uma lista com todos os episódios de podcast.
- **Exemplo de Resposta (Sucesso `200 OK`):**
  ```json
  [
    {
      "podcastName": "Flow",
      "episode": "Igor 3K - A Realidade por Trás dos Estúdios",
      "videoId": "12345"
    },
    {
      "podcastName": "Venus",
      "episode": "Criss Paiva e Yasmin Ali - Segredos da Comédia",
      "videoId": "67890"
    }
  ]
  ```

### 2. Filtrar podcasts por nome

- **URL**: `/api/podcasts?p=<nome_do_podcast>`
- **Método**: `GET`
- **Descrição**: Retorna uma lista de episódios de podcast que correspondem ao nome fornecido no parâmetro `p`.
- **Exemplo de Uso**:
  - `http://localhost:3333/api/podcasts?p=venus`
- **Exemplo de Resposta (Sucesso `200 OK`):**
  ```json
  [
    {
      "podcastName": "Venus",
      "episode": "Criss Paiva e Yasmin Ali - Segredos da Comédia",
      "videoId": "67890"
    }
  ]
  ```
- **Resposta (Sem Conteúdo `204 No Content`):**
  Se nenhum podcast for encontrado, a API retornará uma resposta vazia com o status `204`.

---
