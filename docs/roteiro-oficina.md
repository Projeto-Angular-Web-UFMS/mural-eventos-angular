# Roteiro da Oficina Prática — Mural de Eventos em Angular

**Duração:** 45 minutos · **Formato:** em duplas · **Ponto de partida:** branch `start`

Nesta oficina vocês vão completar o Mural de Eventos implementando três requisitos: o **cadastro** (RF3), o **detalhe** (RF4) e os **interesses** (RF5). A lista, a busca e o filtro (RF1 e RF2) já estão prontos — foram feitos no live coding.

Cada checkpoint tem uma branch com a solução. **Se a dupla travar, não tem problema:** troque para a branch do checkpoint anterior e siga a partir dela.

| Checkpoint | Requisito | Tempo sugerido | Branch com a solução |
| :--- | :--- | :--- | :--- |
| 1 | RF3 — Formulário reativo | 18 min | `checkpoint-1` |
| 2 | RF4 — Página de detalhe | 12 min | `checkpoint-2` |
| 3 | RF5 — Interesses com serviço e signal | 15 min | `checkpoint-3` |

---

## Preparação (antes de começar)

Requisito: **Node.js 22.22.3+, 24.15+ ou 26.x** (confira com `node -v`). Não é preciso instalar o Angular CLI globalmente.

```bash
git clone https://github.com/Projeto-Angular-Web-UFMS/mural-eventos-angular.git
cd mural-eventos-angular
git checkout start
npm install
```

Abra **dois terminais** na pasta do projeto:

```bash
# Terminal 1 — API simulada em http://localhost:3000/eventos
npm run api
```

```bash
# Terminal 2 — aplicação em http://localhost:4200
npm start
```

Abra `http://localhost:4200`: os 4 eventos devem aparecer. Se aparecer "Não foi possível carregar os eventos", confira se o Terminal 1 está rodando.

### O que já existe na branch `start`

| Arquivo | Situação |
| :--- | :--- |
| `src/app/models/course-event.ts` | Interface `CourseEvent` e a lista `EVENT_CATEGORIES` — prontas |
| `src/app/services/event.service.ts` | `EventService` com `list()` — pronto |
| `src/app/event-list/` e `src/app/event-card/` | Lista, busca, filtro e card (RF1 e RF2) — prontos |
| `src/app/event-form/` | Componente **vazio** — Checkpoint 1 |
| `src/app/event-detail/` | Componente **vazio** — Checkpoint 2 |
| `src/app/services/interest.service.ts` | Serviço **vazio** — Checkpoint 3 |

> **Nomes em inglês.** O código do projeto está em inglês. O enunciado do seminário usa nomes em português; a correspondência é: `EventoService` → `EventService`, `criar` → `create`, `buscar` → `get`, `FormEvento` → `EventForm`, `dataFuturaValidator` → `futureDateValidator`, `InteresseService` → `InterestService`, `alternar` → `toggle`, `temInteresse` → `hasInterest`. Os **campos do evento** continuam em português (`titulo`, `descricao`, `data`, `local`, `categoria`), porque são os nomes da API.

---

## Checkpoint 1 — Formulário reativo (RF3)

**Objetivo:** implementar o `EventForm` com Reactive Forms, um validador personalizado e o envio pelo serviço.

**Conceitos praticados:** `FormGroup`, `FormControl`, `Validators`, validador personalizado, injeção do serviço e do `Router`.

A rota `/eventos/novo` e o botão "Cadastrar evento" da lista já existem — hoje a página mostra apenas "event-form works!".

### Passos

1. **Serviço.** Em `src/app/services/event.service.ts`, adicione o método `create(event)`, que faz `this.http.post<CourseEvent>(this.apiUrl, event)`. O tipo do parâmetro é `Omit<CourseEvent, 'id'>`, porque o `id` é gerado pela API.
2. **Formulário.** Em `src/app/event-form/event-form.ts`, adicione `ReactiveFormsModule` ao array `imports` e crie um `FormGroup` com os controles `titulo`, `descricao`, `data`, `local` e `categoria`. Use `Validators.required` nos obrigatórios e `Validators.minLength(5)` no título.
3. **Validador personalizado.** Crie `src/app/validators/future-date.validator.ts` com a função `futureDateValidator` e aplique-a ao controle `data`.
4. **Erros.** No template, ligue o formulário com `[formGroup]` e cada campo com `formControlName`. Abaixo de cada campo, exiba a mensagem com `@if` quando o controle estiver **inválido e tocado**, e vincule a mensagem ao campo com `aria-describedby`.
5. **Envio.** No `(ngSubmit)`, se o formulário for inválido, chame `markAllAsTouched()` e pare. Se for válido, chame `create()` do serviço e, no sucesso, navegue para `/` com o `Router` injetado.

### Dicas

Validador personalizado — repare que ele usa a data **local**: `toISOString()` devolveria a data em UTC e, à noite no Brasil, já seria o dia seguinte.

```ts
import { formatDate } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function futureDateValidator(control: AbstractControl<string | null>): ValidationErrors | null {
  if (!control.value) {
    return null; // o "required" trata o campo vazio
  }
  const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  return control.value > today ? null : { pastDate: true };
}
```

Um campo com erro acessível, usando um método `showError(campo)` do componente que retorna `true` quando o controle está inválido e tocado (`control.invalid && control.touched`):

```html
<label for="event-title">Título</label>
<input id="event-title" formControlName="titulo"
       [attr.aria-describedby]="showError('titulo') ? 'event-title-error' : null" />
@if (showError('titulo')) {
  <p id="event-title-error" class="error">O título deve ter pelo menos 5 caracteres.</p>
}
```

O CSS global já tem as classes `form`, `field`, `error` e `button` prontas para usar.

### Está pronto quando

- [ ] não é possível enviar o formulário com campos obrigatórios vazios — cada campo mostra sua própria mensagem;
- [ ] uma data de hoje ou passada mostra "A data deve ser futura";
- [ ] após um cadastro válido, o app volta para a lista e o novo evento aparece;
- [ ] o componente **não** usa `HttpClient` diretamente — apenas o `EventService`.

**Solução:** `git checkout checkpoint-1`

---

## Checkpoint 2 — Página de detalhe (RF4)

**Objetivo:** implementar a rota `eventos/:id`, buscando o evento pelo parâmetro da URL.

**Conceitos praticados:** rotas com parâmetro, `withComponentInputBinding`, tratamento de erro HTTP.

### Passos

1. **Serviço.** Adicione ao `EventService` o método `get(id)`, que faz `GET` em `` `${this.apiUrl}/${id}` ``.
2. **Rota.** Em `src/app/app.routes.ts`, registre `{ path: 'eventos/:id', component: EventDetail }`. Coloque-a **antes** da rota `'**'`, senão ela nunca será alcançada.
3. **Parâmetro da rota.** Em `src/app/app.config.ts`, troque `provideRouter(routes)` por `provideRouter(routes, withComponentInputBinding())`. Assim, o `:id` da URL chega no componente como um input: `readonly id = input.required<string>();`.
4. **Estados.** No `ngOnInit`, chame `get(this.id())` e guarde o resultado em signals. Trate três situações: **carregando**, **encontrado** e **erro**. No erro, verifique `error.status === 404` (o erro é um `HttpErrorResponse`) para mostrar "Evento não encontrado"; qualquer outro status significa que a API está fora do ar.
5. **Voltar.** Adicione um link "Voltar" com `routerLink="/"` — e um link para a lista também na mensagem de "Evento não encontrado".

### Dica

Para vários estados, o `@switch` deixa o template mais legível que vários `@if`:

```html
@switch (status()) {
  @case ('loading') { <p class="message" role="status">Carregando evento…</p> }
  @case ('not-found') { <h1>Evento não encontrado</h1> <a routerLink="/">Voltar para a lista</a> }
  @case ('found') { <!-- dados do evento e botão Voltar --> }
}
```

### Está pronto quando

- [ ] o título de um card leva ao detalhe **sem recarregar a página**;
- [ ] o detalhe mostra todos os dados, com a data em dd/mm/aaaa;
- [ ] acessar `http://localhost:4200/eventos/999` mostra "Evento não encontrado" e um link para a lista;
- [ ] o link "Voltar" retorna à lista sem recarregar a página.

**Solução:** `git checkout checkpoint-2`

---

## Checkpoint 3 — Interesses com serviço e signal (RF5)

**Objetivo:** compartilhar os eventos de interesse entre componentes que não são pai e filho, usando um serviço singleton com estado em signal.

**Conceitos praticados:** serviço como estado global, `signal`, `computed`, escopo de injeção (`providedIn: 'root'`).

### Passos

1. **Serviço.** Abra `src/app/services/interest.service.ts`. Ele já tem `@Injectable({ providedIn: 'root' })` — ou seja, existe **uma única instância** para toda a aplicação.
2. **Estado.** Guarde os ids em um signal **privado**: `private readonly interestedIds = signal<string[]>([]);`. Exponha:
   - `toggle(id)` — adiciona o id se não estiver na lista, ou remove se estiver;
   - `hasInterest(id)` — retorna `true` se o id está na lista;
   - `total` — um `computed` com a quantidade de ids.
3. **Imutabilidade.** Atualize o signal com `update`, sempre criando um **array novo** (`[...ids, id]` ou `ids.filter(...)`) — nunca use `push` ou `splice` no array atual.
4. **Injeção.** Use `inject(InterestService)` em três lugares:
   - no `App` (`src/app/app.ts`), mostrando `Meus interesses: {{ interests.total() }}` no cabeçalho;
   - no `EventCard`, com um botão que alterna entre "Tenho interesse" e "Remover interesse";
   - no `EventDetail`, com o mesmo botão.

### Dica

```ts
toggle(id: string): void {
  this.interestedIds.update((ids) =>
    ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id],
  );
}
```

Para o serviço ser usado no template, declare-o como `protected readonly interests = inject(InterestService);`.

### Está pronto quando

- [ ] o contador do cabeçalho muda **imediatamente** ao clicar no botão de um card;
- [ ] o botão alterna entre "Tenho interesse" e "Remover interesse";
- [ ] ao abrir o detalhe de um evento marcado, o botão já mostra "Remover interesse";
- [ ] o estado se mantém ao navegar entre a lista e o detalhe (ao recarregar a página, ele zera — isso é esperado).

**Solução:** `git checkout checkpoint-3`

---

## Desafio extra

1. Escreva um **teste unitário** para o `InterestService` em `src/app/services/interest.service.spec.ts`: alterne o interesse no mesmo id **duas vezes** e verifique que `total()` volta a `0`. Rode com `npm test`.
2. Explique como a injeção de dependências permitiria testar o `EventList` com um `EventService` **falso**, sem chamar a API. (Dica: veja `src/app/event-list/event-list.spec.ts` na branch `checkpoint-3` e procure por `{ provide: EventService, useValue: ... }`.)

---

## Se algo der errado

| Problema | Solução |
| :--- | :--- |
| Quero pular para o próximo checkpoint | Salve ou descarte suas alterações (`git stash` ou `git restore .`) e rode `git checkout checkpoint-N` |
| "Não foi possível carregar os eventos" | Confira se `npm run api` está rodando no outro terminal |
| A lista ficou cheia de eventos de teste | Pare a API e rode `npm run api:reset` |
| Porta 4200 ocupada | `npm start -- --port 4300` |
| Erro `Can't bind to 'formGroup'` | Faltou `ReactiveFormsModule` no array `imports` do componente |
| Erro `No provider for HttpClient` | Confira se `provideHttpClient()` está em `app.config.ts` |
| Erro `NG0950: Input "id" is required but no value is available yet` | Faltou `withComponentInputBinding()` no `provideRouter` |
