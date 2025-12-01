# 🎫 Passio Backend

**Passio Backend** es el servidor de la plataforma Passio, construido con Node.js y Express. Proporciona una API robusta y segura para gestionar usuarios, eventos, boletos y control de accesos.

## Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Tecnologías Principales](#-tecnologías-principales)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [API Endpoints](#-api-endpoints)
- [Modelos de Base de Datos](#-modelos-de-base-de-datos)
- [Autenticación y Seguridad](#-autenticación-y-seguridad)
- [Middlewares](#-middlewares)

---

## Descripción General

Passio Backend es una API RESTful que sirve como núcleo de la plataforma Passio. Sus principales funcionalidades incluyen:

- **Gestión de usuarios**: Registro, autenticación y administración de usuarios con diferentes roles.
- **Gestión de eventos**: CRUD completo para eventos con soporte para imágenes.
- **Sistema de boletos**: Creación, venta y validación de tickets para eventos.
- **Control de accesos**: Registro de logs de acceso y validación de entradas.
- **Dashboard**: Endpoints para estadísticas y métricas de la plataforma.

La API está diseñada para ser consumida por el frontend de Passio, ofreciendo respuestas JSON consistentes y manejo de errores robusto.

---

## Tecnologías Principales

### Core

| Tecnología                        | Descripción                                              |
| --------------------------------- | -------------------------------------------------------- |
| [Node.js](https://nodejs.org/)    | Entorno de ejecución de JavaScript del lado del servidor |
| [Express](https://expressjs.com/) | Framework web minimalista y flexible para Node.js        |

### Base de Datos

| Tecnología                          | Descripción                                                         |
| ----------------------------------- | ------------------------------------------------------------------- |
| [MySQL](https://www.mysql.com/)     | Sistema de gestión de bases de datos relacional                     |
| [Sequelize](https://sequelize.org/) | ORM (Object-Relational Mapping) para Node.js con soporte para MySQL |

### Autenticación y Seguridad

| Tecnología                                         | Descripción                                                     |
| -------------------------------------------------- | --------------------------------------------------------------- |
| [JSON Web Tokens (JWT)](https://jwt.io/)           | Estándar para la transmisión segura de información entre partes |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Librería para hash de contraseñas con salt                      |
| [Helmet](https://helmetjs.github.io/)              | Colección de middlewares para seguridad HTTP                    |
| [CORS](https://www.npmjs.com/package/cors)         | Middleware para habilitar Cross-Origin Resource Sharing         |

### Utilidades

| Tecnología                                                | Descripción                                            |
| --------------------------------------------------------- | ------------------------------------------------------ |
| [dotenv](https://www.npmjs.com/package/dotenv)            | Carga variables de entorno desde archivo .env          |
| [Morgan](https://www.npmjs.com/package/morgan)            | Middleware de logging para peticiones HTTP             |
| [express-validator](https://express-validator.github.io/) | Middleware para validación de datos de entrada         |
| [Multer](https://www.npmjs.com/package/multer)            | Middleware para manejo de archivos multipart/form-data |

---

## Arquitectura del Proyecto

```
Passio_back/
├── node_modules/
├── src/
|    ├── config/                 # Configuraciones de la aplicación
|    │   ├── database.js         # Conexión y configuración de Sequelize/MySQL
|    │   └── env.js              # Variables de entorno centralizadas
|    │
|    ├── controllers/            # Controladores (lógica de negocio)
|    │   ├── authController.js   # Controlador de autenticación
|    │   ├── userController.js   # Controlador de usuarios
|    │   ├── eventController. js      # Controlador de eventos
|    │   ├── ticketController.js      # Controlador de boletos
|    │   └── dashboardController.js   # Controlador de dashboard
|    │
|    ├── middleware/             # Middlewares personalizados
|    │   ├── auth. js            # Autenticación JWT y autorización por roles
|    │   ├── errorHandler.js     # Manejador global de errores
|    │   └── upload.js           # Configuración de Multer para subida de archivos
|    │
|    ├── models/                 # Modelos de Sequelize (entidades de BD)
|    │   ├── index.js            # Exportación centralizada y relaciones
|    │   ├── User.js             # Modelo de usuarios
|    │   ├── Event.js            # Modelo de eventos
|    │   ├── Ticket.js           # Modelo de boletos
|    │   ├── Sale.js             # Modelo de ventas
|    │   └── AccessLog.js        # Modelo de logs de acceso
|    │
|    ├── routes/                 # Definición de rutas de la API
|    │   ├── auth.js             # Rutas de autenticación (/api/auth)
|    │   ├── users.js            # Rutas de usuarios (/api/users)
|    │   ├── events.js           # Rutas de eventos (/api/events)
|    │   ├── tickets. js         # Rutas de boletos (/api/tickets)
|    │   └── dashboard.js        # Rutas de dashboard (/api/dashboard)
|    │
|    ├── utils/                  # Funciones utilitarias
|    │   └── validators.js       # Validaciones con express-validator
|    │
|    └── app.js                  # Configuración principal de Express
|
├── docs/
|   ├── MANUAL_TECNICO.md
|   ├── MANUAL DE USUARIO.md
|   ├── README-BACKEND.md
|   ├── README-FRONTEND.md
|   └── README.md
|
├── .env
├── package-lock.json
├── package.json
└── server.js                    # Iniciar servidor
```

---

## Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18 o superior ([Descargar](https://nodejs.org/))
- **MySQL** versión 8.0 o superior ([Descargar](https://www.mysql.com/downloads/))
- **npm** (incluido con Node.js)
- **Git** para clonar el repositorio

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Veggagf/passio_nodejs.git
   cd passio_nodejs
   ```

2. **Instalar dependencias**

```bash
npm install
```

3. **Crear la base de datos MySQL**

   ```sql
   CREATE DATABASE passio_db;
   ```

4. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=passio_db
DB_USER=root
DB_PASSWORD=tu_contraseña

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=http://localhost:5173
```

5. **Iniciar el servidor**

   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:3000`

---

## Configuración

### Variables de Entorno

| Variable         | Descripción                                        | Valor por defecto       |
| ---------------- | -------------------------------------------------- | ----------------------- |
| `PORT`           | Puerto del servidor                                | `3000`                  |
| `NODE_ENV`       | Entorno de ejecución (`development`, `production`) | `development`           |
| `DB_HOST`        | Host de la base de datos MySQL                     | `localhost`             |
| `DB_PORT`        | Puerto de MySQL                                    | `3306`                  |
| `DB_NAME`        | Nombre de la base de datos                         | `passio_db`             |
| `DB_USER`        | Usuario de MySQL                                   | `root`                  |
| `DB_PASSWORD`    | Contraseña de MySQL                                | -                       |
| `JWT_SECRET`     | Clave secreta para firmar tokens JWT               | -                       |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token                     | `7d`                    |
| `FRONTEND_URL`   | URL del frontend (para CORS)                       | `http://localhost:5173` |

### Configuración de Base de Datos

La conexión a MySQL se realiza mediante Sequelize con las siguientes características:

- **Pool de conexiones**: Máximo 5 conexiones simultáneas
- **Logging**: Activo en desarrollo, desactivado en producción
- **Sincronización**: Automática con `alter` en desarrollo
- **Timestamps**: Habilitados por defecto en todos los modelos

---

## Scripts Disponibles

| Comando       | Descripción                                 |
| ------------- | ------------------------------------------- |
| `npm start`   | Inicia el servidor en modo producción       |
| `npm run dev` | Inicia el servidor con nodemon (hot-reload) |

---

## Modelos de Base de Datos

### User (Usuarios)

```javascript
{
  id: INTEGER (PK, Auto-increment),
  name: STRING(100),           // Nombre completo
  username: STRING(50),        // Nombre de usuario (único)
  email: STRING(100),          // Email (único, validado)
  password: STRING(255),       // Contraseña hasheada con bcrypt
  role: ENUM('administrador', 'organizador', 'staff', 'usuario'),
}
```

### Event (Eventos)

```javascript
{
  id: INTEGER (PK, Auto-increment),
  title: STRING,               // Título del evento
  description: TEXT,           // Descripción detallada
  date: DATE,                  // Fecha del evento
  location: STRING,            // Ubicación
  capacity: INTEGER,           // Capacidad máxima
  image_url: STRING,           // URL de la imagen del evento
  organizer_id: INTEGER (FK),  // Referencia al organizador
}
```

### Ticket (Boletos)

```javascript
{
  id: INTEGER (PK, Auto-increment),
  event_id: INTEGER (FK),      // Referencia al evento
  name: STRING,                // Nombre del tipo de boleto
  price: DECIMAL(10,2),        // Precio
  quantity_available: INTEGER  // Cantidad disponible
}
```

### Sale (Ventas)

```javascript
{
  id: INTEGER (PK, Auto-increment),
  user_id: INTEGER (FK),       // Referencia al boleto
  ticket_id: INTEGER (FK),     // Referencia al comprador+
  purchase_date: DATE,         // Fecha al comprar
  qr_code: STRING,             // Código QR
  status: ENUM('pagado', 'usado', 'cancelado'),
  ...
}
```

---

## Autenticación y Seguridad

### Sistema de Autenticación JWT

El backend implementa autenticación basada en JSON Web Tokens (JWT):

1. **Login**: El usuario envía credenciales → El servidor verifica → Retorna un token JWT
2. **Peticiones autenticadas**: El cliente incluye el token en el header `Authorization: Bearer <token>`
3. **Verificación**: El middleware valida el token y extrae la información del usuario

### Roles de Usuario

El sistema implementa control de acceso basado en roles (RBAC):

| Rol             | Descripción               | Permisos                               |
| --------------- | ------------------------- | -------------------------------------- |
| `usuario`       | Usuario final             | Comprar boletos, ver eventos           |
| `staff`         | Personal de evento        | Validar boletos, control de accesos    |
| `organizador`   | Organizador de eventos    | Crear/editar eventos, ver estadísticas |
| `administrador` | Administrador del sistema | Acceso completo, gestión de usuarios   |

### Medidas de Seguridad

- **Helmet**: Headers HTTP de seguridad configurados
- **CORS**: Origen restringido al frontend autorizado
- **Bcrypt**: Hash de contraseñas con salt (10 rounds)
- **Validación**: Sanitización de entradas con express-validator
- **Manejo de errores**: Errores genéricos en producción, detallados en desarrollo

---

## 🔧 Middlewares

### authenticateToken

Verifica la validez del token JWT y adjunta la información del usuario a `req.user`:

```javascript
// Uso en rutas
router.get("/protected", authenticateToken, controller.action);
```

**Respuestas de error:**

- `401`: Acceso denegado, Usuario no encontrado, etc.
- `403`: No se tiene permiso para dicha acción.

### authorizeRoles

Verifica que el usuario tenga uno de los roles permitidos:

```javascript
// Uso en rutas
router.post(
  "/events",
  authenticateToken,
  authorizeRoles("administrador", "organizador"),
  eventController.create
);
```

### Upload

Middleware para manejo de subida de archivos (imágenes de eventos):

- **Destino**: `uploads/`
- **Tipos permitidos**: Imágenes (jpeg, png, gif, etc.)
- **Límite de tamaño**: Configurable

---

## Formato de Respuestas

Todas las respuestas de la API siguen un formato consistente:

### Respuesta Exitosa

```json
{
  "success": true,
  "message": "Operación realizada correctamente",
  "data": {
    /* datos */
  }
}
```

### Respuesta de Error

```json
{
  "success": false,
  "message": "Descripción del error"
}
```

### Respuesta de Validación

```json
{
  "success": false,
  "message": "Errores de validación",
  "errors": [{ "field": "email", "message": "Email inválido" }]
}
```

---
