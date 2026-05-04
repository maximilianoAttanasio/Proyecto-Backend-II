# Proyecto Backend Ecommerce

Sistema de autenticación y autorización utilizando JWT.

## Instalación

npm install

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con:

```
PORT=8080
MONGO_URL=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=tu_clave_secreta
```

## Ejecución

```
node src/app.js
```

## Autenticación

La autenticación se realiza mediante JWT almacenado en cookies httpOnly.

El token se genera al iniciar sesión y se envía automáticamente en las siguientes requests.

## Endpoints

### Registro de Usuarios
POST /api/sessions/register

```
{
  "first_name": "Nombre",
  "last_name": "Apellido",
  "email": "correo@correo.com",
  "age": 99,
  "password": "password"
}
```

---

### Iniciar Sesión
POST /api/sessions/login

```
{
  "email": "correo@correo.com",
  "password": "password"
}
```

---

### Verificar sesión actual
GET /api/sessions/current

---

### Cerrar sesión
POST /api/sessions/logout

## Pruebas

Se recomienda utilizar Postman¿.

Flujo sugerido:
1. Registrar usuario
2. Iniciar sesión
3. Acceder a /current
4. Cerrar sesión
5. Volver a intentar /current (Debería fallar)

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Passport
- JWT
- Bcrypt