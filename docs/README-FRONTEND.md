# 🎫 Passio Frontend

**Passio** es una aplicación web moderna diseñada para simplificar la gestión integral de eventos. Desde la creación y organización de eventos hasta la registro de boletos y control de accesos, Passio ofrece una experiencia fluida tanto para organizadores como para asistentes.

## Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Tecnologías Principales](#-tecnologías-principales)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Módulos y Funcionalidades](#-módulos-y-funcionalidades)
- [Gestión de Estado](#-gestión-de-estado)
- [Servicios de API](#-servicios-de-api)
- [Sistema de Rutas](#-sistema-de-rutas)
- [Estilos y Diseño](#-estilos-y-diseño)

---

## Descripción General

Passio Frontend es la interfaz de usuario de la plataforma Passio. La aplicación permite:

- **Para usuarios finales**: Navegar eventos disponibles, comprar boletos y gestionar sus accesos.
- **Para organizadores**: Crear y administrar eventos, visualizar dashboards con estadísticas.
- **Para staff**: Gestionar el control de accesos y validación de boletos.
- **Para administradores**: Gestión completa de usuarios y supervisión del sistema.

La plataforma ha gestionado más de **120,000 tickets** y **800+ eventos**, manteniendo un **98% de satisfacción** de usuarios.

---

## Tecnologías Principales

### Core

| Tecnología                  | Versión | Descripción                                                                                                                        |
| --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [React](https://react.dev/) | 19.2.0  | Biblioteca de JavaScript para construir interfaces de usuario reactivas y componentes reutilizables                                |
| [Vite](https://vitejs.dev/) | 7.2.2   | Herramienta de construcción de nueva generación que ofrece un servidor de desarrollo ultrarrápido con Hot Module Replacement (HMR) |

### Enrutamiento y Estado

| Tecnología                                   | Versión | Descripción                                                                                                     |
| -------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| [React Router DOM](https://reactrouter.com/) | 7.9.6   | Biblioteca estándar para navegación declarativa y enrutamiento en aplicaciones React SPA                        |
| [Zustand](https://zustand-demo.pmnd.rs/)     | 5.0.8   | Solución de gestión de estado minimalista y escalable, utilizada para manejar autenticación, eventos y usuarios |

### Estilos

| Tecnología                               | Versión | Descripción                                                                                         |
| ---------------------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1.17  | Framework CSS utility-first que permite crear diseños personalizados rápidamente sin salir del HTML |
| [DaisyUI](https://daisyui.com/)          | 5.5.5   | Plugin de Tailwind que proporciona componentes UI prediseñados con soporte para temas               |

### Utilidades

| Tecnología                                      | Versión  | Descripción                                                                                         |
| ----------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| [Axios](https://axios-http.com/)                | 1.13.2   | Cliente HTTP basado en promesas para realizar peticiones al backend con interceptores configurables |
| [React Hook Form](https://react-hook-form.com/) | 7.66.1   | Biblioteca para manejo eficiente de formularios con validación y mínima re-renderización            |
| [Lucide React](https://lucide.dev/)             | 0.554. 0 | Colección de iconos SVG optimizados y personalizables                                               |

---

## Arquitectura del Proyecto

El proyecto sigue una estructura modular y organizada que facilita el mantenimiento y la escalabilidad:

```
Passio_front/
|
├── node_modules/
|
├── src/
|    ├── api/                    # Capa de servicios para comunicación con el backend
|    │   ├── axios.js            # Configuración global de Axios con interceptores
|    │   ├── authService.js      # Servicios de autenticación (login, registro, logout)
|    │   ├── eventService.js     # CRUD de eventos
|    │   ├── ticketService.js    # Gestión de boletos
|    │   └── userService.js      # Gestión de usuarios
|    │
|    ├── assets/                 # Recursos estáticos
|    │   └── imagenes/           # Imágenes del proyecto (fondos, galería, etc.)
|    │
|    ├── components/             # Componentes reutilizables de React
|    │   ├── auth/               # Componentes de autenticación (formularios, guards)
|    │   ├── common/             # Componentes compartidos (Card, botones, modales)
|    │   ├── dashboard/          # Widgets y elementos del panel de control
|    │   ├── events/             # Componentes relacionados con eventos
|    │   ├── layout/             # Estructura de la aplicación
|    │   │   ├── navbar.jsx      # Barra de navegación principal
|    │   │   ├── footer.jsx      # Pie de página
|    │   │   └── layout.jsx      # Layout wrapper para páginas
|    │   └── users/              # Componentes de gestión de usuarios
|    │
|    ├── pages/                  # Vistas/Páginas de la aplicación
|    │   ├── HomePage.jsx        # Página de inicio con hero, estadísticas y testimonios
|    │   ├── admin/              # Páginas de administración
|    │   │   └── userManagementPage.jsx  # Gestión de usuarios del sistema
|    │   ├── auth/               # Páginas de autenticación
|    │   │   ├── loginPage.jsx       # Inicio de sesión
|    │   │   ├── registerPage.jsx    # Registro de nuevos usuarios
|    │   │   └── registerUser.jsx    # Registro adicional de usuarios
|    │   └── events/             # Páginas de eventos
|    │       ├── boletos.jsx                    # Visualización y compra de boletos
|    │       ├── createEventPage.jsx            # Formulario de creación de eventos
|    │       ├── eventsListPage.jsx             # Listado general de eventos
|    │       ├── eventsListUser.jsx             # Eventos del usuario
|    │       ├── eventsDashboardPage.jsx        # Dashboard principal de eventos
|    │       ├── eventsDashboardPageOrganizer.jsx   # Dashboard para organizadores
|    │       └── eventsDahboardPageStaff.jsx        # Dashboard para staff
|    │
|    ├── router/                 # Configuración de navegación
|    │   ├── appRouter.jsx       # Definición de rutas y componentes asociados
|    │   └── routes.js           # Constantes de rutas
|    │
|    ├── store/                  # Estado global con Zustand
|    │   ├── authStore.js        # Estado de autenticación (usuario, token, rol)
|    │   ├── eventStore. js      # Estado de eventos
|    │   └── userStore.js        # Estado de usuarios
|    │
|    ├── utils/                  # Funciones utilitarias
|    │   ├── constants.js
|    │   ├── helpers. js
|    |
|    ├── App.jsx                 # Componente raíz de la aplicación
|    ├── App.css                 # Estilos específicos del componente App
|    ├── main.jsx                # Punto de entrada - renderiza la app en el DOM
|    └── index.css               # Estilos globales y configuración de Tailwind
|
├── docs/
|   ├── MANUAL_TECNICO.md
|   ├── MANUAL DE USUARIO.md
|   ├── README-BACKEND.md
|   ├── README-FRONTEND.md
|   └── README.md
|
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18 o superior ([Descargar](https://nodejs.org/))
- **npm** (incluido con Node.js) o **yarn**
- **Git** para clonar el repositorio

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github. com/Veggagf/Passio_front.git
   cd Passio_front
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

   Esto instalará todas las dependencias listadas en `package. json`, incluyendo React, Vite, Tailwind CSS, y demás librerías.

3. **Configurar variables de entorno** (si aplica)

   Crea un archivo `. env` en la raíz del proyecto si necesitas configurar variables de entorno. Por defecto, la aplicación se conecta a:

   ```
   http://localhost:3000/api/
   ```

   Para cambiar la URL del backend, modifica el archivo `src/api/axios.js`.

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173` (puerto por defecto de Vite).

---

## Scripts Disponibles

| Comando       | Descripción                                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev` | Inicia el servidor de desarrollo con Hot Module Replacement (HMR). Los cambios en el código se reflejan instantáneamente en el navegador. |

---

## Módulos y Funcionalidades

### 1. Autenticación y Autorización

El sistema implementa autenticación basada en JWT (JSON Web Tokens) con diferentes roles de usuario:

- **Login/Registro**: Formularios validados con React Hook Form
- **Persistencia de sesión**: El token y rol se almacenan en localStorage y en el estado global
- **Interceptores de Axios**: Adjuntan automáticamente el token a las peticiones autorizadas
- **Manejo de errores 401**: Redirección automática cuando el token expira o es inválido

**Roles disponibles:**

- `user` - Usuario final (compra de boletos)
- `organizer` - Organizador de eventos
- `staff` - Personal de control de accesos
- `admin` - Administrador del sistema

### 2. Gestión de Eventos

Funcionalidades completas para el ciclo de vida de eventos:

- **Creación de eventos**: Formulario detallado con campos para nombre, fecha, ubicación, capacidad, etc.
- **Listado de eventos**: Vista de todos los eventos disponibles
- **Dashboards especializados**:
  - Dashboard general para administradores
  - Dashboard de organizador para gestión de eventos propios
  - Dashboard de staff para control de accesos

### 3. Gestión de Boletos

- **Visualización de boletos**: Los usuarios pueden ver sus boletos adquiridos
- **Compra de boletos**: Flujo de compra integrado con el sistema de eventos
- **Validación**: El staff puede escanear y validar boletos

### 4. Panel de Administración

- **Gestión de usuarios**: CRUD completo de usuarios del sistema
- **Asignación de roles**: Modificación de permisos de usuarios

---

## Gestión de Estado

La aplicación utiliza **Zustand** para manejar el estado global de manera simple y eficiente. Se han implementado tres stores principales:

### authStore.js

Maneja todo lo relacionado con la autenticación:

```javascript
{
  user: Object | null,      // Datos del usuario actual
  role: String | null,      // Rol del usuario (user, organizer, staff, admin)
  token: String | null,     // JWT token
  isAuthenticated: Boolean, // Estado de autenticación
  login: Function,          // Acción para iniciar sesión
  logout: Function          // Acción para cerrar sesión
}
```

### eventStore.js

Gestiona el estado de los eventos en la aplicación.

### userStore. js

Maneja el estado relacionado con la gestión de usuarios (para administradores).

---

## Servicios de API

La comunicación con el backend está centralizada en la carpeta `src/api/`. Se utiliza una instancia configurada de Axios con:

### Configuración Base (`axios.js`)

- **Base URL**: `http://localhost:3000/api/`
- **Credenciales**: Habilitadas (`withCredentials: true`)
- **Interceptor de Request**: Adjunta automáticamente el token JWT a las peticiones (excepto login y registro)
- **Interceptor de Response**: Maneja errores 401 eliminando tokens inválidos

### Servicios Disponibles

| Servicio           | Descripción                                      |
| ------------------ | ------------------------------------------------ |
| `authService. js`  | Login, registro, logout y verificación de sesión |
| `eventService.js`  | CRUD de eventos, listados y filtros              |
| `ticketService.js` | Compra, listado y validación de boletos          |
| `userService.js`   | Gestión de usuarios (admin)                      |

---

## Sistema de Rutas

El enrutamiento se gestiona con **React Router DOM v7**. La configuración se encuentra en:

- `src/router/appRouter.jsx` - Definición de rutas y componentes
- `src/router/routes.js` - Constantes de rutas para evitar strings hardcodeados

Las rutas están organizadas por módulo y algunas incluyen protección basada en roles.

---

## Estilos y Diseño

### Tailwind CSS + DaisyUI

El proyecto combina la flexibilidad de Tailwind CSS con los componentes prediseñados de DaisyUI:

- **Tailwind CSS**: Clases utilitarias para diseño responsive y personalizado
- **DaisyUI**: Componentes como botones, cards, modales, formularios con temas consistentes
- **PostCSS + Autoprefixer**: Procesamiento de CSS para compatibilidad cross-browser

### Diseño Visual

La aplicación presenta un diseño moderno con:

- Tema oscuro predominante (fondo negro con acentos blancos)
- Imágenes hero de alta resolución
- Cards con bordes redondeados y sombras
- Tipografía clara y legible

---

## Configuración de Desarrollo

### ESLint

El proyecto incluye ESLint configurado para React con los siguientes plugins:

- `eslint-plugin-react-hooks` - Reglas para hooks de React
- `eslint-plugin-react-refresh` - Soporte para Fast Refresh de Vite

### Vite

Configuración optimizada con:

- `@vitejs/plugin-react` - Soporte para React con Babel
- Hot Module Replacement (HMR) para desarrollo rápido

---
