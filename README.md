# 📌 Mural de Eventos do Curso - Angular

Aplicação de página única (SPA) desenvolvida para o 3º Seminário da disciplina. O projeto consiste em um painel interativo para listagem, busca, cadastro e controle de interesse em eventos acadêmicos (palestras, workshops, minicursos e hackathons).

O objetivo deste projeto é demonstrar a arquitetura opinativa do Angular, o uso do TypeScript, componentes *standalone*, gerenciamento de estado reativo com *Signals*, formulários reativos e injeção de dependências.

---

## 👥 Integrantes e Divisão do Seminário

A apresentação tem 120 minutos, seguindo o cronograma do seminário: Abertura (10 min), Fundamentos (30 min), Live Coding (20 min), Oficina Prática (45 min) e Fechamento (15 min). Todos os integrantes conduzem ao menos um bloco:

| Integrante | Blocos Conduzidos | Tempo Conduzido |
| :--- | :--- | :--- |
| **Marcelly Almeida** | Abertura (10 min) e Fundamentos - Parte 1 (15 min) | 25 min |
| **Gabriel Barbosa** | Fundamentos - Parte 2 (15 min) e Live Coding (20 min) | 35 min |
| **Marcelle Luna** | Oficina Prática (45 min) e Fechamento (15 min) | 60 min |

> **Nota:** Durante a oficina prática (45 min), todos os integrantes atuam prestando suporte direto às duplas.

---

## ✅ Funcionalidades

| Requisito | Rota | O que faz |
| :--- | :--- | :--- |
| **RF1** — Listar eventos | `/` | Cards ordenados pela data mais próxima, com estados de carregamento e erro |
| **RF2** — Filtrar e buscar | `/` | Busca pelo título e filtro por categoria, combinados, sem nova requisição à API |
| **RF3** — Cadastrar evento | `/eventos/novo` | Formulário reativo com validadores, incluindo o validador personalizado de data futura |
| **RF4** — Ver detalhe | `/eventos/:id` | Dados completos do evento, com "Evento não encontrado" para ids inexistentes |
| **RF5** — Marcar interesse | cards, detalhe e cabeçalho | Estado global em um serviço com `signal`, exibido em "Meus interesses: N" |

---

## 🛠️ Pré-requisitos e Tecnologias

Garantia de compatibilidade com o ambiente utilizado:

* **Node.js**: versão **LTS** `v24.15+` ou `v26.x` (o Angular 22 exige `^22.22.3 || ^24.15.0 || >=26.0.0`; **Node 20 não funciona**). Ambiente de desenvolvimento testado com `v26.12.1`. Verifique com `node -v`.
* **Angular / Angular CLI**: `v22.2` (instalado localmente pelo `npm install`, **não é preciso instalar o CLI globalmente**)
* **npm**: `v10.x` ou superior
* **json-server**: `v1.0.0-beta.15` (API REST simulada, instalada localmente como dependência de desenvolvimento)

---

## 🚀 Guia de Instalação e Execução

Siga o passo a passo abaixo para configurar e executar o projeto em sua máquina local.

### 1. Clonar o Repositório
```bash
git clone https://github.com/Projeto-Angular-Web-UFMS/mural-eventos-angular.git
cd mural-eventos-angular
```
> Para a oficina prática, troque para a branch base com `git checkout start` antes de instalar.

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Executar a API Simulada (`json-server`)
A API deve ser iniciada na porta `3000` utilizando o banco de dados simulado:
```bash
npm run api
```
> 📍 **Endpoint da API:** `http://localhost:3000/eventos`
>
> O comando equivale a `npx json-server api/db.json --port 3000`. Os eventos cadastrados ficam gravados em `api/db.json`; para voltar aos 4 eventos originais, pare a API e rode `npm run api:reset`.

### 4. Executar a Aplicação Angular
Em um segundo terminal, inicie o servidor de desenvolvimento do Angular:
```bash
npm start
```
> 🌐 **Aplicação no Navegador:** `http://localhost:4200`

---

## 💻 Comandos Utilitários da Angular CLI

Como o CLI está instalado no projeto, use `npm start`, `npm run ...` ou `npx ng ...` (o comando `ng` sozinho só funciona com o CLI global).

* **Servidor de Desenvolvimento:** `npm start` (equivale a `ng serve`; compila e atualiza o navegador automaticamente ao salvar alterações).
* **Gerar Novos Componentes/Serviços:** `npx ng generate component nome-do-componente` ou `npx ng generate service nome-do-servico`.
* **Build de Produção:** `npm run build` (gera os artefatos otimizados na pasta `dist/`).
* **Testes Unitários:** `npm test` (executa testes com o runner Vitest).

---

## 🧯 Problemas Comuns

* **Porta 3000 ou 4200 ocupada:** encerre o processo que a usa ou rode o app em outra porta com `npm start -- --port 4300`.
* **Erro de versão do Node (`EBADENGINE` ou falha no `npm install`):** confira com `node -v`; o Angular 22 exige `22.22.3+`, `24.15+` ou `26.x`.
* **Tela com "Não foi possível carregar os eventos":** confirme que `npm run api` está rodando e que `http://localhost:3000/eventos` retorna JSON.
* **Eventos de teste acumulados na lista:** pare a API e rode `npm run api:reset` para voltar aos 4 eventos originais.

---

## 🌿 Estrutura de Branches e Checkpoints

O repositório está organizado em branches para guiar a oficina prática. Cada checkpoint contém a solução **acumulada** até aquele ponto:

| Branch | Conteúdo |
| :--- | :--- |
| `main` | Solução final completa (RF1 a RF5) |
| `live-coding` | Ponto de partida do live coding: projeto limpo, com cabeçalho, rotas vazias e CSS global |
| `start` | **Base da oficina prática**: RF1 e RF2 prontos, componentes de RF3 a RF5 criados e vazios |
| `checkpoint-1` | RF3 concluído (formulário de cadastro) |
| `checkpoint-2` | RF3 e RF4 concluídos (página de detalhe) |
| `checkpoint-3` | RF3, RF4 e RF5 concluídos (interesses com signal global) |

Para começar a oficina, ou para retomar a partir de um checkpoint se ficar travado:
```bash
git checkout start
git checkout checkpoint-1
```

> Se você tiver alterações locais, salve-as antes de trocar de branch (`git stash`) ou descarte-as (`git restore .`).

---

## 📂 Estrutura de Pastas do Repositório

```text
mural-eventos-angular/
├── api/
│   ├── db.json            # dados usados pelo json-server (alterado pelos POSTs)
│   └── db.seed.json       # cópia original dos eventos (npm run api:reset)
├── docs/                  # slides.pdf, roteiro-oficina.md e quiz.md
├── public/                # arquivos estáticos (favicon)
├── src/
│   ├── app/
│   │   ├── event-card/            # card de um evento (input.required)
│   │   ├── event-detail/          # página de detalhe (RF4)
│   │   ├── event-form/            # formulário de cadastro (RF3)
│   │   ├── event-list/            # lista, busca e filtro (RF1 e RF2)
│   │   ├── models/
│   │   │   └── course-event.ts    # interface CourseEvent e categorias
│   │   ├── services/
│   │   │   ├── event.service.ts     # acesso à API com HttpClient
│   │   │   └── interest.service.ts  # estado global dos interesses (RF5)
│   │   ├── validators/
│   │   │   └── future-date.validator.ts  # validador personalizado de data futura
│   │   ├── app.config.ts  # providers da aplicação (roteador, HttpClient)
│   │   ├── app.routes.ts  # definição das rotas
│   │   └── app.ts         # componente raiz com o cabeçalho (+ app.html / app.css)
│   ├── index.html
│   ├── main.ts            # bootstrap da aplicação standalone
│   └── styles.css         # CSS global
├── angular.json           # configuração do workspace Angular
├── package.json
└── report.md              # relatório pós-seminário (após a apresentação)
```