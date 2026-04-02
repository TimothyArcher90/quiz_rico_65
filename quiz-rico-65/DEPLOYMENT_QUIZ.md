# DEPLOYMENT: QUIZ "¿QUÉ TAN RICO SERÁS A LOS 65?"

## OPCIÓN 1: VERCEL (RECOMENDADO - 5 minutos)

### Paso 1: Crea un repo en GitHub

```bash
# En tu carpeta local
git init
git add .
git commit -m "Initial commit: Quiz Arca Digital"
git branch -M main
git remote add origin https://github.com/tu-usuario/quiz-rico-65.git
git push -u origin main
```

### Paso 2: Deploy en Vercel (Automático)

1. Entra a https://vercel.com
2. Click en "New Project"
3. Conecta tu repo GitHub
4. Vercel detecta automáticamente que es Next.js
5. Click en "Deploy"
6. **Listo en 30 segundos**

Tu quiz estará en: `https://quiz-rico-65.vercel.app`

---

## OPCIÓN 2: ESTRUCTURA NEXT.JS (Para desarrollo local)

Si quieres testear antes de subir:

### Crea este archivo: `pages/index.jsx`

```jsx
import QuizRico from '../components/QuizRico';

export default function Home() {
  return <QuizRico />;
}
```

### Crea este archivo: `components/QuizRico.jsx`

[Usa el código completo que crearemos]

### Crea este archivo: `package.json`

```json
{
  "name": "quiz-rico-65",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "lucide-react": "^0.290.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.6"
  }
}
```

### Instala y corre:

```bash
npm install
npm run dev
```

Accede en: `http://localhost:3000`

---

## OPCIÓN 3: HTML STANDALONE (Sin Framework)

Si quieres algo aún más simple, puedo crear un HTML puro con Tailwind CDN.

---

## INTEGRACIÓN CON EMAIL

### Endpoint para capturar emails:

Necesitarás una API simple. Opciones:

**1. Vercel Edge Functions** (Gratuito con Vercel)

Crea: `api/capture-email.js`

```javascript
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, zone } = req.body;

    // Guarda en tu base de datos (Supabase, Firebase, etc)
    // O envía email automático con SendGrid

    console.log('Email captured:', email, 'Zone:', zone);

    res.status(200).json({ success: true });
  }
}
```

**2. Con SendGrid** (Para enviar emails automáticos)

```javascript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: email,
  from: 'no-reply@macrowise.capital',
  subject: 'Tu Manual ARCA - Acceso Gratuito',
  html: `<h1>Bienvenido al Manual ARCA</h1>...`
};

await sgMail.send(msg);
```

---

## CHECKLIST DE DEPLOYMENT

- [ ] Código React creado ✅
- [ ] Repo GitHub creado
- [ ] Conectado a Vercel
- [ ] Quiz desplegado y accesible
- [ ] Email capture integrado (API)
- [ ] SendGrid configurado para emails automáticos
- [ ] Dominio personalizado (opcional: quiz.macrowise.co)

---

## PRÓXIMO: SIMULADOR DECODIFICAR

Una vez el quiz esté vivo, pasamos al simulador:
- GDevelop o React interactive
- Usuario invierte $10K
- Ve 84 meses de volatilidad real
- Bitcoin + Solana 50/50

