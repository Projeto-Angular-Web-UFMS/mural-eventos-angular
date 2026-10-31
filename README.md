# 📌 Mural de Eventos do Curso - Angular

Aplicação de página única (SPA) desenvolvida para o 3º Seminário da disciplina. O projeto consiste em um painel interativo para listagem, busca, cadastro e controle de interesse em eventos acadêmicos (palestras, workshops, minicursos e hackathons).

O objetivo deste projeto é demonstrar a arquitetura opinativa do Angular, o uso do TypeScript, componentes *standalone*, gerenciamento de estado reativo com *Signals*, formulários reativos e injeção de dependências.

---

## 👥 Integrantes e Divisão do Seminário

A apresentação de 120 minutos e a condução das atividades estão divididas igualmente entre os membros do grupo (40 minutos para cada integrante):

| Integrante | Blocos Conduzidos | Tempo Conduzido |
| :--- | :--- | :--- |
| **Marcelly Almeida** | Abertura (10 min) e Fundamentos - Parte 1 (30 min) | 40 min |
| **Gabriel Barbosa** | Fundamentos - Parte 2 (20 min) e Live Coding (20 min) | 40 min |
| **Marcelle Luna** | Oficina Prática (25 min) e Fechamento (15 min) | 40 min |

> **Nota:** Durante a oficina prática (45 min), todos os integrantes atuam prestando suporte direto às duplas.

---

## 🛠️ Pré-requisitos e Tecnologias

Garantia de compatibilidade com o ambiente utilizado:

* **Node.js**: `v20.x` (LTS) ou superior (Ambiente de desenvolvimento executado em `v26.13.0`)
* **Angular CLI**: `v22.2.5`
* **npm**: `v10.x` ou superior
* **json-server**: `v0.17.x` (para simulação de API REST)

---

## 🚀 Guia de Instalação e Execução

Siga o passo a passo abaixo para configurar e executar o projeto em sua máquina local.

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/mural-eventos-angular.git
cd mural-eventos-angular
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Executar a API Simulada (`json-server`)
A API deve ser iniciada na porta `3000` utilizando o banco de dados simulado:
```bash
npx json-server --watch api/db.json --port 3000
```
> 📍 **Endpoint da API:** `http://localhost:3000/eventos`

### 4. Executar a Aplicação Angular
Em um segundo terminal, inicie o servidor de desenvolvimento do Angular:
```bash
ng serve
```
> 🌐 **Aplicação no Navegador:** `http://localhost:4200`

---

## 💻 Comandos Utilitários da Angular CLI

* **Servidor de Desenvolvimento:** `ng serve` (compila e atualiza o navegador automaticamente ao salvar alterações).
* **Gerar Novos Componentes/Serviços:** `ng generate component nome-do-componente` ou `ng generate service nome-do-servico`.
* **Build de Produção:** `ng build` (gera os artefatos otimizados na pasta `dist/`).
* **Testes Unitários:** `ng test` (executa testes com o runner Vitest).

---

## 🌿 Estrutura de Branches e Checkpoints

O repositório está organizado em branches para guiar a oficina prática:

* `main`: Solução final completa com todos os requisitos (RF1 a RF5).
* `live-coding`: Ponto de partida para a demonstração ao vivo (RF1 e RF2).
* `start`: **Base da oficina prática** para a turma (RF1 e RF2 prontos, componentes de RF3 a RF5 criados).
* `checkpoint-1`: Solução do Formulário Reativo de Cadastro (RF3).
* `checkpoint-2`: Solução da Página de Detalhe com Rota Dinâmica (RF4).
* `checkpoint-3`: Solução do Gerenciamento de Interesses com Signal Global (RF5).

Para alternar para a branch inicial da oficina, utilize:
```bash
git checkout start
```

---

## 📂 Estrutura de Pastas do Repositório

```text

```