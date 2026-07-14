# HojiVirtual — Visão Geral do Projeto

## 1. O quê é?

**HojiVirtual** é um marketplace digital angolano que moderniza o comércio informal. Conecta vendedores locais (feirantes do **"Hoji Ya Henda"** em Luanda) com compradores, permitindo transações via transferência IBAN.

- Moeda: **Kwanza (Kz)**
- Idioma: **Português**
- Gerado via: [Lovable.dev](https://lovable.dev)
- Deploy: **Vercel**

---

## 2. Stack Tecnológica

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
├── visao-geral.md             # Este ficheiro
│
├── supabase/
│   ├── config.toml            # Configuração do projeto Supabase
│   ├── migrations/            # Migrações SQL (evolução do schema)
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
    │   ├── checkout/          # DeliveryOptions, FeeBreakdown, PaymentMethodSelector, PaymentStatusModal
    │   ├── dashboard/         # Sidebars, modais (perfil, produto)
    │   ├── landing/           # Hero, Categorias, Produtos, Lojas, etc.
    │   ├── layout/            # Navbar, Footer
    │   ├── products/          # AddToCartButton, ProductCard
    │   ├── ratings/           # StarRating
    │   └── ui/                # Componentes shadcn/ui
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
    │   └── types.ts           # Tipos da base de dados
    │
    ├── pages/                 # 19 páginas do frontend
    │
    ├── data/
    │   ├── categories.ts      # 11 categorias
    │   └── mockData.ts        # Dados mock (lojas, produtos, reviews)
    │
    ├── lib/
    │   ├── utils.ts           # cn() — clsx + tailwind-merge
    │   ├── feeEngine.ts       # Motor de cálculo de taxas
    │   ├── paymentSimulator.ts # Simulador de pagamento
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
| item_fee | NUMERIC | Taxa por item (5%) |
| processing_fee | NUMERIC | Taxa de processamento (1,5%) |
| delivery_fee | NUMERIC | Taxa de entrega por zona |
| urgent_fee | NUMERIC | Taxa de entrega urgente |
| small_order_fee | NUMERIC | Taxa de pedido mínimo |
| packaging_fee | NUMERIC | Taxa de embalagem protegida |
| gift_wrap_fee | NUMERIC | Taxa de saco para presente |
| platform_revenue | NUMERIC | Receita total da plataforma |
| seller_receives | NUMERIC | Valor líquido do vendedor |
| buyer_total | NUMERIC | Valor total pago pelo comprador |
| payment_method | TEXT | multicaixa_express, unitel_money, bank_transfer |
| transaction_id | TEXT | ID da transação |
| payment_status | TEXT | idle, pending, processing, approved, failed, cancelled |
| paid_at | TIMESTAMPTZ | |
| delivery_zone | TEXT | zona1, zona2, zona3 |
| is_urgent | BOOLEAN | |
| with_packaging | BOOLEAN | Embalagem protegida |
| with_gift_wrap | BOOLEAN | Saco para presente |
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

### 4.2 Segurança (RLS)
Todas as tabelas têm **Row Level Security** ativo.

---

## 5. Autenticação e Autorização

- **Supabase Auth** (email + password)
- Trigger `handle_new_user()` cria perfil automaticamente no registo
- Sessão persistida em localStorage com refresh automático
- **RBAC**: dois papéis — `user` (comprador) e `seller` (vendedor)
- `ProtectedRoute`: redireciona para `/login` se não autenticado
- `RoleBasedRoute`: verifica o papel e redireciona se sem permissão

---

## 6. Rotas (Frontend)

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
| `/dashboard/vendedor` | Painel do vendedor (overview) | `seller` |
| `/dashboard` | Dashboard principal | `seller` |
| `/dashboard/produtos` | Gerir produtos | `seller` |
| `/dashboard/qrcodes` | QR Codes | `seller` |
| `/dashboard/gamificacao` | Gamificação | `seller` |
| `/dashboard/minha-loja` | Minha Loja | `seller` |
| `/dashboard/analytics` | Analytics | `seller` |
| `/dashboard/configuracoes` | Configurações | `seller` |

---

## 7. Funcionalidades por Perfil

### Comprador (`user`)
- Navegar e filtrar produtos por categoria
- Adicionar ao carrinho
- Checkout com opções de entrega e pagamento
- Gerar comprovativo PDF
- Partilhar comprovativo via WhatsApp
- Avaliar produtos comprados (1–5 estrelas)
- Ver histórico de compras e comprovativos

### Vendedor (`seller`)
- Gerir produtos (CRUD com imagens)
- Gerir loja (nome, descrição, foto, dados bancários)
- Configurar IBAN para receber pagamentos
- Gerar QR Codes para produtos
- Ver analytics com gráficos (Recharts)
- Sistema de gamificação (badges, rankings)
- Gerar comprovativos para vendas presenciais

---

## 8. Motor de Taxas (`feeEngine.ts`)

### Configuração atual (FEE_CONFIG)

| Parâmetro | Valor |
|---|---|
| Taxa por item | **5%** (0.05) |
| Taxa de processamento | **1,5%** (0.015) |
| Zona 1 — Luanda Centro | **1.000 Kz** |
| Zona 2 — Viana / Kilamba | **4.000 Kz** |
| Zona 3 — Talatona / Belas | **2.000 Kz** |
| Entrega urgente | **1.000 Kz** |
| Limiar pedido mínimo | 2.000 Kz |
| Taxa pedido mínimo | 300 Kz |
| Embalagem protegida | **150 Kz/item** |
| Saco para presente | **1.500 Kz** (fixo) |
| Reagendamento | 400 Kz |
| Cancelamento | 500 Kz |
| Troca | 350 Kz |

### Componentes do checkout
- **`DeliveryOptions.tsx`**: Seleção de zona de entrega (radio) + checkboxes para urgente, embalagem e saco
- **`FeeBreakdown.tsx`**: Resumo do pagamento com todas as taxas e total
- **`PaymentMethodSelector.tsx`**: Seleção do método de pagamento (Multicaixa Express, Unitel Money, Transferência Bancária)
- **`PaymentStatusModal.tsx`**: Modal com status do pagamento

### Cálculo
```
itemFee       = subtotal × 5% × itemCount
processingFee = subtotal × 1.5%
deliveryFee   = conforme zona escolhida (ou 0)
urgentFee     = 1000 Kz (se urgente)
smallOrderFee = 300 Kz (se subtotal < 2000)
packagingFee  = 150 Kz × itemCount
giftWrapFee   = 1500 Kz (se ativado)

platformRevenue = soma de todas as taxas
sellerReceives  = subtotal - itemFee - processingFee
buyerTotal      = subtotal + platformRevenue
```

---

## 9. Fluxo de Compra/Pagamento

1. Vendedor configura IBAN no perfil
2. Comprador navega, adiciona ao carrinho
3. No checkout, escolhe zona de entrega + opções adicionais
4. Sistema calcula taxas e apresenta resumo
5. Comprador escolhe método de pagamento (simulado)
6. Sistema cria registo na tabela `purchases` com `status: 'approved'`
7. Comprovativo PDF gerado e partilhável via WhatsApp
8. Comprovativo online acessível via token único (válido 3h)

---

## 10. Estilização e Tema

- **Cores primárias**: Laranja (HSL 14 100% 60%), verde, azul
- **Fonte**: Poppins (Google Fonts)
- **Animações**: float, pulse-soft, slide-up, fade-in, scale-in
- **Gradientes**: gradient-primary, gradient-hero, gradient-success, gradient-trust
- **Dark mode**: Suportado via classes Tailwind + variáveis CSS

---

## 11. Utilitários e Integrações

| Utilitário | Descrição |
|---|---|
| `cn()` | Combinação de classes Tailwind (clsx + tailwind-merge) |
| `resolveBankData()` | Resolve dados bancários: mock → Supabase → localStorage |
| `pdfGenerator.ts` | Gera PDF do comprovativo com jsPDF + html2canvas |
| `paymentSimulator.ts` | Simula pagamento com 88% de sucesso |
| `formatKz()` | Formata valores em Kwanza (pt-AO) |
| `use-mobile.tsx` | Deteção de dispositivo móvel |
| `use-toast.ts` | Sistema de notificações toast |
