# Parte 2 · Ver detalhe do evento (RF4)

Ao final desta parte, clicar no título de um card abre a página `/eventos/:id` com todos os dados do evento, sem recarregar a página. O link "Voltar" leva de volta para a lista, e um id que não existe (por exemplo `/eventos/999`) mostra "Evento não encontrado".

**Já está pronto:**

- `src/app/services/event.service.ts` · o método `get(id)`, que busca um evento na API (`GET /eventos/:id`).
- `src/app/app.config.ts` · o `withComponentInputBinding()`, que entrega o `:id` da URL como `input` do componente.
- `oficina/parte-2/` · o HTML, o CSS e o TypeScript do componente de detalhe (com o TODO 2).

## Passo 1 · Gerar o componente com a CLI

```bash
npx ng generate component event-detail --skip-tests
```

A CLI cria a pasta `src/app/event-detail/` com `event-detail.ts`, `.html` e `.css`.

## Passo 2 · Trazer os arquivos prontos

Copie os três arquivos de `oficina/parte-2/` por cima dos que a CLI criou:

```bash
cp oficina/parte-2/event-detail.* src/app/event-detail/
```

No Windows (PowerShell): `Copy-Item oficina/parte-2/event-detail.* src/app/event-detail/ -Force`. Também dá para abrir cada arquivo, copiar e colar.

## TODO 1 · Registrar a rota

**Arquivo:** `src/app/app.routes.ts`

Acrescente o import no topo:

```ts
import { EventDetail } from './event-detail/event-detail';
```

E a rota nova na lista, **antes** da linha do `'**'`:

```ts
  { path: 'eventos/:id', component: EventDetail, title: 'Detalhe do evento | Mural de Eventos' },
```

- `:id` é um parâmetro: em `/eventos/2` ele vale `"2"`.
- A ordem importa: `eventos/novo` vem antes de `eventos/:id`; senão, "novo" seria lido como um id.

**Teste:** clique no título de um card. A página de detalhe abre e mostra "Carregando evento…".

## TODO 2 · Buscar o evento pelo serviço

**Arquivo:** `src/app/event-detail/event-detail.ts`, dentro do `ngOnInit()`. Troque a linha do `// TODO 2` por:

```ts
    this.eventService.get(this.id()).subscribe({
      next: (event) => {
        this.event.set(event);
        this.status.set('found');
      },
      error: (error: HttpErrorResponse) => {
        this.status.set(error.status === 404 ? 'not-found' : 'error');
      },
    });
```

- `this.id()` é o `:id` da URL, lido como signal.
- `next`: o evento chegou, então é guardado e a tela mostra os dados.
- `error`: se a API respondeu 404, o evento não existe ("Evento não encontrado"); qualquer outro erro mostra a mensagem de falha.

**Teste:** clique num card e veja os dados. Depois abra `http://localhost:4200/eventos/999`: aparece "Evento não encontrado".

## Travou?

Leia o erro no terminal do `npm start` e chame alguém do grupo. Para ver a solução completa:

```bash
git stash -u
git checkout checkpoint-2
```
