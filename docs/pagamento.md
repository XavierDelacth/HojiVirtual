# Fluxo de Compra/Pagamento — HojiVirtual

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Configuração Bancária do Vendedor](#2-configuração-bancária-do-vendedor)
3. [Resolução de Dados Bancários](#3-resolução-de-dados-bancários)
4. [Fluxo de Compra](#4-fluxo-de-compra)
5. [Geração de Comprovativo PDF](#5-geração-de-comprovativo-pdf)
6. [Partilha via WhatsApp](#6-partilha-via-whatsapp)
7. [Comprovativo Online (Token)](#7-comprovativo-online-token)
8. [Histórico de Compras](#8-histórico-de-compras)
9. [Métodos de Pagamento Apresentados](#9-métodos-de-pagamento-apresentados)
10. [QR Codes](#10-qr-codes)
11. [Estrutura de Dados](#11-estrutura-de-dados)

---

## 1. Visão Geral

O HojiVirtual não processa pagamentos diretamente. Em vez disso, funciona como um **facilitador** entre comprador e vendedor:

1. O **vendedor** regista os seus dados bancários (IBAN, banco, titular) no perfil.
2. O **comprador** gera um comprovativo com os dados do vendedor e realiza a transferência por conta própria.
3. O sistema gera um **comprovativo PDF** e um **link online protegido por token** para partilha.

**Moeda**: Kwanza (Kz)

---

## 2. Configuração Bancária do Vendedor

### 2.1 Onde configurar
- **Página**: Dashboard do vendedor → Configurações → Perfil
- **Componente**: `EditProfileModal.tsx` (`src/components/dashboard/EditProfileModal.tsx`)
- **Campos**: `accountHolder`, `bankName`, `iban`

### 2.2 Onde é armazenado
1. **Supabase** — tabela `profiles` (colunas `account_holder`, `bank_name`, `iban`)
2. **localStorage** — fallback com chave `hoji_bank_data` (para resiliência offline)

### 2.3 Cópia para o produto
Quando um vendedor cria um produto, os campos bancários são copiados para o registo do produto:
- `seller_account_holder`
- `seller_bank`
- `seller_iban`
- `seller_store_name`

Isto garante que, mesmo que o vendedor altere os dados depois, os comprovativos antigos mantêm a informação correta.

### 2.4 Migração relevante
`supabase/migrations/20260522120000_add_seller_bank_fields_to_products_profiles.sql`

---

## 3. Resolução de Dados Bancários

**Ficheiro**: `src/lib/resolveBankData.ts`

A função `resolveBankData(productId)` tenta obter os dados bancários do vendedor por esta ordem:

1. **Produto** — verifica se o produto já tem `seller_iban` e `seller_bank`.
2. **Vendedor (mock)** — procura nos dados mock (`mockData.ts`).
3. **Supabase (profiles)** — consulta a tabela `profiles` pelo `seller_id`.
4. **localStorage** — fallback para `hoji_bank_data`.

Retorna um objeto `ResolvedBankData` que contém:
- `storeName`, `storeDescription`, `storeAvatar`
- `accountHolder`, `bank`, `iban`
- `location`

---

## 4. Fluxo de Compra

### 4.1 Página do Produto (`ProductDetails.tsx`)

**Componente**: `src/pages/ProductDetails.tsx`

Quando o comprador clica em **"Adquira Já"**:

1. **Validação**: Verifica se o utilizador está autenticado.
2. **Input**: Pede nome e telefone do comprador (modal/dialog).
3. **Criação da compra** (`handlePurchase`):
   - Insere registo na tabela `purchases` do Supabase com `status: 'pending'`.
   - Gera um **secure_token** único (automático via `gen_random_uuid()`).
   - Define `expires_at` para 3 horas após a criação.
   - Guarda também no localStorage (`hoji_purchases`).
   - Gera um **número de referência** numérico a partir do ID.
4. **Geração do comprovativo** (`handleGenerateReceipt`):
   - Abre um modal com os detalhes da compra.
   - Oferece download PDF e partilha WhatsApp.

### 4.2 Carrinho de Compras (`Carrinho.tsx`)

**Componente**: `src/pages/Carrinho.tsx`

- Lista itens adicionados via `AddToCartButton`.
- Permite ajustar quantidades ou remover itens.
- Ao clicar em **"Finalizar Compra"**, abre um modal de checkout.
- O modal mostra os métodos de pagamento aceites (Multicaixa Express, Unitel Money).
- Gera um comprovativo único por produto (não consolida múltiplos itens num só pagamento — cada item no carrinho gera uma compra separada).

### 4.3 Fluxo Completo (do carrinho)

```
Carrinho → Checkout Modal → Inserir Nome/Telefone →
  Criar compra (Supabase + localStorage) →
    Gerar PDF → Download / Partilha WhatsApp
```

---

## 5. Geração de Comprovativo PDF

**Ficheiro**: `src/utils/pdfGenerator.ts`

### 5.1 Processo
1. O componente `Comprovativo.tsx` ou `ProductDetails.tsx` chama a função `generateReceiptPDF()`.
2. Usa **html2canvas** para capturar o HTML do comprovativo como imagem.
3. Usa **jsPDF** para criar um documento PDF A4 com a imagem capturada.
4. O PDF é descarregado automaticamente.

### 5.2 Conteúdo do PDF
- Logótipo HojiVirtual
- **Dados do comprador**: Nome, Telefone
- **Dados do produto**: Nome, Preço (Kz)
- **Dados do vendedor**: Nome da loja, Titular da conta, Banco, IBAN
- **Número de referência**
- **Data da compra**
- Mensagem: "Comprovativo gerado por HojiVirtual"

### 5.3 Página de Comprovativo (`src/pages/Comprovativo.tsx`)

- Rota: `/comprovativo/:id?token=...`
- Acessível publicamente mediante token válido.
- Obtém dados via Edge Function `get-receipt` (usa `service_role` para bypassar RLS).
- Valida que o token corresponde ao `secure_token` da compra.
- Valida que a compra não expirou (3h).
- Exibe o comprovativo e oferece ações: Download PDF, Partilhar WhatsApp, Avaliar produto.
- Se o token for inválido ou expirado, mostra mensagem de erro.

---

## 6. Partilha via WhatsApp

Após gerar o comprovativo, o comprador pode partilhar via WhatsApp:

1. O sistema constrói uma URL `https://wa.me/?text=...` com os detalhes da compra.
2. Inclui: nome do produto, valor, IBAN do vendedor, número de referência e link do comprovativo online (`/comprovativo/:id?token=...`).
3. Abre o WhatsApp (web ou app) com a mensagem pré-preenchida.

---

## 7. Comprovativo Online (Token)

### 7.1 Edge Function

**Ficheiro**: `supabase/functions/get-receipt/index.ts`

- **Endpoint**: `GET /functions/v1/get-receipt?id={id}&token={token}`
- **Função**: Recebe o ID da compra e o token de segurança.
- **Validação**:
  1. Verifica se o token corresponde ao `secure_token` da compra.
  2. Verifica se a compra não expirou (3h).
  3. Verifica se a compra existe.
- **Resposta**: Dados da compra + dados do produto + dados bancários do vendedor.

### 7.2 Fluxo
```
Browser → /comprovativo/:id?token=xxx → página React →
  fetch(`/functions/v1/get-receipt?id=${id}&token=${token}`) →
    Edge Function valida → retorna dados →
      Comprovativo.tsx renderiza o comprovativo
```

### 7.3 Segurança
- O token é um UUID v4 único gerado no momento da compra.
- O token tem validade de 3 horas.
- A Edge Function usa a `service_role` key do Supabase para ler qualquer registo, mas só retorna dados se o token for válido.
- RLS na tabela `purchases` impede qualquer acesso direto anónimo.

---

## 8. Histórico de Compras

### 8.1 Página do Comprador

**Componente**: `src/pages/DashboardCompras.tsx`

- Rota: `/dashboard/compras` (protegida para role `user`).
- Lista todas as compras do utilizador autenticado.
- Mostra: produto, loja, valor, data, status, referência.
- Permite aceder ao comprovativo de cada compra.

### 8.2 Comprovativos do Comprador

**Componente**: `src/pages/DashboardComprovativos.tsx`

- Rota: `/dashboard/comprovativos` (protegida para role `user`).
- Lista todos os comprovativos gerados pelo utilizador.
- Permite re-download do PDF e re-partilha via WhatsApp.

---

## 9. Métodos de Pagamento Apresentados

O HojiVirtual **não processa pagamentos**, mas exibe os métodos aceites (dados mock em `src/data/mockData.ts`):

| Método | Descrição |
|---|---|
| **Multicaixa Express** | Transferência instantânea angolana |
| **Unitel Money** | Carteira móvel (operadora Unitel) |
| **Transferência Bancária (IBAN)** | Transferência tradicional para o IBAN do vendedor |

A página de configurações do vendedor (`DashboardConfiguracoes.tsx`) tem um separador "Métodos de Pagamento" onde o vendedor pode indicar quais métodos aceita (dados mock).

---

## 10. QR Codes

**Componente**: `src/pages/QRCodes.tsx`

- Rota: `/dashboard/qrcodes` (protegida para role `seller`).
- Gera QR Codes para cada produto do vendedor.
- Cada QR Code aponta para a página do produto (`/produto/:id`).
- Permite download do QR Code como imagem.
- Dados atualmente mock.

---

## 11. Estrutura de Dados

### 11.1 Tabela `purchases` (Supabase)

```sql
CREATE TABLE public.purchases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    buyer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    buyer_name TEXT NOT NULL,
    buyer_phone TEXT,
    product_name TEXT NOT NULL,
    product_price NUMERIC NOT NULL,
    store_name TEXT NOT NULL,
    store_id TEXT,
    product_id TEXT NOT NULL,
    product_image TEXT,
    status TEXT DEFAULT 'pending',
    secure_token TEXT DEFAULT gen_random_uuid()::text UNIQUE,
    validated_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ DEFAULT now() + interval '3 hours',
    created_at TIMESTAMPTZ DEFAULT now()
);
```

### 11.2 localStorage

**Chave**: `hoji_purchases`
- Array de objetos de compra (mesma estrutura que a tabela `purchases`).
- Usado como fallback offline.

**Chave**: `hoji_bank_data`
- Objeto com `bankName`, `accountHolder`, `iban` do vendedor.

### 11.3 Migrações relevantes

| Ficheiro | Descrição |
|---|---|
| `20260123014013_create_purchases.sql` | Criação da tabela purchases |
| `20260125092641_add_secure_token.sql` | Adição do campo secure_token |
| `20260125211610_add_buyer_phone.sql` | Adição do campo buyer_phone |
| `20260522120000_add_seller_bank_fields_to_products_profiles.sql` | Campos bancários em produtos e perfis |

---

## Diagrama do Fluxo

```
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Vendedor    │────→│  Configura IBAN  │────→│  Cria Produtos  │
│  (seller)    │     │  (perfil + loja) │     │  (com dados      │
└──────────────┘     └──────────────────┘     │   bancários)     │
                                              └────────┬────────┘
                                                       │
                                                       ▼
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Comprador   │────→│  Adiciona ao     │────→│  Finaliza        │
│  (user)      │     │  Carrinho        │     │  Compra          │
└──────────────┘     └──────────────────┘     └────────┬────────┘
                                                       │
                                              ┌────────▼────────┐
                                              │  Cria registo   │
                                              │  em purchases   │
                                              │  status:pending │
                                              └────────┬────────┘
                                                       │
                                              ┌────────▼────────┐
                                              │  Gera PDF       │
                                              │  + Link online  │
                                              │  + WhatsApp     │
                                              └────────┬────────┘
                                                       │
                                              ┌────────▼────────┐
                                              │  Comprador faz  │
                                              │  transferência  │
                                              │  (fora do app)  │
                                              └─────────────────┘
```
