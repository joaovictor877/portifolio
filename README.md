# 🎨 Portfólio de João Victor

Portfólio profissional dinâmico desenvolvido com HTML5, CSS3, JavaScript, **Firebase** (autenticação) e **Vercel Blob** (armazenamento), apresentando projetos em tempo real com painel administrativo robusto.

**Live Demo:** [joaovictor.app.br](https://joaovictor.app.br)

---

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Configuração e Instalação](#-configuração-e-instalação)
- [Uso](#-uso)
- [Autenticação](#-autenticação)
- [Painel Admin](#-painel-admin)
- [Segurança](#-segurança)
- [Deployment](#-deployment)
- [Contato](#-contato)

---

## ✨ Características

✅ **Homepage Responsiva** - Seções de hero, sobre, skills, educação e contato  
✅ **Projetos Dinâmicos** - Carregamento via APIs serverless com cache otimizado  
✅ **Carrossel de Imagens** - Navegação fluida com Swiper.js e suporte a múltiplas imagens  
✅ **Filtros por Categoria** - Exibição de projetos por tipo (Web, Backend, Mobile, Arduino)  
✅ **Autenticação Firebase** - Email/Password com reset de senha  
✅ **Painel Administrativo** - CRUD completo com upload múltiplo de imagens  
✅ **Armazenamento Vercel Blob** - Projetos JSON e imagens em object storage serverless  
✅ **APIs Serverless** - `/api/projects` e `/api/upload` para gerenciamento  
✅ **Design Dark Theme** - Interface moderna com gradientes ciano-azul  
✅ **URLs Limpas** - Rewrite via Vercel  
✅ **Cache Otimizado** - Headers no-store e timestamp para consistência de dados  

---

## 🛠 Tecnologias

### Frontend
- **HTML5** - Markup semântico
- **CSS3** - Grid, Flexbox, Gradientes, Animações
- **JavaScript (Vanilla)** - DOM manipulation, Event handling
- **[Swiper.js 11](https://swiperjs.com/)** - Carrosséis e sliders

### Backend & Serviços
- **Firebase 9.22.0**
  - 🔐 **Authentication** - Email/Password com "Esqueci a Senha"
  - 📧 **Password Reset** - Recuperação de conta via email
  
- **Vercel Blob**
  - 📦 **Object Storage** - Projetos JSON e imagens em blob storage serverless
  - ⚡ **APIs Serverless** - `/api/projects` (CRUD) e `/api/upload` (imagens)
  - 🔄 **Cache Control** - Headers otimizados para consistência
  
### Deployment
- **GitHub** - Versionamento de código
- **Vercel** - Hosting automático via GitHub integration
- **Domain Custom** - joaovictor.app.br

---

## 📂 Estrutura do Projeto

```
portifolio/
├── index.html              # 🏠 Página inicial (hero, about, skills, educação)
├── projetos.html           # 📋 Galeria dinâmica de projetos (fetch /api/projects)
├── admin.html              # ⚙️ Painel CRUD com autenticação Firebase
├── login.html              # 🔓 Login unificado (Email/Password + Reset)
├── firebase-config.js      # 🔑 Configuração Firebase
├── style.css               # 🎨 Estilos globais
├── script.js               # ⚡ Scripts globais
├── package.json            # 📦 Dependências (minimal)
├── vercel.json             # ▲ Configuração Vercel (rewrite, headers, redirects)
├── api/                    # 🖥️ APIs Serverless
│   ├── projects.js         # GET/POST projetos JSON em Vercel Blob
│   └── upload.js           # POST imagens base64 em Vercel Blob
├── README.md               # 📖 Este arquivo
└── images/                 # 🖼️ Imagens estáticas do site
```

---

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js (para ambiente de desenvolvimento local)
- Conta Firebase (para backend)
- GitHub (para versionamento)
- Vercel (para deploy - opcional, pode usar outro host)

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/joaovictor877/portifolio.git
cd portifolio
```

### 2️⃣ Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou use "portfoliodejoao"
3. Configure:

#### Authentication
```
✅ Email/Password - Habilitado
✅ Password Reset - Habilitado (envia email de recuperação)
```

**Domínios Autorizados:**
- `localhost:3000` (desenvolvimento)
- `joaovictor.app.br` (produção)
- Seu domínio custom

### 3️⃣ Configurar Vercel Blob

1. Conecte seu repositório GitHub ao [Vercel](https://vercel.com)
2. No Vercel Dashboard, vá em **Settings → Blob**
3. Crie um novo blob store (ex: `portfolio-storage`)
4. Configure a variável de ambiente no projeto Vercel:

```bash
BLOB_READ_WRITE_TOKEN=seu_token_aqui
```

**Dados armazenados em Vercel Blob:**
- `data/projects.json` - Array de projetos com estrutura:
```javascript
[
  {
    id: "uuid-ou-timestamp",
    title: "Nome do Projeto",
    description: "Descrição detalhada",
    category: "Web",
    tech: ["React", "Firebase", "Vercel"],
    imageUrl: "https://blob.vercelusercontent.com/...",
    imageUrls: ["url1", "url2", "url3"], // Suporte a múltiplas imagens
    createdAt: "2025-12-18T10:30:00Z"
  }
]
```
- `data/images/{timestamp}-{nome}` - Imagens em base64 convertidas
```

### 4️⃣ Configurar as APIs Serverless

As APIs estão em `/api/` e lidam com leitura/escrita no Vercel Blob:

**`/api/projects.js`** - Gerencia dados dos projetos:
- `GET` - Retorna `projects.json` do Blob com cache otimizado
- `POST` - Ações: `create` (novo projeto), `update` (editar), `delete` (remover)

**`/api/upload.js`** - Gerencia upload de imagens:
- `POST` - Recebe base64 da imagem e salva no Blob com nome único

### 5️⃣ Testar Localmente

```bash
# Opção 1: Usar Live Server no VS Code
# Click direito em index.html → "Open with Live Server"

# Opção 2: Python SimpleHTTPServer
python -m http.server 8000

# Opção 3: Node.js http-server
npx http-server -p 3000
```

Acesse: `http://localhost:3000` ou `http://localhost:8000`

**Nota:** As APIs `/api/projects` e `/api/upload` só funcionarão quando deployadas no Vercel (local terá CORS errors).

---

## 📖 Uso

### 👨‍💼 Para Visitantes

1. **Homepage** - Veja informações sobre João Victor
2. **Projetos** - Navegue pelos projetos com carrosséis de imagens (carregadas de Vercel Blob)
3. **Filtros** - Filtre por categoria (Todos, Web, Backend, Mobile, Arduino, Projeto)
4. **Contato** - Links diretos para Gmail, LinkedIn, GitHub

### 🔐 Para Administradores

1. **Acesse** `joaovictor.app.br/login` (Login unificado)
2. **Faça login** com email/senha (Firebase Auth)
3. **Acesse o painel** em `joaovictor.app.br/admin` (ou `/admin.html` local)

---

## 🔐 Autenticação

### 📧 Email/Password

```javascript
// Login
auth.signInWithEmailAndPassword(email, password)
  .then(userCredential => {
    window.location.href = 'admin.html'; // Redireciona para admin
  })
  .catch(error => console.error(error.message));
```

### 🔑 Reset de Senha

```javascript
// Enviar email de recuperação
auth.sendPasswordResetEmail(email)
  .then(() => {
    alert('Email de recuperação enviado!');
  })
  .catch(error => console.error(error.message));
```

### Logout

```javascript
auth.signOut().then(() => {
  window.location.href = 'index.html';
});
```

**Nota:** Autenticação com Firebase é obrigatória para acessar o painel admin. Session persistence é definida como `SESSION` (não persiste entre abas).

---

## ⚙️ Painel Admin

### Funcionalidades

**Adicionar Projeto:**
- ✏️ Título, Descrição, Categoria
- 🏷️ Tags de tecnologia (chips verdes dinâmicas)
- 🖼️ Upload de múltiplas imagens para Vercel Blob
- 💾 Salvar para `/api/projects` (JSON + imagens)

**Editar Projeto:**
- ✏️ Atualizar todos os campos
- 🖼️ Alterar ou adicionar imagens
- 💾 Sincronização imediata via API

**Deletar Projeto:**
- 🗑️ Remover do `projects.json`
- 🗑️ Remover imagens do Blob

**Listar Projetos:**
- 📋 Exibição em tempo real (ordenada por data de criação)
- 🖼️ Preview com primeira imagem do projeto
- 📱 Interface responsiva

---

## 🔒 Segurança

### 🛡️ Firebase Authentication
- ✅ Email/Password habilitado
- 🔐 Password reset via email seguro
- 📧 Emails de recuperação com links verificados
- 🔒 Admin requer autenticação (guarda de rota no `admin.html`)

### 🛡️ Vercel Blob Access
- ✅ Leitura pública para `data/projects.json` (imagens do site público)
- 🔐 Escrita (POST) com `BLOB_READ_WRITE_TOKEN` de ambiente
- 🔑 Token armazenado de forma segura no Vercel (não versionado em git)

### 🛡️ APIs Serverless
- ✅ `/api/projects` com headers `no-store` para evitar cache agressivo
- ✅ `/api/upload` valida e sanitiza base64 antes de salvar
- 🔐 Ambas as APIs requerem autenticação (verificado no lado do cliente)

### 🛡️ Headers de Segurança (vercel.json)
```json
{
  "headers": [
    {
      "source": "/api/projects",
      "headers": [
        { "key": "Cache-Control", "value": "no-store, must-revalidate" },
        { "key": "CDN-Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
```

---

## 🚀 Deployment

### Opção 1: Vercel (Recomendado e Obrigatório para APIs)

Seu portfólio usa APIs serverless que **só funcionam no Vercel**. Deployment no Vercel é obrigatório.

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

Ou conecte diretamente no [Vercel Dashboard](https://vercel.com):
1. Importar repositório GitHub
2. Configurar variáveis de ambiente:
   - `BLOB_READ_WRITE_TOKEN` - Token de acesso ao Vercel Blob
3. Configurar Firebase config (já em inline nos HTMLs)
4. Deploy automático em cada push para `main`

### Variáveis de Ambiente no Vercel

```
BLOB_READ_WRITE_TOKEN=seu_token_do_vercel_blob
```

Não coloque o token no arquivo `.env` do repositório (nunca fazer commit de secrets).

1. **Registre seu domínio** (joaovictor.app.br)
2. **No Vercel Dashboard:**
   - Vá em Project Settings → Domains
   - Adicione seu domínio custom
3. **Configure DNS no seu registrador:**
   ```
   Apontamentos Nameservers:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com
   - ns3.vercel-dns.com
   - ns4.vercel-dns.com
   ```
4. **Aguarde propagação** (até 24h)

### Opção 2: Configurar Domínio Custom no Vercel

---

## 📊 Performance & SEO

- ⚡ **Lazy Loading** - Imagens carregam sob demanda
- 📱 **Responsive Design** - Funciona em qualquer dispositivo
- 🎯 **Meta Tags** - Inclusos para compartilhamento social
- ♿ **Accessibility** - Semântica HTML5 e ARIA labels
- 🔍 **SEO Friendly** - URLs limpas, títulos, descrições

---

## 🐛 Troubleshooting

### ❌ "Unauthorized domain" ao fazer login
**Solução:** Adicione seu domínio em Firebase Console → Authentication → Authorized domains

### ❌ Projetos não carregam na página pública
**Solução:** Verifique se:
- `/api/projects` está deployada no Vercel
- `BLOB_READ_WRITE_TOKEN` está configurado
- Arquivo `data/projects.json` existe no Vercel Blob

### ❌ Imagens não carregam
**Solução:** Verifique se:
- URLs das imagens em `projects.json` estão corretas
- Imagens foram enviadas para Vercel Blob via `/api/upload`
- CORS headers estão corretos (devem estar por padrão no Blob)

### ❌ Admin não permite login
**Solução:** Verifique se:
- Firebase config está correta em `login.html`
- Usuário existe em Firebase Authentication
- Domínio está autorizado em Firebase

### ❌ 404 ao acessar `/admin` ou `/projetos`
**Solução:** Vercel rewrite está configurado em `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/admin", "destination": "/admin.html" },
    { "source": "/projetos", "destination": "/projetos.html" }
  ]
}
```

---

## 📝 Variáveis de Ambiente

### Vercel Blob

```
BLOB_READ_WRITE_TOKEN=seu_token_do_vercel_blob
```

**Como gerar o token:**
1. Vercel Dashboard → Blob → Seu projeto
2. Copie "Read Write Token"
3. Adicione em Project Settings → Environment Variables

### Firebase Config

Firebase config está **inline nos HTMLs** (é seguro, não contém secrets):
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "portfoliodejoao.firebaseapp.com",
  projectId: "portfoliodejoao",
  storageBucket: "portfoliodejoao.firebasestorage.app",
  messagingSenderId: "904540901550",
  appId: "1:904540901550:web:56d0957f4bf5907174dd3f"
};
```

⚠️ **Nunca faça commit de `BLOB_READ_WRITE_TOKEN`** em .env ou variáveis sensíveis no git.

---

## 📚 Recursos Úteis

- 📖 [Firebase Docs](https://firebase.google.com/docs)
- 🎨 [Swiper.js Documentation](https://swiperjs.com/)
- 🚀 [Vercel Docs](https://vercel.com/docs)
- 📦 [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- 🔐 [Web Security Best Practices](https://owasp.org)

---

## 👨‍💻 Autor

**João Victor Silva Souza**
- 🌐 Site: [joaovictor.app.br](https://joaovictor.app.br)
- 💼 LinkedIn: [linkedin.com/in/joaovictor](https://linkedin.com/in/joaovictor)
- 🐙 GitHub: [@joaovictor877](https://github.com/joaovictor877)
- 📧 Email: [seu-email@gmail.com]

---

## 📄 Licença

Este projeto está sob licença **MIT**. Sinta-se livre para usar, modificar e distribuir.

---

## 🤝 Contribuições

Quer melhorar este portfólio? Faça um fork e envie um pull request!

```bash
git clone https://github.com/joaovictor877/portifolio.git
git checkout -b feature/melhoria
git commit -m "Adiciona melhoria"
git push origin feature/melhoria
```

---

**Última atualização:** Dezembro 2025  
**Status:** ✅ Completo e em produção  
**Stack:** HTML5, CSS3, JavaScript, Firebase Auth, Vercel Blob, Swiper.js

**- Add:** Efeito RGB Animado

![Alt text](images/efeito%20rgb.png)

![Alt text](images/efeito%20rgb2.png)

O código CSS abaixo cria um efeito RGB animado, ideal para indicar processos de carregamento de forma estilizada e moderna. A classe "loading" contém barras verticais que apresentam uma transição dinâmica entre as cores preta e verde. A animação é aprimorada com o uso de sombras, rotações e um cálculo de atraso para criar um efeito pulsante cativante.

```css
.loading {
    position: relative;
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    height: 4vh;
}

.loading span {
    position: relative;
    width: 5px;
    height: 20px;
    background: #000;
}

.loading span::before {
    content: '';
    position: absolute;
    inset: 0;
    animation: animate 8s linear infinite;
    animation-delay: calc(var(--i) * 0.1s);
}

@keyframes animate {
    0% {
        background: #0f0;
        box-shadow: 0 0 5px #0f0, 0 0 15px #0f0, 0 0 30px #0f0, 0 0 50px #0f0;
        transform: rotate(0deg);
    }
    // ... (outros estágios da animação)
    90.1%, 100% {
        background: #000;
        box-shadow: none;
    }
}

```
HTML:
```html
<!-- Efeito RGB Final -->
<div class="loading">
    <span style="--i:1;"></span>
    <span style="--i:2;"></span>
    <span style="--i:3;"></span>
    <span style="--i:4;"></span>
    <span style="--i:5;"></span>
    <span style="--i:6;"></span>
    <span style="--i:7;"></span>
    <span style="--i:8;"></span>
    <span style="--i:9;"></span>
    <span style="--i:10;"></span>
    <span style="--i:11;"></span>
    <span style="--i:12;"></span>
    <span style="--i:13;"></span>
    <span style="--i:14;"></span>
    <span style="--i:15;"></span>
    <span style="--i:16;"></span>
    <span style="--i:17;"></span>
    <span style="--i:18;"></span>
    <span style="--i:19;"></span>
    <span style="--i:20;"></span>
</div>
<!-- Fim do Efeito RGB -->

```
```markdown
<!-- Efeito RGB Final -->
<div class="loading">
    <span style="--i:1;"></span>
    <span style="--i:2;"></span>
    <span style="--i:3;"></span>
    <span style="--i:4;"></span>
    <span style="--i:5;"></span>
    <span style="--i:6;"></span>
    <span style="--i:7;"></span>
    <span style="--i:8;"></span>
    <span style="--i:9;"></span>
    <span style="--i:10;"></span>
    <span style="--i:11;"></span>
    <span style="--i:12;"></span>
    <span style="--i:13;"></span>
    <span style="--i:14;"></span>
    <span style="--i:15;"></span>
    <span style="--i:16;"></span>
    <span style="--i:17;"></span>
    <span style="--i:18;"></span>
    <span style="--i:19;"></span>
    <span style="--i:20;"></span>
</div>
<!-- Fim do Efeito RGB -->

```

Este é o html que cria o efeito RGB. Cada `<span>` representa uma faixa colorida, proporcionando um visual dinâmico e divertido