# Parte 2 · Ver detalhe do evento (RF4)

**Ao final:** clicar no título de um card abre a página `/eventos/:id` com todos os dados do evento, sem recarregar a página. O link "Voltar" leva de volta para a lista, e um id que não existe (por exemplo `/eventos/999`) mostra "Evento não encontrado".

O resumo de uma página, que fica projetado durante a oficina, está em [`oficina-parte-2.pdf`](oficina-parte-2.pdf).

## O que já está pronto

- `src/app/services/event.service.ts` · o método `get(id)`, que busca um evento na API (`GET /eventos/:id`).
- `src/app/app.config.ts` · o `withComponentInputBinding()`, que entrega o `:id` da URL como `input` do componente.
- `oficina/parte-2/event-detail.ts` · o componente: o `input` `id`, os signals `event` e `status` e o `inject` do serviço.
- `oficina/parte-2/event-detail.html` · a página com os 4 estados (carregando, não encontrado, erro e o evento), ainda **sem as diretivas** que escolhem o estado e sem os links do Angular.
- `oficina/parte-2/event-detail.css` · o estilo da página.

## Passo 1 · Gerar o componente com a CLI e trazer os arquivos

```bash
npx ng generate component event-detail --skip-tests
cp oficina/parte-2/event-detail.* src/app/event-detail/
```

A CLI cria a pasta `src/app/event-detail/`. O `cp` troca os 3 arquivos pelos da oficina. No Windows (PowerShell), use `Copy-Item ... -Force`, ou abra, copie e cole cada arquivo.

## O que vocês vão fazer

Completar os **4 TODOs**, nesta ordem. Os comentários `TODO` nos arquivos mostram o lugar exato.

### Lembrete de sintaxe (dos slides)

| Para | Sintaxe |
| :--- | :--- |
| Mostrar um bloco ou outro | `@if (cond) { } @else if (outra) { } @else { }` |
| Ler um signal | `nome()` |
| Escrever num signal | `nome.set(valor)` |
| Link que troca de página sem recarregar | `routerLink="/caminho"` |

### TODO 1 · Registrar a rota

**Arquivo:** `src/app/app.routes.ts`

- Importe o `EventDetail` no topo, como já está feito com o `EventForm`.
- Acrescente uma rota com o caminho `eventos/:id` apontando para o `EventDetail`. Modelo: a linha da rota `eventos/novo`.
- **A ordem importa:** a rota nova vem antes da linha do `'**'`, e depois de `eventos/novo`. Senão, "novo" seria lido como um id.

**Teste:** clique no título de um card. A página abre e mostra os 4 blocos de uma vez (ainda sem dados).

### TODO 2 · Buscar o evento pelo serviço

**Arquivo:** `src/app/event-detail/event-detail.ts`, no `ngOnInit()`

- Chame `this.eventService.get(...)` com o id da URL. O `id` é um signal: leia com parênteses.
- Faça o `subscribe` tratando os dois casos:
  - `next`: guarde o evento recebido no signal `event` e mude o `status` para `'found'`.
  - `error`: o parâmetro é um `HttpErrorResponse`. Se o `status` dele for `404`, o evento não existe (`'not-found'`); qualquer outro erro é `'error'`.
- Modelo: o `subscribe` com `next` e `error` do construtor de `src/app/event-list/event-list.ts`.

**Teste:** abra um card. O bloco do evento passa a mostrar título, data e local.

### TODO 3 · Mostrar só o estado atual

**Arquivo:** `src/app/event-detail/event-detail.html`

- Hoje os 4 blocos aparecem juntos. Use `@if`, `@else if` e `@else` para mostrar um só, comparando `status()` com `'loading'`, `'not-found'` e `'error'`. O último bloco (o evento) fica no `@else`.
- Modelo: os estados de carregando, erro e lista em `src/app/event-list/event-list.html`, feitos no live coding.

**Teste:** abra um card e veja só os dados. Depois abra `http://localhost:4200/eventos/999`: aparece só "Evento não encontrado".

### TODO 4 · Voltar sem recarregar a página

**Arquivos:** `src/app/event-detail/event-detail.ts` e `src/app/event-detail/event-detail.html`

- No `.ts`, acrescente o `RouterLink` (de `@angular/router`) na lista `imports` do componente: é assim que um componente standalone declara o que usa no template.
- No `.html`, troque o `href="/"` dos 3 links "Voltar" pela diretiva `routerLink`.

**Teste:** clique em "Voltar". A lista aparece na hora, sem a página piscar.

## Travou?

Leia o erro no terminal do `npm start` e chame alguém do grupo. A solução completa está na branch `checkpoint-2`. Lá os estados usam `@switch`, que é outra forma de escrever a mesma escolha.

```bash
git stash -u
git checkout checkpoint-2
```
