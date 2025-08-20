# Configuração do Stripe Elements

## Variáveis de Ambiente Necessárias

Adicione as seguintes variáveis ao seu arquivo `.env`:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # Sua chave secreta do Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_... # Sua chave pública do Stripe
STRIPE_WEBHOOK_SECRET=whsec_... # Secret do webhook do Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Chave pública do Stripe (mesma da anterior)
```

## Instalação das Dependências

Execute o seguinte comando para instalar as dependências do Stripe:

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

## Configuração do Webhook

1. Acesse o [Dashboard do Stripe](https://dashboard.stripe.com/webhooks)
2. Crie um novo webhook com a URL: `https://seu-dominio.com/api/stripe/webhook`
3. Selecione os seguintes eventos:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copie o "Signing secret" e adicione como `STRIPE_WEBHOOK_SECRET`

## Fluxo de Pagamento

1. Usuário clica em "Finalizar compra"
2. Formulário de cartão aparece na mesma página (Stripe Elements)
3. Usuário preenche os dados do cartão
4. Stripe processa o pagamento
5. Webhook recebe o evento `payment_intent.succeeded`
6. Pedido é finalizado automaticamente
7. Carrinho é limpo e dialog de sucesso é exibido

## Teste

Para testar, use os cartões de teste do Stripe:

- Sucesso: `4242 4242 4242 4242`
- Falha: `4000 0000 0000 0002`

**Dados completos:**

- Número: 4242 4242 4242 4242
- Data: 12/25
- CVV: 123
- CEP: 01234-567
