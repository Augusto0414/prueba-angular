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

