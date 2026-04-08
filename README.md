# CategoryApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Despliegue en Vercel

### Requisitos previos
1. Cuenta en [Vercel](https://vercel.com)
2. Token de Vercel (generado en Account Settings)
3. Organización ID de Vercel (si aplica)

### Configuración automática con GitHub Actions

El proyecto está configurado con GitHub Actions para desplegarse automáticamente a Vercel en cada push a `main`.

#### Pasos de configuración:

1. **Crear secret `VERCEL_TOKEN` en GitHub**:
   - Ve a tu repositorio → Settings → Secrets and variables → Actions
   - Click en "New repository secret"
   - Name: `VERCEL_TOKEN`
   - Value: Tu token de Vercel

2. **Crear secret `VERCEL_ORG_ID`** (opcional, solo si usas org):
   - Name: `VERCEL_ORG_ID`
   - Value: Tu ID de organización en Vercel

3. **Crear secret `VERCEL_PROJECT_ID`** (opcional):
   - Name: `VERCEL_PROJECT_ID`
   - Value: Tu ID de proyecto en Vercel

#### Archivos de configuración:
- `.github/workflows/vercel.yml` - GitHub Actions workflow
- `vercel.json` - Configuración de Vercel
- `angular.json` - Configuración de Angular CLI
- `.vercelignore` - Archivos ignorados en Vercel

### Despliegue manual

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login en Vercel
vercel login

# 3. Desplegar a producción
vercel --prod
```

### Características del despliegue:
- ✅ SPA routing configurado (Angular Router redirige a index.html)
- ✅ Clean URLs habilitadas
- ✅ Minificación y optimización de assets
- ✅ Cache headers configurados
- ✅ Node.js 20+ requerido

## Estructura del Proyecto

```
src/app/
├── core/
│   ├── interceptors/
│   │   ├── error.interceptor.ts
│   │   └── index.ts
│   └── services/
│       ├── category.service.ts
│       └── notification.service.ts
├── features/
│   └── categories/
│       ├── components/
│       │   ├── category-form/
│       │   │   ├── category-form.component.ts
│       │   │   ├── category-form.component.html
│       │   │   └── category-form.component.css
│       │   ├── category-table/
│       │   │   ├── category-table.component.ts
│       │   │   ├── category-table.component.html
│       │   │   └── category-table.component.css
│       │   └── index.ts
│       ├── models/
│       │   └── category.model.ts
│       └── pages/
│           ├── categories.page.ts
│           ├── categories.page.html
│           └── categories.page.css
├── shared/
│   └── components/
│       ├── stats-card/
│       │   ├── stats-card.component.ts
│       │   ├── stats-card.component.html
│       │   └── stats-card.component.css
│       ├── stats-container/
│       │   ├── stats-container.component.ts
│       │   ├── stats-container.component.html
│       │   └── stats-container.component.css
│       └── index.ts
├── app.component.ts
├── app.component.html
├── app.component.css
├── app.config.ts
├── app.routes.ts
└── main.ts
```

## Componentes y Servicios

### Core
- **CategoryService**: Servicio central que gestiona el estado de categorías con BehaviorSubject para reactividad. Implementa CRUD completo (crear, leer, actualizar, eliminar).
- **NotificationService**: Servicio para mostrar mensajes de notificación al usuario.
- **ErrorInterceptor**: Interceptor global que maneja errores HTTP y muestra mensajes personalizados.

### Features - Categories
- **CategoriesPage**: Página principal que orquesta el formulario, tabla y estadísticas. Maneja el estado global de las categorías.
- **CategoryForm**: Componente de formulario reactivo con validaciones (nombre y código requeridos, longitud mínima).
- **CategoryTable**: Tabla que muestra categorías con búsqueda, filtrado y acciones (editar, eliminar, cambiar estado).

### Shared - Stats Components
- **StatsCard**: Componente reutilizable que muestra una métrica individual con icono y fondo de color.
- **StatsContainer**: Contenedor que calcula y muestra 3 estadísticas:
  - Total de categorías
  - Categorías activas
  - Categorías inactivas

### Características Principales
- **Formulario reactivo** con validación en tiempo real
- **Iconos ng-icons (Feather)** para mejor UX
- **Change Detection OnPush** en todos los componentes para optimización
- **Async pipe** para suscripciones a observables
- **Componentes standalone** siguiendo las mejores prácticas de Angular v20+

