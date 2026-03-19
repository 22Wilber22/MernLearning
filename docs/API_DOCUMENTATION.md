# 📡 Documentación API

Base URL: `http://localhost:5000/api`

## Autenticación

### POST /auth/register
Registrar nuevo usuario.

**Body:**
```json
{
  "name": "Juan",
  "email": "juan@email.com",
  "password": "minimo6"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGci...",
  "user": { "id": "...", "name": "Juan", "email": "...", "xp": 0 }
}
```

### POST /auth/login
Iniciar sesión.

**Body:**
```json
{ "email": "juan@email.com", "password": "minimo6" }
```

### GET /auth/google
Iniciar OAuth con Google.

### GET /auth/me
Obtener usuario actual (requiere token).

## Módulos

### GET /modules
Listar todos los módulos.

### GET /modules/:slug
Obtener módulo con sus lecciones.

## Lecciones

### GET /lessons/:id
Obtener lección con ejercicios.

### POST /lessons/:id/complete
Marcar lección como completada.

## Ejercicios

### GET /exercises/:id
Obtener ejercicio.

### POST /exercises/:id/submit
Enviar código para revisión IA.

**Body:**
```json
{ "code": "<!DOCTYPE html>..." }
```

**Response:**
```json
{
  "success": true,
  "data": {
    "aiReview": {
      "score": 85,
      "passed": true,
      "feedback": "...",
      "positives": ["..."],
      "improvements": ["..."],
      "suggestions": ["..."]
    }
  }
}
```

## IA (Gemini)

### POST /ai/review
Revisar código.

**Body:**
```json
{
  "code": "...",
  "description": "descripción del ejercicio",
  "language": "html"
}
```

### POST /ai/hint
Obtener pista para un ejercicio.

### POST /ai/explain
Explicar un concepto.

## Autenticación

Incluir header en todas las rutas protegidas:
```
Authorization: Bearer <token>
```
