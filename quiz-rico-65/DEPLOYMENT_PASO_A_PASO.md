# DEPLOYMENT A VERCEL - PASO A PASO (5 MINUTOS)

## PREREQUISITOS
- ✅ Cuenta GitHub (gratis: github.com)
- ✅ Cuenta Vercel (gratis: vercel.com)
- ✅ Git instalado en tu computadora

---

## PASO 1: CREAR CARPETA LOCAL (2 min)

Abre tu terminal/CMD y ejecuta:

```bash
# Crea carpeta para el proyecto
mkdir quiz-rico-65
cd quiz-rico-65

# Inicializa git
git init
git config user.name "Tu Nombre"
git config user.email "tu.email@example.com"
```

---

## PASO 2: COPIAR ARCHIVOS (1 min)

Copia estos 3 archivos a la carpeta `quiz-rico-65`:

1. **`package.json`** (Te lo doy abajo)
2. **`next.config.js`** (Te lo doy abajo)
3. **`pages/index.jsx`** (Tu componente del quiz)
4. **`.gitignore`** (Estándar Next.js)

**Estructura que debe quedar:**
```
quiz-rico-65/
├── package.json
├── next.config.js
├── .gitignore
└── pages/
    └── index.jsx
```

---

## PASO 3: CREAR ARCHIVOS

### Archivo 1: `package.json`

Crea un archivo llamado `package.json` en la raíz y pega esto:

```json
{
  "name": "quiz-rico-65",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18",
    "react-dom": "^18",
    "lucide-react": "^0.290.0"
  }
}
```

### Archivo 2: `next.config.js`

Crea un archivo llamado `next.config.js` en la raíz y pega esto:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

### Archivo 3: `pages/index.jsx`

1. Crea carpeta: `pages/`
2. Dentro crea archivo: `index.jsx`
3. Pega tu componente del quiz (el `quiz-rico-v2-estilo-votolibre.jsx`)

### Archivo 4: `.gitignore`

Crea un archivo llamado `.gitignore` en la raíz y pega esto:

```
node_modules/
.next/
.env.local
.vercel
*.swp
.DS_Store
```

---

## PASO 4: INSTALAR DEPENDENCIAS LOCALMENTE (1 min)

En tu terminal, en la carpeta `quiz-rico-65`, ejecuta:

```bash
npm install
```

Esto descarga las librerías necesarias (Next.js, React, Lucide, etc.)

---

## PASO 5: SUBIR A GITHUB (1 min)

### 5A: Crear repo en GitHub

1. Entra a https://github.com
2. Click en **"+"** (arriba a la derecha)
3. Click en **"New repository"**
4. Nombre: `quiz-rico-65`
5. Descripción: `Quiz interactivo: ¿Qué tan rico serás a los 65?`
6. Selecciona **"Public"**
7. NO marques "Add README" (lo haremos luego)
8. Click **"Create repository"**

### 5B: Subir tu código a GitHub

En tu terminal, en la carpeta `quiz-rico-65`, ejecuta:

```bash
# Agrega todos los archivos
git add .

# Crea el commit
git commit -m "Initial commit: Quiz Arca Digital - ¿Qué tan rico serás a los 65?"

# Sube a GitHub (reemplaza USUARIO con tu usuario de GitHub)
git branch -M main
git remote add origin https://github.com/USUARIO/quiz-rico-65.git
git push -u origin main
```

**Verifica:** Entra a https://github.com/USUARIO/quiz-rico-65 y confirma que tus archivos están ahí.

---

## PASO 6: DESPLEGAR EN VERCEL (1 min)

### 6A: Conectar Vercel a GitHub

1. Entra a https://vercel.com
2. Click **"Sign Up"** o **"Log In"** (con GitHub si tienes cuenta)
3. Click en **"New Project"**
4. Click en **"Import Git Repository"**
5. Autoriza Vercel a acceder a tu GitHub
6. Busca `quiz-rico-65` y click en él
7. Vercel detecta automáticamente que es **Next.js** ✅
8. Click **"Deploy"**
9. **ESPERA 30 segundos...**
10. ¡Listo! Tu URL aparecerá: `https://quiz-rico-65.vercel.app`

---

## PASO 7: PROBAR TU QUIZ

Entra a: `https://quiz-rico-65.vercel.app`

Si funciona:
- ✅ Ves la pantalla de selección de moneda
- ✅ Puedes hacer el quiz
- ✅ Ves el score
- ✅ Puedes compartir en redes

---

## SI ALGO FALLA

### Error: "Command not found: npm"

**Solución:** Node.js no está instalado. Descarga en: https://nodejs.org

### Error en Vercel: "Build failed"

Entra a Vercel → Dashboard → Proyecto → Deployments → Ver logs para ver qué salió mal

---

## PRÓXIMOS PASOS DESPUÉS DE DESPLEGAR

Una vez el quiz esté vivo:

1. **Actualizar CTA links:**
   - En `pages/index.jsx`, cambia `https://arcadigital.macrowise.co` por tu URL real

2. **Agregar analytics:**
   - Para ver cuánta gente hace el quiz

3. **Capturar emails:**
   - Conectar a Zapier → SendGrid para enviar Manual ARCA automáticamente

4. **Crear simulador DECODIFICAR:**
   - Siguiente paso después del quiz

---

## COMANDOS ÚTILES LUEGO

```bash
# Volver a desplegar después de hacer cambios
git add .
git commit -m "Update: [describe cambios]"
git push

# Vercel auto-redeploy cuando detecta cambios en GitHub
```

---

## RESUMEN

| Paso | Qué | Tiempo |
|------|-----|--------|
| 1 | Crear carpeta + git init | 1 min |
| 2-4 | Crear archivos + npm install | 2 min |
| 5 | GitHub upload | 1 min |
| 6 | Vercel deploy | 1 min |
| **TOTAL** | **TU QUIZ VIVO** | **5 min** |

¿Listo? Comienza en Paso 1.

