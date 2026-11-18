# Parte 3 · Marcar interesse (RF5)

**Ao final:** cada card e a página de detalhe têm um botão que alterna entre "Tenho interesse" e "Remover interesse". O cabeçalho mostra "Meus interesses: N", que muda na hora, e o estado continua ao navegar entre a lista e o detalhe.

O resumo de uma página, que fica projetado durante a oficina, está em [`oficina-parte-3.pdf`](oficina-parte-3.pdf).

## O que já está pronto

- `oficina/parte-3/interest.service.ts` · o serviço com a lista de ids num `signal` privado e o método `hasInterest(id)`.
- `src/app/app.html` · o contador "Meus interesses: 0" no cabeçalho, ainda fixo.
- `src/app/event-card/event-card.html` e `src/app/event-detail/event-detail.html` · os botões "Tenho interesse", ainda **sem as diretivas**.
- `src/app/event-detail/event-detail.css` · o estilo dos botões do detalhe.
- `app.ts`, `event-card.ts` e `event-detail.ts` · o lugar da injeção, marcado com `// TODO 2`.

## Passo 1 · Gerar o serviço com a CLI e trazer o arquivo

```bash
npx ng generate service services/interest --type=service --injectable --skip-tests
cp oficina/parte-3/interest.service.ts src/app/services/interest.service.ts
```

A CLI cria o serviço com `@Injectable({ providedIn: 'root' })`: **uma única instância** para a aplicação inteira. O `cp` troca o arquivo pelo da oficina (ou abra, copie e cole).

## O que vocês vão fazer

Completar os **4 TODOs**, nesta ordem. Os comentários `TODO` nos arquivos mostram o lugar exato.

### Lembrete de sintaxe (dos slides)

| Para | Sintaxe |
| :--- | :--- |
| Valor derivado de um signal | `computed(() => ...)` |
| Novo valor a partir do atual | `sinal.update((atual) => novo)` |
| Pedir um serviço ao Angular | `inject(NomeDoServico)` |
| Mostrar um valor no texto | `{{ valor }}` |
| Chamar um método no clique | `(click)="metodo()"` |
| Ligar uma classe CSS por condição | `[class.nome-da-classe]="condicao"` |

### TODO 1 · O estado no serviço

**Arquivo:** `src/app/services/interest.service.ts`

- Crie o `total`: um `computed` que devolve a quantidade de ids da lista `interestedIds`. Ele precisa ser público (sem `private`), porque o cabeçalho vai ler.
- Complete o `toggle(id)` com `this.interestedIds.update(...)`: se o id já está na lista, devolva uma lista **nova** sem ele (`filter`); senão, uma lista **nova** com ele (`[...lista, id]`).
- Nunca altere a lista antiga com `push` ou `splice`: o signal só percebe a mudança quando recebe uma lista nova.

### TODO 2 · Injetar o serviço nos três componentes

**Arquivos:** `src/app/app.ts` (cabeçalho), `src/app/event-card/event-card.ts` (card) e `src/app/event-detail/event-detail.ts` (detalhe)

- Em **cada um** dos três, importe o `InterestService` no topo e troque o `// TODO 2` por uma propriedade `protected readonly interests` que recebe o serviço com `inject`.
- Atenção ao caminho do import: no `app.ts` é `./services/...`; nos outros dois é `../services/...`.
- Modelo: o `inject(EventService)` que já existe no `event-detail.ts`.
- Faça os três antes de seguir: os próximos TODOs usam `interests` no HTML, e o Angular só compila se a classe tiver essa propriedade.

### TODO 3 · O contador do cabeçalho

**Arquivo:** `src/app/app.html`

- Troque o `0` fixo por uma interpolação com o `total` do serviço. O `total` é um signal: leia com parênteses.

**Teste:** o cabeçalho continua mostrando 0, agora vindo do serviço.

### TODO 4 · Os botões do card e do detalhe

**Arquivos:** `src/app/event-card/event-card.html` e `src/app/event-detail/event-detail.html`

- **Clique:** use event binding no `click` para chamar `interests.toggle(...)` com o id do evento. No card o id é `event().id`; no detalhe é `event.id`.
- **Texto:** troque o texto fixo por uma interpolação que mostra "Remover interesse" quando `interests.hasInterest(...)` for verdadeiro, e "Tenho interesse" quando não for. Modelo: o texto do botão "Salvar evento" em `src/app/event-form/event-form.html`.
- **Cor:** ligue a classe `button-secondary` quando já houver interesse.

**Teste:** clique em "Tenho interesse" em dois cards. O contador vai para 2 e os botões mudam. Abra o detalhe de um deles: o botão mostra "Remover interesse" e o contador continua igual.

## Travou?

Leia o erro no terminal do `npm start` e chame alguém do grupo. A solução completa está na branch `checkpoint-3`:

```bash
git stash -u
git checkout checkpoint-3
```
