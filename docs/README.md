# HojiVirtual — Documentação do Projeto

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Tecnologias](#2-tecnologias)
3. [Estrutura do Projeto](#3-estrutura-do-projeto)
4. [Base de Dados (Supabase)](#4-base-de-dados-supabase)
5. [Autenticação e Autorização](#5-autenticação-e-autorização)
6. [Fluxo de Compra/Pagamento](#6-fluxo-de-comprapagamento)
7. [Rotas (Frontend)](#7-rotas-frontend)
8. [Funcionalidades por Perfil](#8-funcionalidades-por-perfil)
9. [Estilização e Tema](#9-estilização-e-tema)
10. [Utilitários e Integrações](#10-utilitários-e-integrações)

---

## 1. Visão Geral

**HojiVirtual** é um marketplace digital angolano que moderniza o comércio informal. A plataforma conecta vendedores locais (feirantes do "Hoji Ya Henda" em Luanda) com compradores, oferecendo:

- **Para vendedores**: Loja digital, gestão de produtos, geração de QR Codes, analytics, gamificação e recebimento por transferência IBAN.
- **Para compradores**: Navegação por categorias, carrinho de compras, geração de comprovativos PDF, partilha via WhatsApp e avaliação de produtos.

Moeda: **Kwanza (Kz)** · Idioma: **Português**

---

## 2. Tecnologias

| Categoria | Tecnologia |
|---|---|
| **Runtime** | Node.js |
| **Linguagem** | TypeScript (strict) |
| **UI** | React 18.3.1 |
| **Build** | Vite 5.4 + SWC |
| **Estilização** | Tailwind CSS 3.4 + shadcn/ui (Radix) |
| **Roteamento** | React Router DOM 6.30 |
| **Backend/DB** | Supabase (PostgreSQL + Auth + Storage + Edge Functions) |
| **Estado Global** | React Context (useAuth, useCart, useProducts) + TanStack React Query |
| **Formulários** | React Hook Form + Zod |
| **Gráficos** | Recharts 2.15 |
| **PDF** | jsPDF 4.0 + html2canvas 1.4 |
| **QR Codes** | qrcode.react 4.2 |
| **Ícones** | Lucide React 0.462 |
| **Notificações** | Sonner 1.7 |
| **Package Manager** | npm |
| **Deploy** | Vercel |

---

## 3. Estrutura do Projeto

```
/
├── .env / .env.local          # Variáveis de ambiente (Supabase)
├── package.json
├── tailwind.config.ts
├── vite.config.ts
├── components.json            # Configuração shadcn/ui
│
├── public/                    # Assets estáticos
│
├── supabase/
│   ├── config.toml            # Configuração do projeto Supabase
│   ├── migrations/            # 22 migrações SQL (evolução do schema)
│   └── functions/
│       └── get-receipt/       # Edge Function para obter comprovativo
│
├── scripts/                   # Scripts utilitários Node
│
└── src/
    ├── main.tsx               # Entry point
    ├── App.tsx                # Root component + rotas
    ├── index.css              # Estilos globais + Tailwind + tema
    │
    ├── components/
    │   ├── auth/              # ProtectedRoute, RoleBasedRoute
    │   ├── dashboard/         # Sidebars, modais (perfil, produto)
    │   ├── landing/           # Hero, Categorias, Produtos, Lojas, etc.
    │   ├── layout/            # Navbar, Footer
    │   ├── products/          # AddToCartButton, ProductCard
    │   ├── ratings/           # StarRating
    │   └── ui/                # 49 componentes shadcn/ui
    │
    ├── hooks/
    │   ├── useAuth.tsx        # Contexto de autenticação
    │   ├── useCart.tsx        # Contexto do carrinho
    │   ├── useProducts.tsx    # Contexto dos produtos
    │   ├── use-toast.ts       # Sistema de notificações
    │   └── use-mobile.tsx     # Deteção mobile
    │
    ├── integrations/supabase/
    │   ├── client.ts          # Cliente Supabase singleton
    │   └── types.ts           # Tipos da base de dados (422 linhas)
    │
    ├── pages/                 # 19 páginas do frontend
    │
    ├── data/
    │   ├── categories.ts      # 11 categorias
    │   └── mockData.ts        # Dados mock (lojas, produtos, reviews)
    │
    ├── lib/
    │   ├── utils.ts           # cn() — clsx + tailwind-merge
    │   └── resolveBankData.ts # Resolver dados bancários
    │
    └── utils/
        └── pdfGenerator.ts    # Geração de PDF
```

---

## 4. Base de Dados (Supabase)

### 4.1 Tabelas

#### `profiles`
| Coluna | Tipo | Notas |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK auth.users, UNIQUE |
| name, email, phone | TEXT | |
| avatar_url | TEXT? | |
| bio, location | TEXT | max 500/200 |
| store_name, store_description | TEXT | max 100/1000 |
| account_holder, bank_name, iban | TEXT? | Info bancária do vendedor |
| created_at, updated_at | TIMESTAMPTZ | |

#### `products`
| Coluna | Tipo | Notas |
|---|---|---|
| id | UUID | PK |
| seller_id | UUID | NOT NULL |
| name, description | TEXT | |
| price | NUMERIC | CHECK >= 0 |
| category | TEXT | NOT NULL |
| images | TEXT[] | |
| stock | INTEGER | DEFAULT 0, CHECK >= 0 |
| is_active | BOOLEAN | DEFAULT true |
| seller_store_name, seller_account_holder, seller_bank, seller_iban | TEXT? | Dados do vendedor copiados para o produto |
| created_at, updated_at | TIMESTAMPTZ | |

#### `cart_items`
| Coluna | Tipo | Notas |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK auth.users, ON DELETE CASCADE |
| product_id | TEXT | |
| quantity | INTEGER | DEFAULT 1, CHECK >= 1 |
| added_at | TIMESTAMPTZ | UNIQUE(user_id, product_id) |

#### `purchases`
| Coluna | Tipo | Notas |
|---|---|---|
| id | UUID | PK |
| buyer_id | UUID | FK auth.users, ON DELETE SET NULL |
| buyer_name | TEXT | NOT NULL |
| buyer_phone | TEXT? | |
| product_name | TEXT | NOT NULL |
| product_price | NUMERIC | NOT NULL |
| store_name | TEXT | NOT NULL |
| store_id, product_id | TEXT | |
| product_image | TEXT? | |
| status | TEXT | DEFAULT 'pending' |
| secure_token | TEXT | UNIQUE, gerado automaticamente |
| validated_at | TIMESTAMPTZ? | |
| expires_at | TIMESTAMPTZ | DEFAULT now() + 3h |
| created_at | TIMESTAMPTZ | |

#### `ratings`
| Coluna | Tipo | Notas |
|---|---|---|
| id | UUID | PK |
| purchase_id | UUID | FK purchases, UNIQUE |
| product_id | TEXT | |
| store_id, buyer_id | UUID | |
| rating | INTEGER | CHECK 1–5 |
| created_at | TIMESTAMPTZ | |

#### `user_roles`
| Coluna | Tipo | Notas |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK auth.users, UNIQUE(user_id, role) |
| role | app_role | ENUM: 'user' \| 'seller' |
| created_at | TIMESTAMPTZ | |

### 4.2 Vistas

- **`profiles_store_public`**: Exposição segura de dados públicos da loja (id, user_id, avatar_url, location, store_name, store_description, created_at, updated_at).

### 4.3 Segurança (RLS)

Todas as tabelas têm **Row Level Security** ativo. Políticas:
- Utilizadores autenticados só acedem aos seus próprios registos.
- Acesso anónimo explicitamente negado (exceto leitura de produtos ativos).
- Edge Function `get-receipt` usa `service_role` para bypassar RLS com validação por token.

---

## 5. Autenticação e Autorização

### 5.1 Autenticação
- **Supabase Auth** (email + password).
- Trigger `handle_new_user()` cria perfil automaticamente no registo.
- Sessão persistida em localStorage com refresh automático.

### 5.2 Autorização (RBAC)
- Dois papéis: `user` (comprador) e `seller` (vendedor), armazenados em `user_roles`.
- `ProtectedRoute`: redireciona para `/login` se não autenticado.
- `RoleBasedRoute`: verifica o papel e redireciona para o dashboard correto se sem permissão.

### 5.3 Fluxo de Registo
1. Utilizador preenche email + password + nome + telefone.
2. Escolhe papel: **Comprador** (`user`) ou **Vendedor** (`seller`).
3. `supabase.auth.signUp()` cria a conta.
4. Trigger SQL cria `profiles` e `user_roles`.

---

## 6. Fluxo de Compra/Pagamento

> Capítulo detalhado em [docs/pagamento.md](pagamento.md).

### Resumo
1. Vendedor configura IBAN no perfil (guardado em `profiles` + localStorage).
2. Comprador adiciona ao carrinho e faz checkout.
3. Sistema cria registo na tabela `purchases` com `status: 'pending'`.
4. Comprador vê os dados bancários do vendedor e realiza transferência.
5. Comprovativo PDF gerado e partilhável via WhatsApp.
6. Comprovativo online acessível via token único (válido 3h).

---

## 7. Rotas (Frontend)

| Rota | Página | Acesso |
|---|---|---|
| `/` | Index (Landing) | Público |
| `/explorar` | Explorar (produtos) | Público |
| `/carrinho` | Carrinho | Público |
| `/produto/:id` | Detalhes do produto | Público |
| `/comprovativo/:id` | Comprovativo | Público (token) |
| `/login` | Login | Público |
| `/registo` | Registo | Público |
| `/dashboard/utilizador` | Painel do comprador | `user` |
| `/dashboard/compras` | Histórico de compras | `user` |
| `/dashboard/comprovativos` | Comprovativos | `user` |
| `/dashboard/vendedor` | Painel do vendedor | `seller` |
| `/dashboard/produtos` | Gerir produtos | `seller` |
| `/dashboard/qrcodes` | QR Codes | `seller` |
| `/dashboard/gamificacao` | Gamificação | `seller` |
| `/dashboard/minha-loja` | Minha Loja | `seller` |
| `/dashboard/analytics` | Analytics | `seller` |
| `/dashboard/configuracoes` | Configurações | `seller` |

---

## 8. Funcionalidades por Perfil

### Comprador (`user`)
- Navegar e filtrar produtos
- Adicionar ao carrinho
- Comprar (gerar comprovativo)
- Partilhar comprovativo via WhatsApp
- Avaliar produtos comprados (1–5 estrelas)
- Ver histórico de compras e comprovativos

### Vendedor (`seller`)
- Gerir produtos (CRUD)
- Gerir loja (nome, descrição, foto)
- Configurar dados bancários (IBAN)
- Gerar QR Codes para os produtos
- Ver analytics e gamificação (badges, rankings)
- Gerar comprovativos para vendas presenciais

---

## 9. Estilização e Tema

- **Cores primárias**: Laranja (HSL 14 100% 60%), verde, azul.
- **Fonte**: Poppins (Google Fonts).
- **Animações**: float, pulse-soft, slide-up, fade-in, scale-in.
- **Gradientes**: `gradient-primary`, `gradient-hero`, `gradient-success`, `gradient-trust`.
- **Dark mode**: Suportado via classes Tailwind + variáveis CSS.

---

## 10. Utilitários e Integrações

| Utilitário | Descrição |
|---|---|
| `cn()` | Combinação de classes Tailwind |
| `resolveBankData()` | Resolve dados bancários: mock → Supabase → localStorage |
| `pdfGenerator.ts` | Gera PDF do comprovativo com jsPDF + html2canvas |
| `use-mobile.tsx` | Deteção de dispositivo móvel |
| `use-toast.ts` | Sistema de notificações toast |
