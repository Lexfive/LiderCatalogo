# ⚙️ Configuração do Supabase — Líder Molduras

> Tempo estimado: 20–30 minutos  
> Pré-requisito: conta gratuita em [supabase.com](https://supabase.com)

---

## 1. Criar o projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e clique em **New project**
2. Escolha um nome: `lider-molduras`
3. Defina uma senha segura para o banco (guarde em local seguro)
4. Região: **South America (São Paulo)** — melhor performance no Brasil
5. Clique em **Create new project** e aguarde ~1 minuto

---

## 2. Criar as tabelas (banco de dados)

1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Abra o arquivo `lib/supabase/schema.sql` do projeto
4. Copie todo o conteúdo e cole no editor
5. Clique em **Run** (atalho: Ctrl+Enter)
6. Deve aparecer "Success" — sem erros

---

## 3. Criar usuário administrador

1. No painel, vá em **Authentication → Users**
2. Clique em **Invite user** (ou **Add user**)
3. Informe o e-mail do admin: ex. `admin@SEU-DOMINIO.com.br`
4. Defina uma senha segura
5. **Guarde bem — este é o login para o painel /admin**

---

## 4. Pegar as chaves da API

1. Vá em **Project Settings → API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon (public)** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role (secret)** → `SUPABASE_SERVICE_ROLE_KEY`

---

## 5. Configurar variáveis de ambiente

### Desenvolvimento local

Crie o arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

NEXT_PUBLIC_SITE_URL=https://SEU-DOMINIO.netlify.app
NEXT_PUBLIC_WHATSAPP_NUMBER=5531999990000
NEXT_PUBLIC_EMAIL=atendimento@SEU-DOMINIO.com.br
```

### Netlify (produção)

1. Netlify → **Site settings → Environment variables**
2. Adicione as mesmas variáveis com os valores de produção
3. Em `NEXT_PUBLIC_SITE_URL`, use o domínio real: `https://SEU-DOMINIO.com.br`

---

## 6. Configurar o Storage (bucket de imagens)

O script SQL já cria o bucket `product-images`. Verifique:

1. Vá em **Storage** no painel do Supabase
2. O bucket `product-images` deve estar listado como **Public**
3. Se não estiver, clique no bucket → **Make public**

---

## 7. Testar localmente

```bash
npm install
npm run dev
```

Acesse:
- Site: http://localhost:3000  (em dev local)
- Admin: http://localhost:3000/admin/login
- Painel: http://localhost:3000/admin/produtos

---

## 8. Fluxo de uso do painel admin

```
/admin/login          → Login com e-mail e senha
/admin/produtos       → Lista de produtos (toggle visível/destaque/excluir)
/admin/produtos/novo  → Cadastrar novo produto
/admin/produtos/[id]  → Editar produto existente
```

### Cadastrar um produto:
1. Acesse `/admin/produtos/novo`
2. Preencha nome, categoria, dimensões (obrigatórios)
3. Faça upload de até 5 fotos arrastando ou clicando
4. Preencha materiais, acabamento, descrições
5. Ative "Visível no catálogo"
6. Clique em **Publicar produto**

---

## Dúvidas frequentes

**P: Posso ter mais de um usuário admin?**  
R: Sim — crie mais usuários em Authentication → Users.

**P: Como o site fica se o Supabase estiver fora do ar?**  
R: O catálogo público fica indisponível. Para evitar isso, o plano Pro do Supabase tem SLA.

**P: Posso migrar os 16 produtos mock existentes para o Supabase?**  
R: Sim. Acesse SQL Editor e use INSERT baseado no schema.sql ou cadastre pelo painel admin.

**P: Como fazer backup?**  
R: Supabase → Settings → Database → Backups (automático no plano Pro) ou exporte via SQL Editor.
