# Parte 1 · Cadastrar evento (RF3)

Quase tudo já está pronto: o HTML do formulário, o validador de data futura (`src/app/validators/future-date.validator.ts`) e o método `create` do `EventService`. Vocês completam os **dois `TODO`** do arquivo `src/app/event-form/event-form.ts`.

Abra `http://localhost:4200/eventos/novo`: o formulário já aparece, mas ainda aceita tudo e não salva nada.

## TODO 1 · Validadores

Substitua o bloco `protected readonly form = new FormGroup({ ... });` por:

```ts
  protected readonly form = new FormGroup({
    titulo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    descricao: new FormControl('', { nonNullable: true }),
    data: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, futureDateValidator],
    }),
    local: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    categoria: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
```

- `Validators.required`: o campo é obrigatório.
- `Validators.minLength(5)`: o título precisa de pelo menos 5 letras.
- `futureDateValidator`: o validador personalizado, que só aceita datas depois de hoje.

**Teste:** clique em "Salvar evento" com tudo vazio. Cada campo mostra o seu erro.

## TODO 2 · Enviar pelo serviço

Troque a linha do `// TODO 2` por:

```ts
    this.eventService.create(event).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => {
        this.submitError.set(true);
        this.submitting.set(false);
      },
    });
```

- `create(event)` faz o `POST /eventos`. O componente nunca usa o `HttpClient` direto, só o serviço.
- `subscribe` é o momento em que a requisição acontece.
- `next`: deu certo, então o `Router` volta para a lista.
- `error`: a API falhou, então aparece a mensagem de erro e o botão volta a funcionar.

**Teste:** preencha tudo com uma data futura e salve. A página volta para a lista e o evento novo aparece.

## Travou?

Leia o erro no terminal do `npm start` e chame alguém do grupo. Para ver a solução completa:

```bash
git stash -u
git checkout checkpoint-1
```
