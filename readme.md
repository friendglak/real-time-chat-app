# Real-Time Chat App (Next.js + NestJS)

Este proyecto es una aplicación de chat en tiempo real construida con **Next.js 14** para el frontend y **NestJS** para el backend. Utiliza **WebSockets** para la comunicación en tiempo real y una base de datos **MySQL** administrada con **TypeORM**. Además, sigue buenas prácticas como **Clean Code, SOLID** y aplica medidas de **seguridad** en el backend.

## Tecnologías Utilizadas

### **Frontend (Next.js 14 + TailwindCSS 4)**

- **Next.js** - Framework React con Server-Side Rendering y Static Site Generation.
- **Tailwind CSS v4** - Sistema de estilos moderno y optimizado.
- **React Icons** - Conjunto de iconos personalizables.
- **React Infinite Scroll Component** - Implementación de carga progresiva de mensajes.
- **Socket.io-client** - Comunicación en tiempo real con el backend.
- **@emotion/styled** - Para manejo de estilos encapsulados.

### **Backend (NestJS + MySQL)**

- **NestJS** - Framework escalable basado en Node.js con soporte para arquitectura modular.
- **TypeORM** - ORM robusto para gestionar la base de datos MySQL.
- **MySQL2** - Driver eficiente para conectarse a MySQL.
- **Socket.io** - Implementación de WebSockets para chat en tiempo real.
- **JWT (jsonwebtoken)** - Manejo seguro de autenticación con tokens.
- **Bcrypt** - Cifrado seguro de contraseñas de usuarios.
- **CORS y Helmet** - Mejoras de seguridad en el backend.
- **Dotenv** - Manejo de variables de entorno.

## Estructura del Proyecto

```bash
/chat-app
  ├── backend (NestJS)
  │   ├── src/
  │   │   ├── modules/
  │   │   │   ├── auth/
  │   │   │   ├── users/
  │   │   │   ├── chat/
  │   ├── package.json
  │   ├── tsconfig.json
  │   ├── .env.example
  ├── frontend (Next.js)
  │   ├── src/
  │   ├── package.json
  │   ├── tailwind.config.ts
  │   ├── .env.local.example
  ├── docker-compose.yml (MySQL y servicios)
  ├── .gitignore
  ├── README.md
  └── LICENSE
```

## Instalación y Configuración

### 1. Clonar el Repositorio

```shell
git clone <repo-url>
cd chat-app
```

### 2. Configurar el Backend (NestJS)

```shell
cd backend
npm install
cp .env.example .env
```

Modificar el archivo `.env` con la configuración de la base de datos y los secretos.

```shell
npm run start:dev
```

### 3. Configurar el Frontend (Next.js)

```shell
cd frontend
npm install
cp .env.local.example .env.local
```

Modificar `.env.local` con la URL del backend.

```shell
npm run dev
```

### 4. Iniciar MySQL con Docker (Opcional)

Si no tienes MySQL instalado, usa Docker:

```shell
docker-compose up -d
```

## Seguridad Implementada

- Uso de **Helmet** para proteger la API contra ataques comunes.
- **CORS** configurado para permitir solo dominios específicos.
- **Bcrypt** para hashear contraseñas antes de almacenarlas en la base de datos.
- **JWT** para autenticación segura con tokens.
- **Gestión de variables de entorno** con `dotenv`.

## Licencia

Este proyecto está bajo la licencia MIT.
