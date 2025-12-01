## MANUAL DE USUARIO - PASSIO 
# Plataforma de Gestión de Eventos

## Índice
1. Introducción
2. Acceso al sistema
 * Crear cuenta
 * Iniciar sesión
3. Roles de usuario
4. Navegación general del sistema
5. Funciones para Usuarios
6. Funciones para Organizadores
7. Funciones para Staff
8. Funciones para Administradores
9. Compra y visualización de tickets
10. Cierre de sesión

## 1. Introducción

PASSIO es una plataforma web diseñada para gestionar eventos, manejar tickets, controlar accesos y ofrecer métricas sobre ventas y asistencia.
El sistema cuenta con cuatro tipos de usuarios:
  * Usuario normal
  * Organizador
  * Staff
  * Administrador

Cada uno ve páginas diferentes y tiene permisos distintos.

## 2. Acceso al sistema
 * Crear cuenta
   En la página principal, selecciona "Register".
   Llena el formulario con:
    * Nombre
    * Email
    * Contraseña
    * Confirma y tu cuenta queda creada.

# Nota: en el sistema solo los administradores pueden registrar usuarios con roles especiales (admin, staff, organizador).

   Iniciar sesión
   * Ir a Login.
   * Introducir email y contraseña.

Al iniciar sesión, el sistema reconoce tu rol y te muestra solo las páginas que puedes usar.

## 3. Roles de Usuario
 # Usuario
   Ver eventos disponibles.
   Comprar tickets.
   Ver sus tickets en pantalla.

 # Organizador
   Ver eventos disponibles.
   Comprar tickets.
   Ver sus tickets en pantalla.
   Crear eventos.
   Editar o eliminar sus eventos.
   Ver métricas básicas (ventas, boletos disponibles).
   Revisar la lista de tickets del evento.

 # Staff
   Escanear tickets.
   Registrar acceso de asistentes.

# Administrador (Tiene acceso completo)
  CRUD de usuarios.
  Registro manual de usuarios.
  Asignar roles.
  Ver todos los eventos y métricas.

## 4. Navegación general del sistema
El sistema cuenta con:
 * Navbar
    Home
    Login / Logout

* Menús específicos según tu rol
  * Páginas principales
    HomePage
    LoginPage
    RegisterPage
  * Autenticadas
    EventsListPage (lista general de eventos)
    EventsListUser (mis eventos)
    Boletos (mis tickets)
    EventsDashboardPage
    EventsDashboardPageOrganizer
    EventsDashboardPageStaff
  * Admin
    UserManagementPage
    RegisterUser

## 5. Funciones para Usuarios
Una vez logeado como usuario normal puedes:
  Ver eventos (Imagen, Título, Fecha, Precio del ticket, Botón de compra)
  Comprar tickets
  Elegir un evento.
  Seleccionar cantidad.
  Confirmar compra.
  El sistema generará un QR que aparecerá en tu sección Boletos.
  Ver tus tickets

En la página Boletos:
   Verás tus tickets activos. 
   [Nombre del evento
   Fecha
   QR
   Estado (válido / usado)]

## 6. Funciones para Organizadores
Además de lo que ve un usuario normal, puede:
   Crear eventos (Título, Descripción, Lugar, Fecha, Capacidad, Imagen)
   Gestionar eventos (Editar evento, Eliminar evento, Ver boletos vendidos, Ver métricas básicas (ventas, asistencia))

## 7. Funciones para Staff
El staff accede a una vista especial:
   Control de accesos
   * Escanear códigos QR.
   * Validar si el ticket ya fue usado.
   * Registrar entrada.

## 8. Funciones para Administradores
Un administrador ve todas las funciones anteriores más:
   Gestión de usuarios
   * Ver lista de usuarios
   * Editar usuarios
   * Eliminar usuarios
   * Asignar roles
   * Crear nuevos usuarios (RegisterUser)

## 9. Compra y visualización de tickets
   Comprar ticket (Genera un QR y se registra en base de datos)
   Ver tickets adquiridos (QR, Estado, Detalles del evento)

## 10. Cierre de sesión
Puedes cerrar sesión desde la barra de navegación:
Haz click en Logout y regresas a la pantalla principal.