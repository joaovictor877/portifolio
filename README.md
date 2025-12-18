# 🎨 Portfólio de João Victor

Portfólio profissional dinâmico desenvolvido com HTML5, CSS3, JavaScript e Vercel Blob, apresentando projetos em tempo real com autenticação e painel administrativo.

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
✅ **Projetos Dinâmicos** - Sincronização em tempo real com Firestore  
✅ **Carrossel de Imagens** - Navegação fluida com Swiper.js  
✅ **Filtros por Categoria** - Exibição de projetos por tipo (Web, Backend, Mobile)  
✅ **Autenticação Firebase** - Email/Password + Google OAuth  
✅ **Painel Administrativo** - CRUD completo para gerenciar projetos  
✅ **Upload de Imagens** - Firebase Storage com sincronização automática  
✅ **Design Dark Theme** - Interface moderna com gradientes ciano-azul  
✅ **URLs Limpas** - Sem extensões `.html` (`.htaccess` + rewrite)  
✅ **Segurança** - Regras de Firestore e Storage para proteção de dados  

---

## 🛠 Tecnologias

### Frontend
- **HTML5** - Markup semântico
- **CSS3** - Grid, Flexbox, Gradientes, Animações
- **JavaScript (Vanilla)** - DOM manipulation, Event handling
- **[Swiper.js 11](https://swiperjs.com/)** - Carrosséis e sliders

### Backend & Serviços
- **Firebase 9.22.0**
  - 🔐 **Authentication** - Email/Password + Google OAuth
  - 🗄️ **Firestore Database** - NoSQL cloud database
  - 📦 **Cloud Storage** - Armazenamento de imagens
  
### Deployment
- **GitHub** - Versionamento de código
- **Vercel** - Hosting automático via GitHub integration
- **Domain Custom** - joaovictor.app.br

---

## 📂 Estrutura do Projeto

```
portifolio/
├── index.html              # 🏠 Página inicial (hero, about, skills, educação)
├── projetos.html           # 📋 Galeria dinâmica de projetos
├── login.html              # 🔓 Login para visitantes
├── login-admin.html        # 🔐 Login para administradores
├── admin.html              # ⚙️ Painel CRUD para gerenciar projetos
├── firebase-config.js      # 🔑 Configuração Firebase (pode estar inline)
├── style.css               # 🎨 Estilos globais
├── script.js               # ⚡ Scripts globais
├── .htaccess               # 🔄 Rewrite para URLs limpas
├── vercel.json             # ▲ Configuração Vercel
├── README.md               # 📖 Este arquivo
└── images/                 # 🖼️ Imagens estáticas
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
3. Configure os seguintes serviços:

#### Authentication
```
✅ Email/Password - Habilitado
✅ Google - Habilitado (adicionar domínios autorizados)
```

**Domínios Autorizados:**
- `localhost:3000` (desenvolvimento)
- `joaovictor.app.br` (produção)
- Seu domínio custom

#### Firestore Database
Criar coleção `projects` com documentos contendo:
```javascript
{
  title: "Nome do Projeto",
  description: "Descrição detalhada",
  category: "Web", // Web, Backend, Mobile
  tech: ["React", "Firebase", "Vercel"],
  userId: "user-id-do-admin",
  createdAt: timestamp,
  imageUrl: "url-da-imagem-no-storage"
}
```

**Regras de Segurança:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projetos: Qualquer um lê, só autenticado cria/edita
    match /projects/{document=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

#### Cloud Storage
**Regras de Segurança:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### 3️⃣ Configurar as APIs

Adicione as credenciais Firebase em cada HTML (já inclusas):

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "portfoliodejoao.firebaseapp.com",
  projectId: "portfoliodejoao",
  storageBucket: "portfoliodejoao.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
```

### 4️⃣ Testar Localmente

```bash
# Opção 1: Usar Live Server no VS Code
# Click direito em index.html → "Open with Live Server"

# Opção 2: Python SimpleHTTPServer
python -m http.server 8000

# Opção 3: Node.js http-server
npx http-server -p 3000
```

Acesse: `http://localhost:3000` ou `http://localhost:8000`

---

## 📖 Uso

### 👨‍💼 Para Visitantes

1. **Homepage** - Veja informações sobre João Victor
2. **Projetos** - Navegue pelos projetos com carrosséis de imagens
3. **Filtros** - Filtre por categoria (Todos, Web, Backend, Mobile)
4. **Contato** - Links diretos para Gmail, LinkedIn, GitHub

### 🔐 Para Administradores

1. **Acesse** `joaovictor.app.br/login-admin` (ou `/login-admin.html` em dev)
2. **Faça login** com suas credenciais Firebase
3. **Acesse o painel** em `/admin` (ou `admin.html`)

---

## 🔐 Autenticação

### 📧 Email/Password

```javascript
// Login
auth.signInWithEmailAndPassword(email, password)
  .then(userCredential => {
    window.location.href = 'index.html'; // ou admin.html
  })
  .catch(error => console.error(error.message));

// Criar conta
auth.createUserWithEmailAndPassword(email, password)
  .then(userCredential => {
    // Usuário criado com sucesso
  });
```

### 🔵 Google OAuth

```javascript
const googleProvider = new firebase.auth.GoogleAuthProvider();
auth.signInWithPopup(googleProvider)
  .then(result => {
    window.location.href = 'admin.html';
  });
```

### Logout

```javascript
auth.signOut().then(() => {
  window.location.href = 'login.html';
});
```

---

## ⚙️ Painel Admin

### Funcionalidades

**Adicionar Projeto:**
- ✏️ Título, Descrição, Categoria
- 🏷️ Tags de tecnologia (array dinâmico)
- 🖼️ Upload de imagem para Firebase Storage
- 💾 Salvar automaticamente no Firestore

**Editar Projeto:**
- ✏️ Atualizar todos os campos
- 🖼️ Alterar imagem
- 💾 Sincronização em tempo real

**Deletar Projeto:**
- 🗑️ Remover do Firestore
- 🗑️ Remover imagem do Storage

**Listar Projetos:**
- 📋 Exibição em tempo real
- 🔍 Busca rápida
- 📱 Interface responsiva

---

## 🔒 Segurança

### 🛡️ Firestore Rules
- ✅ Leitura pública para todos (projetos visíveis)
- 🔐 Escrita apenas para usuários autenticados
- 👤 Cada admin gerencia seus próprios projetos

### 🛡️ Storage Rules
- ✅ Leitura pública (imagens visíveis)
- 🔐 Upload apenas para autenticados
- 📝 Caminho: `projects/{fileName}`

### 🛡️ Environment Variables
- 🔑 API keys não devem ser expostas em produção
- ✅ Firebase config pode estar segura (public config, private keys via backend)
- 📦 Usar Vercel Environment Variables para dados sensíveis

---

## 🚀 Deployment

### Opção 1: Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Ou conecte diretamente no [Vercel Dashboard](https://vercel.com):
1. Importar repositório GitHub
2. Configurar Environment Variables (se necessário)
3. Deploy automático em cada push para `main`

### Opção 2: Configurar Domínio Custom

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

### Opção 3: GitHub Pages

```bash
# Se preferir usar GitHub Pages ao invés de Vercel
# Ativar em Settings → Pages → Source: main branch
```

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

### ❌ Imagens não carregam
**Solução:** Verifique as regras de Firebase Storage permitem read público

### ❌ Firestore query muito lenta
**Solução:** Crie índices compostos conforme sugerido pelo Firebase Console

### ❌ Erro de CORS ao fazer upload
**Solução:** Atualize Storage rules para permitir autenticados:
```javascript
allow create, update, delete: if request.auth != null;
```

---

## 📝 Variáveis de Ambiente

Se usar Vercel com variáveis de ambiente:

```
VITE_FIREBASE_API_KEY=seu_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

---

## 📚 Recursos Úteis

- 📖 [Firebase Docs](https://firebase.google.com/docs)
- 🎨 [Swiper.js Documentation](https://swiperjs.com/react)
- 🚀 [Vercel Docs](https://vercel.com/docs)
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

Modificação 12/12

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
