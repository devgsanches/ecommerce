# 🛍️ Bewear - E-commerce Platform

Uma plataforma de e-commerce moderna construída com Next.js 15, Tailwind CSS v4 e TypeScript.

## ✨ Características

- **Design Moderno**: Interface limpa e responsiva
- **Autenticação**: Login com email/senha e Google OAuth
- **Carrinho de Compras**: Sistema completo de carrinho com persistência
- **Pagamentos**: Integração com Stripe para processamento de pagamentos
- **Banco de Dados**: PostgreSQL com Drizzle ORM
- **Categorias**: Sistema de categorização de produtos
- **Variantes de Produtos**: Suporte a diferentes tamanhos, cores, etc.

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Autenticação**: Better Auth
- **Banco de Dados**: PostgreSQL + Drizzle ORM
- **Pagamentos**: Stripe
- **Deploy**: Vercel

## 📦 Instalação

1. **Clone o repositório**

   ```bash
   git clone <seu-repositorio>
   cd bewear
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env-example .env
   ```

   Preencha as seguintes variáveis:

   ```env
   DATABASE_URL=sua_url_do_postgresql
   BETTER_AUTH_SECRET=sua_chave_secreta
   GOOGLE_CLIENT_ID=seu_google_client_id
   GOOGLE_CLIENT_SECRET=seu_google_client_secret
   STRIPE_PUBLISHABLE_KEY=sua_stripe_public_key
   STRIPE_SECRET_KEY=sua_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=seu_stripe_webhook_secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=sua_stripe_public_key
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

## 🗄️ Banco de Dados

O projeto usa PostgreSQL com Drizzle ORM. Para configurar:

1. **Crie um banco PostgreSQL** (local ou na nuvem)
2. **Configure a DATABASE_URL** no arquivo `.env`
3. **Execute as migrações** (se necessário)

## 🔐 Autenticação

- **Email/Senha**: Login tradicional
- **Google OAuth**: Login social com Google
- **Sessões**: Gerenciadas pelo Better Auth

## 💳 Pagamentos

Integração completa com Stripe:

- **Checkout**: Processamento de pagamentos
- **Webhooks**: Atualização automática de status
- **Múltiplas moedas**: Suporte a BRL

## 📱 Funcionalidades

### Para Usuários

- ✅ Navegação por categorias
- ✅ Visualização de produtos
- ✅ Carrinho de compras
- ✅ Checkout seguro
- ✅ Histórico de pedidos
- ✅ Gerenciamento de endereços

### Para Administradores

- ✅ Dashboard de produtos
- ✅ Gestão de categorias
- ✅ Controle de estoque
- ✅ Relatórios de vendas


1. **Conecte seu repositório** na Vercel
2. **Configure as variáveis de ambiente**:
   - `DATABASE_URL`
   - `BETTER_AUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

3. **Deploy automático** a cada push

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticação
│   ├── category/          # Páginas de categoria
│   ├── product/           # Páginas de produto
│   └── ...
├── components/            # Componentes React
├── db/                    # Configuração do banco
├── lib/                   # Utilitários e configurações
└── types/                 # Definições TypeScript
```
