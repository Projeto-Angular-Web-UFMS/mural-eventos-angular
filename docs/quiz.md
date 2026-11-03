# Quiz — Angular no Mural de Eventos

**Quando:** bloco de Fechamento · **Duração:** 5 minutos (cerca de 1 minuto por questão)
**Formato:** 5 questões de múltipla escolha, aplicadas em uma ferramenta online (Kahoot, Mentimeter ou Google Forms)

Todas as questões partem de situações do próprio Mural de Eventos que a turma construiu na oficina. O objetivo é verificar se os **conceitos** ficaram claros — não é preciso lembrar a sintaxe exata.

| # | Tema |
| :--- | :--- |
| 1 | Injeção de dependências |
| 2 | `providedIn: 'root'` e estado compartilhado |
| 3 | Signals: `signal` e `computed` |
| 4 | Observables versus Promises |
| 5 | Validação em Reactive Forms |

O gabarito, com a justificativa de cada resposta, está no final do documento.

---

## Questões

### Questão 1 — Injeção de dependências

No Mural, o `EventList` obtém o serviço com `inject(EventService)`, em vez de criá-lo com `new EventService(...)`. Qual é a **principal vantagem** dessa escolha?

- **A)** A lista carrega mais rápido, porque `inject()` faz a requisição HTTP antes de o componente aparecer.
- **B)** O componente deixa de decidir qual implementação usar; assim, dá para trocar o serviço (por exemplo, por uma versão com dados fixos em um teste) sem alterar o componente.
- **C)** É obrigatório pelo TypeScript: sem `inject()`, o código não compila.
- **D)** O `inject()` transforma o serviço em um componente, permitindo usá-lo no template.

### Questão 2 — `providedIn: 'root'` e estado compartilhado

O cabeçalho, os cards e a página de detalhe **não têm relação de pai e filho**. Mesmo assim, ao clicar em "Tenho interesse" em um card, o contador "Meus interesses: N" do cabeçalho muda na hora. Por quê?

- **A)** O card emite um evento com `output()`, que o Angular repassa automaticamente até o cabeçalho.
- **B)** O roteador guarda os interesses na URL, e o cabeçalho lê o valor de lá.
- **C)** Como o `InterestService` usa `providedIn: 'root'`, existe **uma única instância** para toda a aplicação: todos os componentes injetam o mesmo objeto, e o estado dele está em um signal que avisa quem o lê.
- **D)** Cada componente recebe sua própria cópia do serviço, e o Angular sincroniza as cópias a cada clique.

### Questão 3 — Signals: `signal` e `computed`

No `EventList`, a busca é um `signal` e a lista exibida é um `computed` que lê os eventos, a busca e a categoria. O que acontece quando o usuário digita uma letra na busca?

- **A)** O Angular faz uma nova requisição `GET /eventos` com o texto digitado, e a API devolve a lista já filtrada.
- **B)** É preciso chamar manualmente um método para recalcular a lista; caso contrário, a tela não muda.
- **C)** O `computed` é calculado uma única vez, quando o componente é criado, e por isso a lista não muda.
- **D)** O `computed` percebe que um signal que ele lê mudou, recalcula a lista filtrada e a tela é atualizada — sem nova requisição à API.

### Questão 4 — Observables versus Promises

O `HttpClient` devolve um **Observable**, e não uma Promise. Qual afirmação descreve corretamente essa diferença no Mural?

- **A)** A requisição só é feita quando alguém se inscreve (`subscribe` ou `toSignal`); além disso, o Observable pode ser cancelado e combinado com operadores do RxJS.
- **B)** A requisição começa no momento em que `list()` é chamado, mesmo que ninguém se inscreva, igual a uma Promise.
- **C)** Observables são sempre síncronos; por isso a lista aparece sem a mensagem "Carregando eventos…".
- **D)** Não há diferença prática: o Angular converte todo Observable em Promise antes de fazer a requisição.

### Questão 5 — Validação em Reactive Forms

O campo `data` do cadastro usa dois validadores: `Validators.required` e o validador personalizado `futureDateValidator`. Por que o `futureDateValidator` **retorna `null` quando o campo está vazio**?

- **A)** Porque `null` significa "inválido" para o Angular, e um campo vazio é inválido.
- **B)** Porque cada validador tem uma única responsabilidade: o campo vazio já é tratado pelo `required`, e o validador personalizado só verifica se uma data **preenchida** é futura — assim, cada erro gera uma única mensagem.
- **C)** Porque o Angular não permite que validadores personalizados retornem erros para campos vazios.
- **D)** Porque o campo de data do navegador nunca fica vazio, então o caso não importa.

---

## Gabarito e justificativas

| Questão | Resposta |
| :--- | :--- |
| 1 | **B** |
| 2 | **C** |
| 3 | **D** |
| 4 | **A** |
| 5 | **B** |

### Questão 1 — resposta B

A injeção de dependências inverte o controle: o componente declara **do que precisa** (um `EventService`), e quem decide **qual** implementação entregar é o injetor. Isso reduz o acoplamento — no teste do `EventList` (`src/app/event-list/event-list.spec.ts`), o serviço real é trocado por um falso com `{ provide: EventService, useValue: { list } }`, sem mudar uma linha do componente. Com `new EventService(...)`, o componente ficaria preso à implementação real e ainda precisaria saber construir as dependências dela (o `HttpClient`).

- **A** está errada: `inject()` não faz requisições nem afeta o desempenho; ele apenas entrega a instância do serviço.
- **C** está errada: `new EventService()` compila normalmente; o problema é de design, não de tipos.
- **D** está errada: um serviço continua sendo uma classe comum; ele só fica acessível no template se o componente o expuser em uma propriedade.

### Questão 2 — resposta C

`providedIn: 'root'` registra o serviço no injetor raiz, que cria **uma única instância** compartilhada por toda a aplicação (singleton). Cabeçalho, cards e detalhe recebem o mesmo objeto. Como os ids ficam em um `signal` e o total é um `computed`, qualquer mudança feita por um componente é vista imediatamente pelos templates que leem esses valores. É isso que resolve o estado global sem passar dados de componente em componente.

- **A** está errada: `output()` só comunica um filho com o pai direto, e o cabeçalho não é pai do card.
- **B** está errada: os interesses não estão na URL — por isso o estado zera ao recarregar a página.
- **D** está errada: com `providedIn: 'root'` não há cópias; se houvesse uma instância por componente, o contador do cabeçalho nunca mudaria.

### Questão 3 — resposta D

Um `computed` registra automaticamente quais signals ele lê (`events()`, `search()` e `category()`). Quando a busca muda com `search.set(...)`, o Angular sabe que o `computed` ficou desatualizado, recalcula a lista e atualiza apenas o que depende dela na tela. A filtragem acontece **na memória**, sobre os eventos já carregados — por isso não há nova requisição, como exige o RF2.

- **A** está errada: a API é chamada uma única vez, no carregamento; filtrar não gera novas requisições.
- **B** está errada: não há recálculo manual — rastrear dependências é justamente o papel do `computed`.
- **C** está errada: o `computed` é recalculado sempre que um signal lido por ele muda (e de forma preguiçosa: só quando alguém lê o resultado).

### Questão 4 — resposta A

Observables são **preguiçosos** (*lazy*): chamar `list()` apenas descreve a requisição, que só é enviada quando alguém se inscreve — no `EventList`, pelo `subscribe` no construtor. Além disso, uma inscrição pode ser cancelada e o fluxo pode ser transformado com operadores do RxJS (`map`, `catchError`, `switchMap`). Uma Promise, ao contrário, começa a executar assim que é criada, entrega um único valor e não pode ser cancelada.

- **B** está errada: descreve o comportamento de uma Promise, não de um Observable.
- **C** está errada: a requisição HTTP é assíncrona — é por isso que existe o estado "Carregando eventos…".
- **D** está errada: o Angular trabalha com Observables de ponta a ponta; quem converte para signal (`toSignal`) ou se inscreve é o código da aplicação.

### Questão 5 — resposta B

Um validador retorna `null` quando o valor é **válido** e um objeto (por exemplo, `{ pastDate: true }`) quando é inválido. Os validadores de um campo são combinados, e cada um deve cuidar de uma única regra: o `required` trata o campo vazio, e o `futureDateValidator` só avalia datas preenchidas. Se o validador personalizado também acusasse erro no campo vazio, o campo teria dois erros ao mesmo tempo e a mensagem mostrada seria ambígua.

- **A** está errada: é o contrário — `null` significa **válido** no Angular.
- **C** está errada: o Angular permite; é uma decisão de design, não uma restrição do framework.
- **D** está errada: o campo de data pode ficar vazio, e é exatamente esse o caso que o `required` precisa tratar.
