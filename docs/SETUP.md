# 🛠️ Guía de Configuración

## Requisitos

- Node.js 18+
- MongoDB Atlas (gratuito) o MongoDB local
- Google Gemini API Key (gratuita)
- Google OAuth credentials (opcional)

## 1. Clonar el repositorio

```bash
git clone https://github.com/22Wilber22/MernLearning.git
cd MernLearning
```

## 2. Configurar el Backend

```bash
cd backend
cp .env.example .env
npm install
```

### Variables de entorno (.env):

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=mi_secreto_super_seguro
GEMINI_API_KEY=AIza...
GOOGLE_CLIENT_ID=... (opcional)
GOOGLE_CLIENT_SECRET=... (opcional)
FRONTEND_URL=http://localhost:3000
```

### MongoDB Atlas (gratis):
1. Ve a https://www.mongodb.com/atlas
2. Crea una cuenta gratis
3. Crea un cluster M0 (gratuito)
4. En "Database Access" crea un usuario
5. En "Network Access" agrega tu IP
6. Copia la connection string y ponla en MONGODB_URI

## 3. Configurar el Frontend

```bash
cd frontend
cp .env.example .env
npm install
```

### Variables de entorno frontend (.env):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 4. Poblar la base de datos

```bash
cd backend
npm run seed
```

## 5. Ejecutar la aplicación

Terminal 1 (Backend):
```bash
cd backend && npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend && npm start
```

Abre http://localhost:3000

## 6. Google Gemini API (GRATIS)

Ver [GEMINI_SETUP.md](GEMINI_SETUP.md)
