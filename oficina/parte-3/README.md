# Parte 3 · Marcar interesse (RF5)

Ao final desta parte, cada card e a página de detalhe têm um botão que alterna entre "Tenho interesse" e "Remover interesse". O cabeçalho mostra "Meus interesses: N", que muda na hora, e o estado continua ao navegar entre a lista e o detalhe.

O resumo de uma página, que fica projetado durante a oficina, está em [`oficina-parte-3.pdf`](oficina-parte-3.pdf).

**Já está pronto:**

- `oficina/parte-3/interest.service.ts` · o serviço com o estado global: a lista de ids em um `signal`, o `total` (`computed`) e o `hasInterest(id)`. Falta o `toggle` (TODO 1).
- `oficina/parte-3/*.html` · o HTML do cabeçalho (contador), do card e do detalhe (botões).
- `src/app/event-detail/event-detail.css` · o estilo dos botões do detalhe.
- `app.ts`, `event-card.ts` e `event-detail.ts` · marcados com o TODO 2, onde o serviço será injetado.

## Passo 1 · Gerar o serviço com a CLI e trazer o arquivo pronto

```bash
npx ng generate service services/interest --type=service --injectable --skip-tests
cp oficina/parte-3/interest.service.ts src/app/services/interest.service.ts
```

A CLI cria `src/app/services/interest.service.ts` com `@Injectable({ providedIn: 'root' })`: **uma única instância** para a aplicação inteira. O `cp` troca o arquivo pelo pronto (ou abra, copie e cole).

## TODO 1 · Alternar o interesse

**Arquivo:** `src/app/services/interest.service.ts`, no método `toggle(id)`. Troque a linha do `// TODO 1` por:

```ts
    this.interestedIds.update((ids) =>
      ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id],
    );
```

- `update` calcula o valor novo a partir do atual.
- Se o id já está na lista, `filter` cria uma lista **nova** sem ele; senão, `[...ids, id]` cria uma lista nova com ele. Nunca se altera a lista antiga: é assim que o signal percebe a mudança.

## TODO 2 · Injetar o serviço nos três componentes

Em cada arquivo, troque a linha do `// TODO 2` pela injeção e acrescente o import no topo.

**Arquivo:** `src/app/app.ts` (cabeçalho)

```ts
import { InterestService } from './services/interest.service';
```

```ts
  protected readonly interests = inject(InterestService);
```

**Arquivos:** `src/app/event-card/event-card.ts` (card) e `src/app/event-detail/event-detail.ts` (detalhe)

```ts
import { InterestService } from '../services/interest.service';
```

```ts
  protected readonly interests = inject(InterestService);
```

- Os três componentes não são pai e filho, mas recebem **o mesmo objeto** do injetor. Por isso o contador do cabeçalho muda quando se clica no card.
- Atenção ao caminho: no `app.ts` é `./services/...`; nos outros dois é `../services/...`.

## Passo final · Trazer o HTML pronto

```bash
cp oficina/parte-3/app.html src/app/app.html
cp oficina/parte-3/event-card.html src/app/event-card/event-card.html
cp oficina/parte-3/event-detail.html src/app/event-detail/event-detail.html
```

No Windows (PowerShell), use `Copy-Item` no lugar de `cp`, ou abra, copie e cole cada arquivo.

**Teste:** clique em "Tenho interesse" em dois cards. O contador do cabeçalho vai para 2. Abra o detalhe de um deles: o botão mostra "Remover interesse", e o contador continua o mesmo.

## Travou?

Leia o erro no terminal do `npm start` e chame alguém do grupo. Para ver a solução completa:

```bash
git stash -u
git checkout checkpoint-3
```
