# 🤖 Configuración Google Gemini AI (GRATIS)

Google Gemini ofrece una capa gratuita muy generosa para comenzar.

## Obtener API Key

1. Ve a **https://aistudio.google.com**
2. Inicia sesión con tu cuenta Google
3. Haz clic en **"Get API key"**
4. Haz clic en **"Create API key in new project"**
5. Copia la API key generada

## Configurar en el proyecto

En `backend/.env`:
```env
GEMINI_API_KEY=AIzaSy...tu_api_key_aqui
```

## Límites gratuitos (Gemini 1.5 Flash)

- **15 solicitudes por minuto** (RPM)
- **1,000,000 tokens por minuto** (TPM)
- **1,500 solicitudes por día** (RPD)
- **Sin costo** en el tier gratuito

Más que suficiente para aprendizaje.

## Modelo utilizado

El proyecto usa `gemini-1.5-flash` que es:
- ✅ Gratuito
- ✅ Rápido
- ✅ Inteligente para revisión de código
- ✅ Soporte multilenguaje

## ¿No funciona?

- Verifica que la API key esté correctamente copiada
- La key no debe tener espacios
- El servidor debe reiniciarse después de cambiar .env
