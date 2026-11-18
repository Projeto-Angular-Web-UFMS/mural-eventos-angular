# Parte 1 · Cadastrar evento (RF3)

**Ao final:** a página `/eventos/novo` valida cada campo e salva o evento na API. Depois de salvar, ela volta para a lista, onde o evento novo aparece.

O resumo de uma página, que fica projetado durante a oficina, está em [`oficina-parte-1.pdf`](oficina-parte-1.pdf).

## O que já está pronto

- `src/app/event-form/event-form.html` · o formulário inteiro (campos, mensagens de erro e botões), ainda **sem as diretivas do Angular**.
- `src/app/event-form/event-form.ts` · o componente: já recebe o `EventService` e o `Router` por `inject`, tem o `FormGroup` com os 5 campos e o método `showError(campo)`.
- `src/app/services/event.service.ts` · o método `create(event)`, que envia o evento novo para a API (POST).
- `src/app/validators/future-date.validator.ts` · o validador personalizado `futureDateValidator`: só aceita datas depois de hoje.

## O que vocês vão fazer

Completar os **5 TODOs**, nesta ordem. Os comentários `TODO` nos arquivos mostram o lugar exato. Abra `http://localhost:4200/eventos/novo` e acompanhe a página mudando a cada TODO.

### Lembrete de sintaxe (dos slides)

| Para | Sintaxe |
| :--- | :--- |
| Passar um valor da classe para o HTML | `[propriedade]="valor"` |
| Chamar um método quando algo acontece | `(evento)="metodo()"` |
| Mostrar algo só em uma condição | `@if (condicao) { ... }` |
| Repetir algo para cada item de uma lista | `@for (item of lista; track item) { ... }` |
| Mostrar um valor no texto | `{{ valor }}` |

### TODO 1 · Ligar o formulário

**Arquivo:** `src/app/event-form/event-form.html`

- No `<form>`, use **property binding** com a diretiva `formGroup` para ligar o formulário ao `form` da classe.
- Ainda no `<form>`, use **event binding** com o evento `ngSubmit` para chamar o método `submit()`.
- Em cada campo (`input`, `textarea` e `select`), use a diretiva `formControlName` com o nome do campo: `titulo`, `descricao`, `data`, `local` e `categoria`.

**Teste:** clique em "Salvar evento". A página não recarrega mais.

### TODO 2 · Listar as categorias

**Arquivo:** `src/app/event-form/event-form.html`, dentro do `<select>`

- A classe já tem a lista `categories`. Use `@for` para criar uma `<option>` para cada item.
- Em cada `<option>`, o `value` e o texto mostrado são o próprio item. Lembre de usar property binding no `value`.
- Modelo: o filtro de categoria da lista, em `src/app/event-list/event-list.html`.

**Teste:** o seletor mostra Palestra, Workshop, Minicurso e Hackathon.

### TODO 3 · Dar as regras de cada campo

**Arquivo:** `src/app/event-form/event-form.ts`, nos colchetes de `validators`

| Campo | Regra | Use |
| :--- | :--- | :--- |
| `titulo` | obrigatório, pelo menos 5 letras | `Validators.required` e `Validators.minLength(...)` |
| `data` | obrigatória e futura | `Validators.required` e `futureDateValidator` |
| `local` | obrigatório | `Validators.required` |
| `categoria` | obrigatória | `Validators.required` |

A `descricao` é opcional e não tem regra. O teste deste TODO vem junto com o próximo.

### TODO 4 · Mostrar cada erro só na hora certa

**Arquivo:** `src/app/event-form/event-form.html`, nos 4 parágrafos `<p class="error">`

- Hoje as mensagens aparecem o tempo todo. Envolva cada uma com `@if`, usando o método `showError('nome-do-campo')`.
- `showError` só é verdadeiro quando o campo está **inválido e já foi tocado**: assim o erro não aparece antes de a pessoa digitar.
- Modelo: o `@if (submitError())` do mesmo arquivo, logo abaixo dos campos.

**Teste:** clique em "Salvar evento" com tudo vazio. Cada campo mostra o seu erro. Preencha um título com 3 letras e saia do campo: aparece o erro de tamanho. Escolha uma data passada: aparece "A data deve ser futura".

### TODO 5 · Enviar pelo serviço e voltar para a lista

**Arquivo:** `src/app/event-form/event-form.ts`, no método `submit()`

- Chame `this.eventService.create(event)`. Ele devolve um **Observable**: a requisição só acontece quando alguém faz o `subscribe`.
- No `subscribe`, trate os dois casos:
  - `next` (deu certo): volte para a lista com `this.router.navigateByUrl('/')`.
  - `error` (a API falhou): ligue o signal `submitError` e desligue o `submitting`, para o botão voltar a funcionar.
- Modelo: o `subscribe` com `next` e `error` do construtor de `src/app/event-list/event-list.ts`, feito no live coding.

**Teste:** preencha tudo com uma data futura e salve. A página volta para a lista e o evento novo aparece.

## Travou?

Leia o erro no terminal do `npm start` e chame alguém do grupo. A solução completa está na branch `checkpoint-1`:

```bash
git stash -u
git checkout checkpoint-1
```
